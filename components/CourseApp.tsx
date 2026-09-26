"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { dayMeta, lessons } from "@/data/course";

const STORAGE_KEY = "mongo-course-progress-v1";

export default function CourseApp() {
  const [activeId, setActiveId] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setCompleted(JSON.parse(raw));
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(panelRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
    setSelectedAnswer(null);
    setShowAnswer(false);
  }, [activeId]);

  const lesson = lessons.find((l) => l.id === activeId)!;
  const progress = Math.round((completed.length / lessons.length) * 100);
  const dayLessons = useMemo(() => [1, 2, 3].map((d) => lessons.filter((l) => l.day === d)), []);

  function markComplete() {
    const next = completed.includes(activeId) ? completed : [...completed, activeId];
    setCompleted(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    const idx = lessons.findIndex((l) => l.id === activeId);
    if (idx < lessons.length - 1) setActiveId(lessons[idx + 1].id);
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="leaf">M</span><div><strong>MongoDB Mastery</strong><small>3-Day Intensive Course</small></div></div>
        <div className="progressCard"><div className="progressHead"><span>التقدم</span><b>{progress}%</b></div><div className="track"><span style={{ width: `${progress}%` }} /></div><small>{completed.length} / {lessons.length} lessons</small></div>
        <nav>
          {dayLessons.map((group, i) => (
            <section key={i} className="dayGroup">
              <h3>DAY {i + 1} <span>{dayMeta[(i + 1) as 1|2|3].title}</span></h3>
              {group.map((l) => (
                <button key={l.id} className={`lessonLink ${activeId === l.id ? "active" : ""}`} onClick={() => setActiveId(l.id)}>
                  <span className={`status ${completed.includes(l.id) ? "done" : ""}`}>{completed.includes(l.id) ? "✓" : String(l.id).padStart(2,"0")}</span>
                  <span><b>{l.title}</b><small>{l.duration}</small></span>
                </button>
              ))}
            </section>
          ))}
        </nav>
      </aside>

      <section className="content" ref={panelRef}>
        <header className="hero">
          <div className="eyebrow">DAY {lesson.day} • LESSON {String(lesson.id).padStart(2,"0")}</div>
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
          <div className="chips"><span>{lesson.duration}</span><span>MongoDB / Mongoose</span><span>Arabic Course</span></div>
        </header>

        <div className="scene"><div className="sceneNo">01</div><div><h2>الفكرة الأساسية</h2><p>ركز في هذه النقاط قبل الانتقال للكود.</p><ul>{lesson.concepts.map((c) => <li key={c}>{c}</li>)}</ul></div></div>

        {lesson.code && <div className="scene"><div className="sceneNo">02</div><div className="grow"><h2>Code Scene</h2><p>اقرأ الكود ثم غيّر القيم بنفسك أثناء المذاكرة.</p><pre><code>{lesson.code}</code></pre></div></div>}

        <div className="scene"><div className="sceneNo">03</div><div><h2>Challenge</h2><p className="challenge">{lesson.challenge}</p><p className="hint">لا تنتقل قبل أن تحاول كتابته بنفسك حتى لو كانت المحاولة غير كاملة.</p></div></div>

        <div className="scene"><div className="sceneNo">04</div><div className="grow"><h2>Quick Quiz</h2><p>{lesson.quiz.question}</p><div className="answers">{lesson.quiz.options.map((opt, idx) => <button key={opt} className={`answer ${showAnswer && idx === lesson.quiz.answer ? "correct" : ""} ${showAnswer && selectedAnswer === idx && idx !== lesson.quiz.answer ? "wrong" : ""}`} onClick={() => { setSelectedAnswer(idx); setShowAnswer(true); }}>{String.fromCharCode(65+idx)}. {opt}</button>)}</div>{showAnswer && <div className="feedback">{selectedAnswer === lesson.quiz.answer ? "✓ إجابة صحيحة. " : "الإجابة تحتاج مراجعة. "}{lesson.quiz.explanation}</div>}</div></div>

        <footer className="lessonFooter"><button className="secondary" disabled={activeId === 1} onClick={() => setActiveId(activeId - 1)}>السابق</button><button className="primary" onClick={markComplete}>{completed.includes(activeId) ? "التالي" : "أكملت الدرس ←"}</button></footer>
      </section>
    </main>
  );
}
