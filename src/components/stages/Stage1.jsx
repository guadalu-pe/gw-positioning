import { useState, useEffect } from 'react';
import { softSkills, computeSkillType } from '../../data/skills';

const reflections = [
  {
    key: 'play',
    title: 'What feels like play to you that seems like work to others?',
    description: 'Think back to when you were a child or teenager. What were 3 things you were obsessed with, couldn\'t get enough of, or kept being drawn back to?',
  },
  {
    key: 'feedback',
    title: 'What strengths do others see in you?',
    description: 'Look at feedback forms or past performance reviews. What are your 3–5 greatest strengths according to others?',
  },
  {
    key: 'advice',
    title: 'What do people always come to you for?',
    description: 'What do your friends, family and colleagues always ask your advice about? Consider sending a quick feedback form to find out.',
  },
];

function getTypeClass(type) {
  if (!type) return '';
  if (type.includes('Energiser')) return 'energiser';
  if (type.includes('Asset')) return 'asset';
  if (type.includes('Drainer')) return 'drainer';
  if (type.includes('Potential')) return 'potential';
  return '';
}

export default function Stage1({ data, onUpdate, onComplete, isCompleted }) {
  const [reflectionAnswers, setReflectionAnswers] = useState(data.reflections || {});
  const [skillData, setSkillData] = useState(data.skills || {});

  useEffect(() => {
    onUpdate({ reflections: reflectionAnswers, skills: skillData });
  }, [reflectionAnswers, skillData]);

  function updateReflection(key, value) {
    setReflectionAnswers(prev => ({ ...prev, [key]: value }));
  }

  function updateSkill(name, field, value) {
    setSkillData(prev => ({
      ...prev,
      [name]: { ...(prev[name] || {}), [field]: value },
    }));
  }

  const energisers = Object.entries(skillData)
    .filter(([, v]) => v.wantToDo && v.skillLevel)
    .map(([name, v]) => ({ name, type: computeSkillType(v.wantToDo, v.skillLevel) }))
    .filter(s => s.type.includes('Energiser'));

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-badge">⛳ Stage 1</div>
        <h1 className="stage-title">Identifying Your Strengths & Superpowers</h1>
        <div className="stage-meta">
          <span className="stage-time">⏰ Est. 2–4 hours</span>
          <span style={{ fontSize: '13px', color: 'var(--gray-400)' }}>🟣 ⚪ ⚪ ⚪ ⚪ ⚪</span>
        </div>
      </div>

      <div className="stage-intro">
        Welcome to the first step of your positioning journey! Identifying your strengths and superpowers is one of the most high-leverage things you can do to develop confidence in your story.
        <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(124,58,237,0.05)', borderRadius: '8px', fontSize: '13px' }}>
          💜 <strong>Quick Tip:</strong> It's helpful to do these exercises once, but even more fruitful to do it repeatedly — once a quarter or twice a year.
        </div>
      </div>

      <div className="outcomes-box">
        <h4>By the end of this stage, you'll have:</h4>
        <ul>
          <li>Identified your core strengths and skills</li>
          <li>Mapped your skills as assets, energisers, drainers and potentials</li>
        </ul>
      </div>

      {/* Step 1 */}
      <div className="section-header">
        <span className="step-badge">Step 1</span>
        <h2>Understand Strengths vs. Skills</h2>
      </div>

      <div className="callout info">
        <span className="callout-icon">💡</span>
        <div className="callout-content">
          <p><strong>Strengths</strong> are things you're naturally good at. <strong>Skills</strong> are things you learn and develop over time. Ideally, you want to lean into your strengths as much as possible — even if you have strengths in areas you don't care about, understanding what comes naturally is a key part of this process.</p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="section-header">
        <span className="step-badge">Step 2</span>
        <h2>Identify Your Strengths</h2>
      </div>

      <div className="callout action">
        <span className="callout-icon">🪄</span>
        <div className="callout-content">
          <h4>Action</h4>
          <p>Ask yourself the questions below and write your answers. By the end, you should have a much clearer view of your key strengths.</p>
        </div>
      </div>

      {reflections.map(r => (
        <div key={r.key} className="field-group">
          <label className="field-label">{r.title}</label>
          <p className="field-description">{r.description}</p>
          <textarea
            rows={4}
            placeholder="Write your thoughts here..."
            value={reflectionAnswers[r.key] || ''}
            onChange={e => updateReflection(r.key, e.target.value)}
          />
        </div>
      ))}

      {/* Step 3 */}
      <div className="section-header">
        <span className="step-badge">Step 3</span>
        <h2>Map Your Skills</h2>
      </div>

      <div className="callout info">
        <span className="callout-icon">💡</span>
        <div className="callout-content">
          <p>Segment your skills into four types:</p>
          <ul style={{ marginTop: '8px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li>⚖️ <strong>Assets</strong> — good at but want to do less of</li>
            <li>🚀 <strong>Energisers</strong> — good at and want to do more of</li>
            <li>❌ <strong>Drainers</strong> — not good at and want to do less of</li>
            <li>⚡ <strong>Potentials</strong> — want to do more of but not good at yet</li>
          </ul>
        </div>
      </div>

      <div className="callout action">
        <span className="callout-icon">🪄</span>
        <div className="callout-content">
          <h4>Action</h4>
          <p>Fill in the "Want to do" and "Skill level" columns below. The Type column will update automatically.</p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="skills-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Category</th>
              <th>Want to do this…</th>
              <th>My skill level is…</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {softSkills.map(skill => {
              const sd = skillData[skill.name] || {};
              const type = computeSkillType(sd.wantToDo, sd.skillLevel);
              const typeClass = getTypeClass(type);
              return (
                <tr key={skill.name}>
                  <td style={{ fontWeight: 500 }}>{skill.name}</td>
                  <td style={{ color: 'var(--gray-500)', fontSize: '12px' }}>{skill.category}</td>
                  <td>
                    <select
                      value={sd.wantToDo || ''}
                      onChange={e => updateSkill(skill.name, 'wantToDo', e.target.value)}
                    >
                      <option value="">—</option>
                      <option value="More">More</option>
                      <option value="Same">Same</option>
                      <option value="Less">Less</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={sd.skillLevel || ''}
                      onChange={e => updateSkill(skill.name, 'skillLevel', e.target.value)}
                    >
                      <option value="">—</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>
                  <td>
                    <span className={`type-badge ${typeClass}`}>{type || '—'}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {energisers.length > 0 && (
        <div className="callout tip" style={{ marginBottom: '24px' }}>
          <span className="callout-icon">🚀</span>
          <div className="callout-content">
            <h4>Your Energisers ({energisers.length})</h4>
            <p>These are your sweet spot skills — things you're great at AND want to do more of:</p>
            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {energisers.map(e => (
                <span key={e.name} style={{ background: '#d1fae5', color: '#059669', padding: '3px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: '600' }}>
                  {e.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

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
