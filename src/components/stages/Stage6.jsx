import { useState, useEffect } from 'react';
import Icon from '../Icon';
import StepBreadcrumb, { StepNav } from '../StepBreadcrumb';

const STEPS = ['Interview Answers', 'Story Bank'];

const standardQuestions = [
  { key: 'q1',  text: 'Tell me about yourself / Walk me through your career' },
  { key: 'q2',  text: 'Why have you worked across so many different fields/roles?' },
  { key: 'q3',  text: 'What is your area of expertise / What\'s your specialty?' },
  { key: 'q4',  text: 'Where do you see yourself in 5 years?' },
  { key: 'q5',  text: 'Why do you want to leave your current role?' },
  { key: 'q6',  text: 'What is your greatest professional achievement?' },
  { key: 'q7',  text: 'What sets you apart from other candidates?' },
  { key: 'q8',  text: 'How do you stay organized when working across different domains?' },
  { key: 'q9',  text: 'Give me an example of a time you had to quickly learn something new' },
  { key: 'q10', text: 'How do you explain your value to specialists who may be skeptical of generalists?' },
];

const starlParts = [
  { letter: 'S', word: 'Situation', desc: 'Set the context — what was happening? What was the challenge or opportunity?' },
  { letter: 'T', word: 'Task',      desc: 'What was your specific role or responsibility in this situation?' },
  { letter: 'A', word: 'Action',    desc: 'What did YOU specifically do? What decisions did you make?' },
  { letter: 'R', word: 'Result',    desc: 'What was the outcome? Quantify where possible.' },
  { letter: 'L', word: 'Learning',  desc: 'What did you learn? How did it shape your approach going forward?' },
];

function STARLEntry({ index, data, onChange, onRemove, canRemove }) {
  return (
    <div className="card" style={{ marginBottom: '20px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--gray-900)' }}>Story {index + 1}</h3>
        {canRemove && (
          <button className="btn btn-secondary btn-sm" onClick={onRemove}>Remove</button>
        )}
      </div>
      <div className="field-group">
        <label className="field-label">Story title / Initiative name</label>
        <input type="text" placeholder="e.g. Led cross-functional product relaunch at Acme Corp" value={data.title || ''} onChange={e => onChange('title', e.target.value)} />
      </div>
      {starlParts.map(part => (
        <div key={part.letter} className="starl-item">
          <div className="starl-header">
            <span className="starl-letter">{part.letter}</span>
            <div>
              <div className="starl-header-text">{part.word}</div>
              <div className="starl-header-desc">{part.desc}</div>
            </div>
          </div>
          <div className="starl-body">
            <textarea rows={3} placeholder={`Describe the ${part.word.toLowerCase()}...`} value={data[part.letter.toLowerCase()] || ''} onChange={e => onChange(part.letter.toLowerCase(), e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Stage6({ data, onUpdate, onComplete, isCompleted }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(data.interviewAnswers || {});
  const [stories, setStories] = useState(data.starlStories || [{}]);

  useEffect(() => { onUpdate({ interviewAnswers: answers, starlStories: stories }); }, [answers, stories]);

  function updateAnswer(key, value) { setAnswers(prev => ({ ...prev, [key]: value })); }
  function updateStory(index, field, value) { setStories(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s)); }
  function addStory() { setStories(prev => [...prev, {}]); }
  function removeStory(index) { setStories(prev => prev.filter((_, i) => i !== index)); }

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-badge"><Icon name="record_voice_over" size="13px" /> Stage 6</div>
        <h1 className="stage-title">Nailing Your Narrative When It Matters</h1>
        <div className="stage-meta">
          <span className="stage-time"><Icon name="schedule" size="15px" /> Est. 2–3 hrs per interview</span>
        </div>
      </div>

      <StepBreadcrumb steps={STEPS} current={step} onNavigate={setStep} />

      {/* ── Step 0: Interview Answers ── */}
      {step === 0 && (
        <>
          <div className="stage-intro">
            Ah, the dreaded interview. Exactly what we all love to hate. But this is exactly when your narrative matters most. You can revisit this stage whenever you're prepping for an interview.
          </div>
          <div className="outcomes-box">
            <h4>By the end of this stage, you'll have:</h4>
            <ul>
              <li>Adapted your narratives to answer key generalist interview questions</li>
              <li>Practiced the STARL interview method</li>
              <li>Built a bank of stories to draw from in interviews</li>
            </ul>
          </div>
          <div className="callout info">
            <Icon name="info" className="callout-icon" />
            <div className="callout-content">
              <p>Interviewing as a generalist is <em>different</em>. You have to tell stories that are often quite complex to demonstrate your value. The key is in preparation.</p>
            </div>
          </div>
          <div className="callout action">
            <Icon name="auto_fix_high" className="callout-icon" />
            <div className="callout-content">
              <h4>Action</h4>
              <p>Write out initial answers to the questions below. As you do more interviews, add the generalist-specific questions you encounter to build your answer bank.</p>
            </div>
          </div>
          {standardQuestions.map(q => (
            <div key={q.key} className="interview-question">
              <div className="interview-q-text">{q.text}</div>
              <textarea rows={4} placeholder="Write your answer here..." value={answers[q.key] || ''} onChange={e => updateAnswer(q.key, e.target.value)} />
            </div>
          ))}
        </>
      )}

      {/* ── Step 1: STARL Story Bank ── */}
      {step === 1 && (
        <>
          <div className="callout action">
            <Icon name="auto_fix_high" className="callout-icon" />
            <div className="callout-content">
              <h4>Action</h4>
              <p>Think of your best professional stories to illuminate your generalist experiences. Build a bank of stories you can reuse whenever a new opportunity arises.</p>
            </div>
          </div>
          <div className="callout tip">
            <Icon name="tips_and_updates" className="callout-icon" />
            <div className="callout-content">
              <h4>The STARL Framework</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                {starlParts.map(p => (
                  <span key={p.letter} style={{ background: 'var(--purple-100)', color: 'var(--purple-700)', padding: '3px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: '600' }}>
                    {p.letter} — {p.word}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {stories.map((story, i) => (
            <STARLEntry key={i} index={i} data={story} onChange={(field, val) => updateStory(i, field, val)} onRemove={() => removeStory(i)} canRemove={stories.length > 1} />
          ))}
          <button className="btn btn-secondary" onClick={addStory} style={{ marginBottom: '24px' }}>
            <Icon name="add" size="16px" /> Add Another Story
          </button>
        </>
      )}

      <StepNav current={step} total={STEPS.length} onBack={() => setStep(s => s - 1)} onNext={() => setStep(s => s + 1)} onComplete={onComplete} isCompleted={isCompleted} />
    </div>
  );
}
