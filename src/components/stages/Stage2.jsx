import { useState } from 'react';
import { quizQuestions, archetypes, computeArchetype } from '../../data/quiz';
import Icon from '../Icon';
import StepBreadcrumb, { StepNav } from '../StepBreadcrumb';

const STEPS = ['Take the Quiz', 'Your Archetype'];

export default function Stage2({ data, onUpdate, onComplete, isCompleted }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(data.quizAnswers || {});
  const [result, setResult] = useState(data.archetypeResult || null);
  const [submitted, setSubmitted] = useState(!!data.archetypeResult);

  const answered = Object.keys(answers).length;
  const total = quizQuestions.length;
  const allAnswered = answered === total;

  function selectAnswer(questionId, key) {
    if (submitted) return;
    const updated = { ...answers, [questionId]: key };
    setAnswers(updated);
    onUpdate({ quizAnswers: updated, archetypeResult: result });
  }

  function submitQuiz() {
    const archetype = computeArchetype(answers);
    setResult(archetype);
    setSubmitted(true);
    onUpdate({ quizAnswers: answers, archetypeResult: archetype });
    setStep(1);
  }

  function retakeQuiz() {
    setAnswers({});
    setResult(null);
    setSubmitted(false);
    onUpdate({ quizAnswers: {}, archetypeResult: null });
    setStep(0);
  }

  const archetypeColors = {
    translator:       { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
    connector:        { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
    innovator:        { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
    'systems-thinker':{ bg: '#fee2e2', text: '#7f1d1d', border: '#fca5a5' },
  };

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-badge"><Icon name="psychology" size="13px" /> Stage 2</div>
        <h1 className="stage-title">Discovering Your Generalist Archetype</h1>
        <div className="stage-meta">
          <span className="stage-time"><Icon name="schedule" size="15px" /> Est. 30–45 minutes</span>
        </div>
      </div>

      <StepBreadcrumb steps={STEPS} current={step} onNavigate={setStep} />

      {/* ── Step 0: Quiz ── */}
      {step === 0 && (
        <>
          <div className="stage-intro">
            Now that you have a better understanding of your skills and strengths, it's time to figure out who you really ARE as a generalist. This is about developing a better understanding of yourself so you can learn to sell yourself to employers and collaborators.
          </div>

          <div className="outcomes-box">
            <h4>By the end of this stage, you'll have:</h4>
            <ul>
              <li>Understood the four core generalist archetypes</li>
              <li>Identified which archetype you most align with</li>
            </ul>
          </div>

          <div className="callout action" style={{ marginBottom: '20px' }}>
            <Icon name="auto_fix_high" className="callout-icon" />
            <div className="callout-content">
              <h4>Action</h4>
              <p>Answer all {total} questions below to discover your generalist archetype. There are no right or wrong answers — go with your gut!</p>
              <p style={{ marginTop: '6px', color: 'var(--gray-500)' }}>{answered}/{total} answered</p>
            </div>
          </div>

          <div style={{ background: 'var(--gray-100)', borderRadius: '99px', height: '6px', marginBottom: '24px', overflow: 'hidden' }}>
            <div style={{ width: `${(answered / total) * 100}%`, background: 'linear-gradient(to right, var(--purple-500), var(--purple-700))', height: '100%', borderRadius: '99px', transition: 'width 0.3s ease' }} />
          </div>

          {quizQuestions.map((q, i) => (
            <div key={q.id} className="quiz-question">
              <div className="quiz-q-number">Question {i + 1} of {total}</div>
              <div className="quiz-q-text">{q.question}</div>
              <div className="quiz-options">
                {q.options.map(opt => (
                  <button key={opt.key} className={`quiz-option ${answers[q.id] === opt.key ? 'selected' : ''}`} onClick={() => selectAnswer(q.id, opt.key)}>
                    <span className="quiz-option-dot" />{opt.text}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <button className="btn btn-primary" disabled={!allAnswered} onClick={submitQuiz} style={{ fontSize: '16px', padding: '12px 32px' }}>
              {allAnswered
                ? <><Icon name="arrow_forward" size="18px" /> Reveal My Archetype</>
                : `Answer all ${total} questions to continue`}
            </button>
          </div>
        </>
      )}

      {/* ── Step 1: Archetype Result + Overview ── */}
      {step === 1 && (
        <>
          {result && (() => {
            const colors = archetypeColors[result.key] || archetypeColors.translator;
            return (
              <>
                <div className="archetype-result" style={{ background: `linear-gradient(135deg, ${colors.bg}, ${colors.bg}cc)`, border: `1px solid ${colors.border}`, color: colors.text }}>
                  <div className="archetype-emoji"><Icon name={result.icon} size="36px" style={{ color: colors.text }} /></div>
                  <div className="archetype-name">{result.name}</div>
                  <div className="archetype-tagline">{result.tagline}</div>
                  <div className="archetype-description">{result.description}</div>
                  <div className="archetype-strengths">
                    {result.strengths.map(s => <span key={s} className="strength-tag">{s}</span>)}
                  </div>
                  <div className="archetype-growth">
                    <h4>Growth opportunities for you:</h4>
                    <ul>{result.growth.map((g, i) => <li key={i}>{g}</li>)}</ul>
                  </div>
                </div>

                <div className="card" style={{ marginBottom: '16px' }}>
                  <div className="card-title">Typical roles for {result.name}s</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {result.roles.map(r => (
                      <span key={r} style={{ background: 'var(--purple-100)', color: 'var(--purple-700)', padding: '4px 12px', borderRadius: '99px', fontSize: '13px', fontWeight: '500' }}>{r}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                  <button className="btn btn-secondary" onClick={retakeQuiz}>
                    <Icon name="replay" size="16px" /> Retake Quiz
                  </button>
                  <a href="https://www.generalistquiz.com/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Try the Official GW Quiz <Icon name="open_in_new" size="15px" />
                  </a>
                </div>
              </>
            );
          })()}

          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--gray-700)', marginBottom: '12px' }}>The Four Generalist Archetypes</h3>
          <p style={{ color: 'var(--gray-600)', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
            After working with hundreds of generalists, Generalist World identified four broad categories. Most people have a primary archetype with elements of others.
          </p>

          {Object.entries(archetypes).map(([key, arch]) => {
            const colors = archetypeColors[arch.key] || archetypeColors.translator;
            return (
              <div key={key} className="card" style={{ borderLeft: `4px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Icon name={arch.icon} size="26px" style={{ color: colors.text, flexShrink: 0 }} />
                  <div>
                    <div className="card-title" style={{ marginBottom: '2px' }}>{arch.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--gray-500)', fontStyle: 'italic' }}>{arch.tagline}</div>
                  </div>
                  {result && result.key === arch.key && (
                    <span style={{ marginLeft: 'auto', background: colors.bg, color: colors.text, border: `1px solid ${colors.border}`, padding: '3px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: '600' }}>
                      Your Archetype
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.6' }}>{arch.description.split('\n\n')[0]}</p>
              </div>
            );
          })}
        </>
      )}

      <StepNav current={step} total={STEPS.length} onBack={() => setStep(s => s - 1)} onNext={() => setStep(s => s + 1)} onComplete={onComplete} isCompleted={isCompleted} />
    </div>
  );
}
