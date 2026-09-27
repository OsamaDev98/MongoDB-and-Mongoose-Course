export type ReviewRow = { topic: string; syntax: string; meaning: string };
export type DayReview = {
  title: string;
  intro: string;
  learned: string[];
  table: ReviewRow[];
  rules: string[];
  mistakes: string[];
  checklist: string[];
  challenge: { prompt: string; code: string };
};

export const dayReviews: Record<number, DayReview> = {
  37: {
    title: "مراجعة اليوم الأول — MongoDB Core",
    intro: "مرجع سريع لكل أساسيات MongoDB التي أخذتها في اليوم الأول. استخدمه قبل الانتقال إلى Aggregation وIndexes.",
    learned: [
      "Database / Collection / Document / Field",
      "BSON و _id و ObjectId",
      "CRUD: insert / find / update / delete",
      "Query Operators",
      "Nested Documents و Arrays",
      "Projection",
      "Sorting و Pagination",
      "Embedding vs Referencing"
    ],
    table: [
      { topic: "Create", syntax: "insertOne / insertMany", meaning: "إضافة Document واحد أو عدة Documents" },
      { topic: "Read", syntax: "find / findOne", meaning: "قراءة عدة نتائج أو نتيجة واحدة" },
      { topic: "Projection", syntax: "{ name: 1, _id: 0 }", meaning: "1 = Include، 0 = Exclude" },
      { topic: "Comparison", syntax: "$gt $gte $lt $lte", meaning: "أكبر/أكبر أو يساوي/أصغر/أصغر أو يساوي" },
      { topic: "Lists", syntax: "$in / $nin", meaning: "القيمة داخل مجموعة أو خارجها" },
      { topic: "Logic", syntax: "$and / $or", meaning: "دمج أكثر من شرط" },
      { topic: "Update", syntax: "$set $inc $push $pull $addToSet", meaning: "تعديل Fields وArrays" },
      { topic: "Delete", syntax: "deleteOne / deleteMany", meaning: "حذف Document واحد أو عدة Documents" },
      { topic: "Nested", syntax: "\"specs.storage\"", meaning: "الوصول إلى Field متداخل بـ Dot Notation" },
      { topic: "Pagination", syntax: "sort / skip / limit", meaning: "ترتيب وتقسيم النتائج" }
    ],
    rules: [
      "find() يرجع عدة Documents، وfindOne() يرجع Document واحد.",
      "في Projection: 1 = Include و0 = Exclude، و_id يظهر افتراضيًا إلا لو كتبت _id: 0.",
      "updateMany وdeleteMany يحتاجان Filter دقيق لأنهما يؤثران على عدة Documents.",
      "Embedding مناسب للبيانات الصغيرة المرتبطة بقوة، وReferencing مناسب للعلاقات الكبيرة أو المستقلة."
    ],
    mistakes: [
      "استخدام deleteMany({}) بدون قصد.",
      "وضع Indexes أو علاقات SQL-style قبل فهم Access Patterns.",
      "نسيان أن Atlas وLocal MongoDB قاعدتان منفصلتان.",
      "الخلط بين Filter وProjection داخل find()."
    ],
    checklist: [
      "أقدر أشرح الفرق بين Database وCollection وDocument.",
      "أقدر أكتب CRUD كامل بدون الرجوع للشرح.",
      "أقدر أستخدم $gte و$in و$and.",
      "أقدر أستخدم Projection بشكل صحيح.",
      "أقدر أقرر مبدئيًا بين Embedding وReferencing."
    ],
    challenge: {
      prompt: "هات المنتجات النشطة التي سعرها بين 1000 و5000، اعرض name وprice فقط بدون _id، ورتب الأغلى أولًا وخذ أول نتيجتين.",
      code: `db.products
  .find(
    {
      $and: [
        { active: true },
        { price: { $gte: 1000, $lte: 5000 } }
      ]
    },
    { name: 1, price: 1, _id: 0 }
  )
  .sort({ price: -1 })
  .limit(2)`
    }
  },

  38: {
    title: "مراجعة اليوم الثاني — Advanced MongoDB",
    intro: "مرجع سريع لـ Aggregation وIndexes وPerformance وTransactions وAtlas وMongoDB Driver.",
    learned: [
      "Aggregation Pipeline",
      "$match / $project / $group",
      "$lookup / $unwind",
      "$sort / $limit / $addFields",
      "Indexes",
      "explain()",
      "Transactions",
      "MongoDB Atlas",
      "MongoDB Node.js Driver"
    ],
    table: [
      { topic: "Filter Stage", syntax: "$match", meaning: "تقليل Documents داخل Pipeline" },
      { topic: "Shape", syntax: "$project", meaning: "اختيار أو إعادة تشكيل Fields" },
      { topic: "Group", syntax: "$group", meaning: "تجميع وحساب totals/averages/counts" },
      { topic: "Join-like", syntax: "$lookup", meaning: "ربط Collection بأخرى" },
      { topic: "Flatten", syntax: "$unwind", meaning: "فك Array إلى Documents" },
      { topic: "Index", syntax: "createIndex()", meaning: "تسريع Queries المناسبة" },
      { topic: "Plan", syntax: "explain(\"executionStats\")", meaning: "فهم طريقة تنفيذ Query" },
      { topic: "Transaction", syntax: "session / commit / abort", meaning: "تنفيذ عدة عمليات كوحدة واحدة" },
      { topic: "Atlas", syntax: "mongodb+srv://...", meaning: "اتصال بMongoDB سحابية" },
      { topic: "Driver", syntax: "MongoClient", meaning: "الاتصال المباشر من Node.js" }
    ],
    rules: [
      "ضع $match مبكرًا عندما يكون ذلك منطقيًا لتقليل البيانات.",
      "داخل $group، الحقل _id هو Group Key.",
      "لا تنشئ Index لكل Field؛ صمّم Index حسب Queries المهمة.",
      "COLLSCAN يعني فحص Collection، وIXSCAN يعني استخدام Index.",
      "Transaction تستخدم عند وجود عمليات مترابطة تحتاج نجاحًا أو فشلًا معًا."
    ],
    mistakes: [
      "استخدام $lookup بكثرة بدل تحسين Data Model.",
      "اعتبار وجود IXSCAN وحده دليلًا أن الأداء ممتاز.",
      "ترك MONGO_URI داخل الكود أو GitHub.",
      "استخدام Transaction في كل عملية بدون حاجة."
    ],
    checklist: [
      "أقدر أبني Pipeline من عدة Stages.",
      "أقدر أشرح الفرق بين $match و$project و$group.",
      "أقدر أقرأ COLLSCAN وIXSCAN في explain.",
      "أعرف متى أحتاج Transaction.",
      "أعرف خطوات الاتصال بـ Atlas من Node.js."
    ],
    challenge: {
      prompt: "ابنِ Pipeline للطلبات المكتملة: اجمع الإيراد لكل status، رتّب من الأعلى للأقل، وخذ أول نتيجتين.",
      code: `db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$status", revenue: { $sum: "$total" } } },
  { $sort: { revenue: -1 } },
  { $limit: 2 }
])`
    }
  },

  39: {
    title: "مراجعة اليوم الثالث — Mongoose",
    intro: "مرجع سريع لكل ما تحتاجه في Mongoose من Connection وSchema حتى Populate وMiddleware وTransactions.",
    learned: [
      "mongoose.connect",
      "Schema / Model / Document",
      "Schema Types & Options",
      "Validation",
      "CRUD",
      "References & Populate",
      "Subdocuments",
      "Middleware",
      "Methods / Statics / Virtuals",
      "lean()",
      "Indexes",
      "Transactions",
      "Errors & Security",
      "API Architecture"
    ],
    table: [
      { topic: "Connection", syntax: "mongoose.connect()", meaning: "الاتصال بMongoDB" },
      { topic: "Schema", syntax: "new mongoose.Schema()", meaning: "تعريف الشكل والقواعد" },
      { topic: "Model", syntax: "mongoose.model()", meaning: "واجهة التعامل مع Collection" },
      { topic: "Create", syntax: "Model.create()", meaning: "إنشاء Document" },
      { topic: "Read", syntax: "find / findOne / findById", meaning: "قراءة البيانات" },
      { topic: "Update", syntax: "findByIdAndUpdate", meaning: "تحديث Document" },
      { topic: "Reference", syntax: "ObjectId + ref", meaning: "علاقة مع Model آخر" },
      { topic: "Populate", syntax: ".populate()", meaning: "جلب بيانات الـ Reference" },
      { topic: "Middleware", syntax: "pre / post", meaning: "منطق قبل/بعد Operation" },
      { topic: "Performance", syntax: ".lean()", meaning: "إرجاع Plain Objects للقراءات البسيطة" },
      { topic: "Index", syntax: "schema.index()", meaning: "تعريف Index في Schema" },
      { topic: "Transaction", syntax: "startSession / withTransaction", meaning: "عمليات مترابطة في Session واحدة" }
    ],
    rules: [
      "Schema = rules، Model = interface، Document = instance.",
      "unique ليس Validator تقليديًا؛ هو Unique Index.",
      "pre('save') لا يعمل تلقائيًا مع كل update query.",
      "populate مفيد، لكن لا تستخدمه في كل Query بلا حاجة.",
      "lean مناسب للقراءة فقط عندما لا تحتاج Document methods أو save().",
      "كل Query داخل Transaction يجب أن تستقبل نفس session."
    ],
    mistakes: [
      "تمرير req.body كاملًا إلى update.",
      "نسيان runValidators في update queries عندما تحتاج Validation.",
      "الخلط بين Method وStatic.",
      "استخدام lean ثم محاولة document.save().",
      "نسيان التعامل مع ValidationError وCastError وDuplicate Key."
    ],
    checklist: [
      "أقدر أبني Schema وModel من الصفر.",
      "أقدر أعمل CRUD بـ Mongoose.",
      "أقدر أبني Reference وأستخدم populate.",
      "أعرف الفرق بين Methods وStatics وVirtuals.",
      "أقدر أستخدم lean وIndexes وTransactions في مكانها.",
      "أقدر أنظم Backend إلى Models/Services/Controllers/Routes."
    ],
    challenge: {
      prompt: "اكتب Query Mongoose ترجع المنتجات النشطة، تختار name وprice فقط، ترتب بالأحدث، تأخذ أول 10، وتستخدم lean().",
      code: `const products = await Product
  .find({ active: true })
  .select("name price")
  .sort({ createdAt: -1 })
  .limit(10)
  .lean()`
    }
  }
};
