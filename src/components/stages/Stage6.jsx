import { useState, useEffect } from 'react';

const standardQuestions = [
  { key: 'q1', text: 'Tell me about yourself / Walk me through your career' },
  { key: 'q2', text: 'Why have you worked across so many different fields/roles?' },
  { key: 'q3', text: 'What is your area of expertise / What\'s your specialty?' },
  { key: 'q4', text: 'Where do you see yourself in 5 years?' },
  { key: 'q5', text: 'Why do you want to leave your current role?' },
  { key: 'q6', text: 'What is your greatest professional achievement?' },
  { key: 'q7', text: 'What sets you apart from other candidates?' },
  { key: 'q8', text: 'How do you stay organized when working across different domains?' },
  { key: 'q9', text: 'Give me an example of a time you had to quickly learn something new' },
  { key: 'q10', text: 'How do you explain your value to specialists who may be skeptical of generalists?' },
];

const starlParts = [
  { letter: 'S', word: 'Situation', desc: 'Set the context — what was happening? What was the challenge or opportunity?' },
  { letter: 'T', word: 'Task', desc: 'What was your specific role or responsibility in this situation?' },
  { letter: 'A', word: 'Action', desc: 'What did YOU specifically do? What decisions did you make?' },
  { letter: 'R', word: 'Result', desc: 'What was the outcome? Quantify where possible.' },
  { letter: 'L', word: 'Learning', desc: 'What did you learn? How did it shape your approach going forward?' },
];

function STARLEntry({ index, data, onChange }) {
  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--gray-900)' }}>Story {index + 1}</h3>
      </div>

      <div className="field-group">
        <label className="field-label">Story title / Initiative name</label>
        <input
          type="text"
          placeholder="e.g. Led cross-functional product relaunch at Acme Corp"
          value={data.title || ''}
          onChange={e => onChange('title', e.target.value)}
        />
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
            <textarea
              rows={3}
              placeholder={`Describe the ${part.word.toLowerCase()}...`}
              value={data[part.letter.toLowerCase()] || ''}
              onChange={e => onChange(part.letter.toLowerCase(), e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Stage6({ data, onUpdate, onComplete, isCompleted }) {
  const [answers, setAnswers] = useState(data.interviewAnswers || {});
  const [stories, setStories] = useState(data.starlStories || [{}]);

  useEffect(() => {
    onUpdate({ interviewAnswers: answers, starlStories: stories });
  }, [answers, stories]);

  function updateAnswer(key, value) {
    setAnswers(prev => ({ ...prev, [key]: value }));
  }

  function updateStory(index, field, value) {
    const updated = stories.map((s, i) => i === index ? { ...s, [field]: value } : s);
    setStories(updated);
  }

  function addStory() {
    setStories(prev => [...prev, {}]);
  }

  function removeStory(index) {
    setStories(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-badge">🖇️ Stage 6</div>
        <h1 className="stage-title">Nailing Your Narrative When It Matters</h1>
        <div className="stage-meta">
          <span className="stage-time">⏰ Est. 2–3 hrs per interview</span>
          <span style={{ fontSize: '13px', color: 'var(--gray-400)' }}>🟣 🟣 🟣 🟣 🟣 🟣</span>
        </div>
      </div>

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

      {/* Step 1 */}
      <div className="section-header">
        <span className="step-badge">Step 1</span>
        <h2>Prep Your Interview Answers</h2>
      </div>

      <div className="callout info">
        <span className="callout-icon">💡</span>
        <div className="callout-content">
          <p>Interviewing as a generalist is <em>different</em>. You have to tell stories that are often quite complex to demonstrate your value. The key is in preparation. Use the questions below to start writing initial answers, and add more as you encounter them in real interviews.</p>
        </div>
      </div>

      <div className="callout action">
        <span className="callout-icon">🪄</span>
        <div className="callout-content">
          <h4>Action</h4>
          <p>Write out initial answers to the questions below. As you do more interviews, add the generalist-specific questions you encounter to build your answer bank.</p>
        </div>
      </div>

      {standardQuestions.map(q => (
        <div key={q.key} className="interview-question">
          <div className="interview-q-text">{q.text}</div>
          <textarea
            rows={4}
            placeholder="Write your answer here..."
            value={answers[q.key] || ''}
            onChange={e => updateAnswer(q.key, e.target.value)}
          />
        </div>
      ))}

      {/* Step 2: STARL */}
      <div className="section-header">
        <span className="step-badge">Step 2</span>
        <h2>The STARL Method: Your Story Bank</h2>
      </div>

      <div className="callout action">
        <span className="callout-icon">🪄</span>
        <div className="callout-content">
          <h4>Action</h4>
          <p>For every interview, think of your best professional stories to illuminate your generalist experiences. Plan your answers (but don't over-rehearse!). Build a bank of stories you can reuse whenever a new opportunity arises.</p>
        </div>
      </div>

      <div className="callout tip">
        <span className="callout-icon">💡</span>
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
        <div key={i} style={{ position: 'relative' }}>
          <STARLEntry index={i} data={story} onChange={(field, val) => updateStory(i, field, val)} />
          {stories.length > 1 && (
            <button
              className="btn btn-secondary btn-sm"
              style={{ position: 'absolute', top: '16px', right: '16px' }}
              onClick={() => removeStory(i)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button className="btn btn-secondary" onClick={addStory} style={{ marginBottom: '24px' }}>
        + Add Another Story
      </button>

      <div className="stage-complete-row">
        <button
          className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`}
          onClick={onComplete}
        >
          {isCompleted ? '✓ Stage Complete!' : 'Mark Stage Complete →'}
        </button>
      </div>
    </div>
  );
}
