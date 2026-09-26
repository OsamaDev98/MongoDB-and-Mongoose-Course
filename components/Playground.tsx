"use client";

import { useEffect, useMemo, useState } from "react";

type Props = { lessonId: number; initialCode?: string };

type Product = {
  _id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  active: boolean;
  tags: string[];
  specs: { storage?: number; color?: string };
};

const seed: Product[] = [
  { _id: 1, name: "iPhone", price: 4200, stock: 8, category: "phones", active: true, tags: ["apple", "premium"], specs: { storage: 256, color: "black" } },
  { _id: 2, name: "Galaxy", price: 3200, stock: 0, category: "phones", active: true, tags: ["android"], specs: { storage: 128, color: "silver" } },
  { _id: 3, name: "MacBook", price: 7200, stock: 4, category: "laptops", active: true, tags: ["apple", "laptop"], specs: { storage: 512, color: "gray" } },
  { _id: 4, name: "Mouse", price: 180, stock: 35, category: "accessories", active: false, tags: ["computer"], specs: { color: "black" } }
];

function getByPath(obj: any, path: string) {
  return path.split(".").reduce((acc: any, key) => acc?.[key], obj);
}

function compare(value: any, condition: any): boolean {
  if (condition && typeof condition === "object" && !Array.isArray(condition)) {
    return Object.entries(condition).every(([op, target]: [string, any]) => {
      if (op === "$gt") return value > target;
      if (op === "$gte") return value >= target;
      if (op === "$lt") return value < target;
      if (op === "$lte") return value <= target;
      if (op === "$ne") return value !== target;
      if (op === "$in") return Array.isArray(target) && target.includes(value);
      if (op === "$nin") return Array.isArray(target) && !target.includes(value);
      if (op === "$exists") return Boolean(value !== undefined) === Boolean(target);
      return false;
    });
  }
  if (Array.isArray(value)) return value.includes(condition);
  return value === condition;
}

function matches(doc: any, filter: any): boolean {
  if (!filter || Object.keys(filter).length === 0) return true;
  return Object.entries(filter).every(([key, condition]) => {
    if (key === "$and") return Array.isArray(condition) && condition.every((f) => matches(doc, f));
    if (key === "$or") return Array.isArray(condition) && condition.some((f) => matches(doc, f));
    return compare(getByPath(doc, key), condition);
  });
}

function safeEvalObject(source: string): any {
  const normalized = source
    .replace(/ObjectId\((["'][^"']*["'])\)/g, "$1")
    .replace(/ISODate\((["'][^"']*["'])\)/g, "$1");
  return Function('"use strict"; return (' + normalized + ")")();
}

function extractMethodArgs(code: string, method: string): string[] {
  const marker = "." + method + "(";
  const start = code.indexOf(marker);
  if (start < 0) return [];
  let i = start + marker.length;
  let depth = 0;
  let quote = "";
  let current = "";
  const args: string[] = [];

  for (; i < code.length; i++) {
    const ch = code[i];
    if (quote) {
      current += ch;
      if (ch === quote && code[i - 1] !== "\\") quote = "";
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; current += ch; continue; }
    if (ch === "{" || ch === "[" || ch === "(") depth++;
    if (ch === "}" || ch === "]" || ch === ")") {
      if (depth === 0 && ch === ")") {
        if (current.trim()) args.push(current.trim());
        break;
      }
      depth--;
    }
    if (ch === "," && depth === 0) {
      args.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  return args;
}

function applyProjection(doc: any, projection: any) {
  if (!projection || Object.keys(projection).length === 0) return doc;

  const entries = Object.entries(projection);
  const includeFields = entries.filter(([key, value]) => key !== "_id" && value === 1).map(([key]) => key);
  const excludeFields = entries.filter(([, value]) => value === 0).map(([key]) => key);

  // Inclusion mode: return only fields marked with 1.
  // MongoDB includes _id by default unless explicitly set to 0.
  if (includeFields.length > 0) {
    const result: any = {};

    if (projection._id !== 0 && doc._id !== undefined) {
      result._id = doc._id;
    }

    includeFields.forEach((field) => {
      const value = getByPath(doc, field);
      if (value !== undefined) {
        if (!field.includes(".")) {
          result[field] = value;
        } else {
          const parts = field.split(".");
          let target = result;
          for (let i = 0; i < parts.length - 1; i++) {
            target[parts[i]] ??= {};
            target = target[parts[i]];
          }
          target[parts[parts.length - 1]] = value;
        }
      }
    });

    return result;
  }

  // Exclusion mode: clone the document then remove fields marked with 0.
  const result = structuredClone(doc);
  excludeFields.forEach((field) => {
    if (!field.includes(".")) {
      delete result[field];
      return;
    }

    const parts = field.split(".");
    let target: any = result;
    for (let i = 0; i < parts.length - 1; i++) {
      target = target?.[parts[i]];
      if (!target) return;
    }
    delete target[parts[parts.length - 1]];
  });

  return result;
}

function runMongo(code: string, input: Product[]) {
  const data = structuredClone(input);

  if (code.includes(".findOne(")) {
    const [filterText = "{}"] = extractMethodArgs(code, "findOne");
    const filter = safeEvalObject(filterText);
    return { data, output: data.find((d) => matches(d, filter)) ?? null };
  }

  if (code.includes(".find(")) {
    const args = extractMethodArgs(code, "find");
    const filter = safeEvalObject(args[0] || "{}");
    const projection = args[1] ? safeEvalObject(args[1]) : null;
    let result: any[] = data.filter((d) => matches(d, filter));

    const sortArgs = extractMethodArgs(code, "sort");
    if (sortArgs[0]) {
      const spec = safeEvalObject(sortArgs[0]);
      const first = Object.entries(spec)[0] as [string, any] | undefined;
      if (first) {
        const [field, dir] = first;
        result.sort((a,b) => {
          const av = getByPath(a, field);
          const bv = getByPath(b, field);
          if (av === bv) return 0;
          return av > bv ? Number(dir) : -Number(dir);
        });
      }
    }

    const skipArgs = extractMethodArgs(code, "skip");
    if (skipArgs[0]) result = result.slice(Number(skipArgs[0]));
    const limitArgs = extractMethodArgs(code, "limit");
    if (limitArgs[0]) result = result.slice(0, Number(limitArgs[0]));

    if (projection) {
      result = result.map((doc) => applyProjection(doc, projection));
    }

    return { data, output: result };
  }

  if (code.includes(".insertMany(")) {
    const [docsText] = extractMethodArgs(code, "insertMany");
    const docs = safeEvalObject(docsText);

    if (!Array.isArray(docs)) {
      throw new Error("insertMany() expects an array of documents");
    }

    let nextId = data.length ? Math.max(...data.map(d => d._id)) + 1 : 1;
    const insertedIds: Record<number, number> = {};
    const insertedDocuments = docs.map((doc: any, index: number) => {
      const inserted = { _id: nextId++, ...doc };
      insertedIds[index] = inserted._id;
      return inserted;
    });

    data.push(...insertedDocuments);

    return {
      data,
      output: {
        acknowledged: true,
        insertedCount: insertedDocuments.length,
        insertedIds,
        documents: insertedDocuments
      }
    };
  }

  if (code.includes(".insertOne(")) {
    const [docText] = extractMethodArgs(code, "insertOne");
    const doc = safeEvalObject(docText);
    const inserted = { _id: Math.max(...data.map(d => d._id)) + 1, ...doc };
    data.push(inserted);
    return { data, output: { acknowledged: true, insertedId: inserted._id, document: inserted } };
  }

  function applyUpdate(doc: any, update: any) {
    if (update.$set) Object.assign(doc, update.$set);
    if (update.$unset) Object.keys(update.$unset).forEach((k) => delete doc[k]);
    if (update.$inc) Object.entries(update.$inc).forEach(([k,v]) => doc[k] = (doc[k] ?? 0) + Number(v));
    if (update.$push) Object.entries(update.$push).forEach(([k,v]) => { doc[k] ??= []; doc[k].push(v); });
    if (update.$addToSet) Object.entries(update.$addToSet).forEach(([k,v]) => { doc[k] ??= []; if (!doc[k].includes(v)) doc[k].push(v); });
    if (update.$pull) Object.entries(update.$pull).forEach(([k,v]) => { doc[k] = (doc[k] ?? []).filter((x:any) => x !== v); });
  }

  if (code.includes(".updateMany(")) {
    const [filterText, updateText] = extractMethodArgs(code, "updateMany");
    const filter = safeEvalObject(filterText || "{}");
    const update = safeEvalObject(updateText || "{}");
    const matched = data.filter((d) => matches(d, filter));

    matched.forEach((doc: any) => applyUpdate(doc, update));

    return {
      data,
      output: {
        acknowledged: true,
        matchedCount: matched.length,
        modifiedCount: matched.length,
        documents: matched
      }
    };
  }

  if (code.includes(".updateOne(")) {
    const [filterText, updateText] = extractMethodArgs(code, "updateOne");
    const filter = safeEvalObject(filterText);
    const update = safeEvalObject(updateText);
    const doc: any = data.find((d) => matches(d, filter));
    if (!doc) return { data, output: { acknowledged: true, matchedCount: 0, modifiedCount: 0 } };

    applyUpdate(doc, update);

    return { data, output: { acknowledged: true, matchedCount: 1, modifiedCount: 1, document: doc } };
  }

  if (code.includes(".deleteMany(")) {
    const [filterText = "{}"] = extractMethodArgs(code, "deleteMany");
    const filter = safeEvalObject(filterText);
    const deleted = data.filter((d) => matches(d, filter));
    const remaining = data.filter((d) => !matches(d, filter));
    data.splice(0, data.length, ...remaining);

    return {
      data,
      output: {
        acknowledged: true,
        deletedCount: deleted.length,
        documents: deleted
      }
    };
  }

  if (code.includes(".deleteOne(")) {
    const [filterText] = extractMethodArgs(code, "deleteOne");
    const filter = safeEvalObject(filterText);
    const index = data.findIndex((d) => matches(d, filter));
    if (index < 0) return { data, output: { deletedCount: 0 } };
    const deleted = data.splice(index,1)[0];
    return { data, output: { deletedCount: 1, document: deleted } };
  }

  return { data, output: "المحاكي يدعم الآن find / findOne / insertOne / insertMany / updateOne / updateMany / deleteOne / deleteMany في أمثلة MongoDB الأساسية." };
}

export default function Playground({ lessonId, initialCode }: Props) {
  const defaultCode = useMemo(() => {
    if (initialCode && initialCode.includes("db.")) return initialCode;
    if (lessonId <= 11) return 'db.products.find({ price: { $gte: 1000 } })';
    if (lessonId >= 22) return 'Product.find({ active: true })';
    return initialCode || 'db.products.find({})';
  }, [lessonId, initialCode]);

  const [code, setCode] = useState(defaultCode);
  const [data, setData] = useState<Product[]>(seed);
  const [output, setOutput] = useState<unknown>(seed);

  useEffect(() => {
    setCode(defaultCode);
    setData(seed);
    setOutput(seed);
  }, [defaultCode]);

  function run() {
    try {
      if (code.includes("Product.find(")) {
        const open = code.indexOf("Product.find(") + "Product.find(".length;
        const close = code.lastIndexOf(")");
        const filter = safeEvalObject(code.slice(open, close) || "{}");
        setOutput(data.filter((d) => matches(d, filter)));
        return;
      }
      const result = runMongo(code, data);
      setData(result.data);
      setOutput(result.output);
    } catch (error) {
      setOutput({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  function reset() {
    setCode(defaultCode);
    setData(seed);
    setOutput(seed);
  }

  return (
    <div className="playground">
      <div className="playgroundTop">
        <div><span className="terminalDot" /><span>Mongo Playground</span></div>
        <small>محاكاة تعليمية داخل المتصفح — لا تحتاج Atlas</small>
      </div>

      <div className="editorGrid">
        <div className="editorPane">
          <div className="paneTitle">QUERY</div>
          <textarea value={code} onChange={(e)=>setCode(e.target.value)} spellCheck={false} />
          <div className="editorActions">
            <button className="runBtn" onClick={run}>▶ Run</button>
            <button className="resetBtn" onClick={reset}>Reset</button>
          </div>
        </div>

        <div className="outputPane">
          <div className="paneTitle">OUTPUT</div>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      </div>

      <details className="sampleData">
        <summary>عرض البيانات التجريبية الحالية</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  );
}
