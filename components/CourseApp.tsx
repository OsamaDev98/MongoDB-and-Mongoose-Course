"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { dayMeta, lessons } from "@/data/course";
import { explanations } from "@/data/explanations";
import Playground from "@/components/Playground";
import { lessonPoints } from "@/data/lesson-points";
import { playgroundExamples } from "@/data/playground-examples";
import { challengeExamples } from "@/data/challenge-examples";

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
    gsap.fromTo(panelRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    setSelectedAnswer(null);
    setShowAnswer(false);
  }, [activeId]);

  const lesson = lessons.find((l) => l.id === activeId)!;
  const explanation = explanations[activeId];
  const points = lessonPoints[activeId] ?? [];
  const challenge = challengeExamples[activeId];
  const progress = Math.round((completed.length / lessons.length) * 100);
  const dayLessons = useMemo(() => [1, 2, 3].map((d) => lessons.filter((l) => l.day === d)), []);

  function goTo(id: number) {
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function markComplete() {
    const next = completed.includes(activeId) ? completed : [...completed, activeId];
    setCompleted(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    const idx = lessons.findIndex((l) => l.id === activeId);
    if (idx < lessons.length - 1) goTo(lessons[idx + 1].id);
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="leaf">M</span>
          <div><strong>MongoDB Mastery</strong><small>3-Day Intensive Course</small></div>
        </div>

        <div className="progressCard">
          <div className="progressHead"><span>التقدم</span><b>{progress}%</b></div>
          <div className="track"><span style={{ width: `${progress}%` }} /></div>
          <small>{completed.length} / {lessons.length} lessons</small>
        </div>

        <nav>
          {dayLessons.map((group, i) => (
            <section key={i} className="dayGroup">
              <h3>DAY {i + 1} <span>{dayMeta[(i + 1) as 1|2|3].title}</span></h3>
              {group.map((l) => (
                <button key={l.id} className={`lessonLink ${activeId === l.id ? "active" : ""}`} onClick={() => goTo(l.id)}>
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
          <div className="chips"><span>{lesson.duration}</span><span>{dayMeta[lesson.day].title}</span><span>شرح عملي</span></div>
        </header>

        <div className="scene teaching">
          <div className="sceneNo">01</div>
          <div className="grow">
            <span className="sceneLabel">يعني إيه؟</span>
            <h2>افهم الفكرة ببساطة</h2>
            <p className="leadText">{explanation.simple}</p>
          </div>
        </div>

        <div className="scene teaching">
          <div className="sceneNo">02</div>
          <div className="grow">
            <span className="sceneLabel">مثال واقعي</span>
            <h2>خلّي الفكرة ملموسة</h2>
            <div className="exampleBox">{explanation.example}</div>
          </div>
        </div>

        <div className="scene teaching">
          <div className="sceneNo">03</div>
          <div className="grow">
            <span className="sceneLabel">نقاط الدرس</span>
            <h2>نفهم كل نقطة واحدة واحدة</h2>
            <div className="conceptGrid">
              {points.map((point, index) => (
                <article className="conceptCard detailed" key={point.title}>
                  <div className="conceptIndex">{String(index + 1).padStart(2, "0")}</div>
                  <div className="conceptBody">
                    <h3>{point.title}</h3>
                    <p>{point.explanation}</p>
                    {point.example && <div className="miniExample"><b>مثال:</b> {point.example}</div>}
                    {point.code && <pre className="miniCode"><code>{point.code}</code></pre>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="scene teaching">
          <div className="sceneNo">04</div>
          <div className="grow">
            <span className="sceneLabel">كيف تعمل الفكرة؟</span>
            <h2>رتّب الصورة في دماغك</h2>
            <div className="steps">
              {explanation.how.map((item, index) => (
                <div className="step" key={item}><b>{index + 1}</b><p>{item}</p></div>
              ))}
            </div>
          </div>
        </div>

        <div className="scene teaching">
          <div className="sceneNo">07</div>
          <div className="grow">
            <span className="sceneLabel">جرّب بنفسك</span>
            <h2>اكتب وشغّل الكود داخل الدرس</h2>
            <p className="playgroundIntro">
              غيّر القيم بنفسك ثم اضغط Run. الهدف هنا أن ترى نتيجة الـ Query فورًا بدل الاكتفاء بقراءة الكود.
            </p>
            {explanation.codeNote && <p className="codeNote">{explanation.codeNote}</p>}
            <Playground lessonId={lesson.id} initialCode={playgroundExamples[lesson.id] ?? lesson.code} challengeCode={challenge?.code} challengePrompt={challenge?.prompt} />
          </div>
        </div>

        <div className="rememberCard">
          <span>الخلاصة التي يجب أن تتذكرها</span>
          <strong>{explanation.remember}</strong>
        </div>

        <div className="scene">
          <div className="sceneNo">05</div>
          <div className="grow">
            <span className="sceneLabel">جرّب بنفسك</span>
            <h2>Challenge صغير</h2>
            <p className="challenge">{challenge?.prompt ?? lesson.challenge}</p>
            <p className="hint">التحدي مرتبط بنفس مثال الـ Playground. اضغط Load Challenge داخل المحرر، عدّل الكود ثم اضغط Run.</p>
          </div>
        </div>

        <div className="scene">
          <div className="sceneNo">06</div>
          <div className="grow">
            <span className="sceneLabel">تأكد أنك فهمت</span>
            <h2>Quick Quiz</h2>
            <p>{lesson.quiz.question}</p>
            <div className="answers">
              {lesson.quiz.options.map((opt, idx) => (
                <button key={opt}
                  className={`answer ${showAnswer && idx === lesson.quiz.answer ? "correct" : ""} ${showAnswer && selectedAnswer === idx && idx !== lesson.quiz.answer ? "wrong" : ""}`}
                  onClick={() => { setSelectedAnswer(idx); setShowAnswer(true); }}>
                  {String.fromCharCode(65+idx)}. {opt}
                </button>
              ))}
            </div>
            {showAnswer && <div className="feedback">{selectedAnswer === lesson.quiz.answer ? "✓ إجابة صحيحة. " : "الإجابة تحتاج مراجعة. "}{lesson.quiz.explanation}</div>}
          </div>
        </div>

        <footer className="lessonFooter">
          <button className="secondary" disabled={activeId === 1} onClick={() => goTo(activeId - 1)}>السابق</button>
          <button className="primary" onClick={markComplete}>{completed.includes(activeId) ? "التالي" : "أكملت الدرس ←"}</button>
        </footer>
      </section>
    </main>
  );
}
