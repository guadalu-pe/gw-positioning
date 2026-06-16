import { useState, useEffect } from 'react';
import { softSkills, computeSkillType, skillTypeIcon } from '../../data/skills';
import Icon from '../Icon';

const reflections = [
  {
    key: 'play',
    title: 'What feels like play to you that seems like work to others?',
    description: "Think back to when you were a child or teenager. What were 3 things you were obsessed with, couldn't get enough of, or kept being drawn back to?",
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

const wantOptions = [
  { value: 'More', symbol: '+' },
  { value: 'Same', symbol: '=' },
  { value: 'Less', symbol: '−' },
];

function WantPicker({ value, onChange }) {
  return (
    <div className="want-picker">
      {wantOptions.map(opt => (
        <button
          key={opt.value}
          className={`want-btn ${value === opt.value ? 'selected' : ''}`}
          onClick={() => onChange(value === opt.value ? '' : opt.value)}
          aria-label={opt.value}
          title={opt.value}
        >
          {opt.symbol}
        </button>
      ))}
    </div>
  );
}

function SkillDots({ value, onChange }) {
  const filled = typeof value === 'number' ? value : 0;
  function handleClick(i) {
    onChange(filled === i ? 0 : i);
  }
  return (
    <div className="skill-dots" title={filled ? `Level ${filled}/5` : 'Click to set skill level'}>
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          className={`skill-dot ${filled >= i ? 'filled' : ''}`}
          onClick={() => handleClick(i)}
          aria-label={`Level ${i}`}
        />
      ))}
    </div>
  );
}

const typeStyleMap = {
  Energiser: { className: 'energiser', color: '#059669' },
  Asset:     { className: 'asset',     color: '#d97706' },
  Drainer:   { className: 'drainer',   color: '#dc2626' },
  Potential: { className: 'potential', color: 'var(--gw-purple)' },
};

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
    .filter(([, v]) => computeSkillType(v.wantToDo, v.skillLevel) === 'Energiser')
    .map(([name]) => name);

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-badge">
          <Icon name="bolt" size="13px" />
          Stage 1
        </div>
        <h1 className="stage-title">Identifying Your Strengths & Superpowers</h1>
        <div className="stage-meta">
          <span className="stage-time">
            <Icon name="schedule" size="15px" />
            Est. 2–4 hours
          </span>
        </div>
      </div>

      <div className="stage-intro">
        Welcome to the first step of your positioning journey! Identifying your strengths and superpowers is one of the most high-leverage things you can do to develop confidence in your story.
        <div style={{ marginTop: '10px', padding: '10px 14px', background: 'rgba(92,0,152,0.05)', borderRadius: '8px', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <Icon name="tips_and_updates" size="16px" style={{ color: 'var(--gw-purple)', marginTop: '1px', flexShrink: 0 }} />
          <span>It's helpful to do these exercises once, but even more fruitful to do it repeatedly — once a quarter or twice a year.</span>
        </div>
      </div>

      <div className="outcomes-box">
        <h4>By the end of this stage, you'll have:</h4>
        <ul>
          <li>Identified your core strengths and skills</li>
          <li>Mapped your skills as assets, energisers, drainers and potentials</li>
        </ul>
      </div>

      <div className="section-header">
        <span className="step-badge">Step 1</span>
        <h2>Understand Strengths vs. Skills</h2>
      </div>

      <div className="callout info">
        <Icon name="info" className="callout-icon" />
        <div className="callout-content">
          <p><strong>Strengths</strong> are things you're naturally good at. <strong>Skills</strong> are things you learn and develop over time. Ideally, you want to lean into your strengths as much as possible — even if you have strengths in areas you don't care about, understanding what comes naturally is a key part of this process.</p>
        </div>
      </div>

      <div className="section-header">
        <span className="step-badge">Step 2</span>
        <h2>Identify Your Strengths</h2>
      </div>

      <div className="callout action">
        <Icon name="auto_fix_high" className="callout-icon" />
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

      <div className="section-header">
        <span className="step-badge">Step 3</span>
        <h2>Map Your Skills</h2>
      </div>

      <div className="callout info">
        <Icon name="info" className="callout-icon" />
        <div className="callout-content">
          <p>Segment your skills into four types:</p>
          <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {[
              { icon: 'balance',       label: 'Assets',    desc: 'Good at, want to do less of',    color: '#d97706' },
              { icon: 'rocket_launch', label: 'Energisers',desc: 'Good at, want to do more of',    color: '#059669' },
              { icon: 'do_not_disturb',label: 'Drainers',  desc: 'Not good at, want to do less of',color: '#dc2626' },
              { icon: 'bolt',          label: 'Potentials', desc: 'Want more of, not good at yet',  color: 'var(--gw-purple)' },
            ].map(t => (
              <div key={t.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '13px' }}>
                <Icon name={t.icon} size="16px" style={{ color: t.color, flexShrink: 0, marginTop: '1px' }} />
                <span><strong>{t.label}</strong> — {t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="callout action">
        <Icon name="auto_fix_high" className="callout-icon" />
        <div className="callout-content">
          <h4>Action</h4>
          <p>Fill in the "Want to do" and "Skill level" columns. The Type column updates automatically.</p>
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
              const typeStyle = typeStyleMap[type];
              return (
                <tr key={skill.name}>
                  <td style={{ fontWeight: 500 }}>{skill.name}</td>
                  <td style={{ color: 'var(--gray-500)', fontSize: '12px' }}>{skill.category}</td>
                  <td>
                    <WantPicker
                      value={sd.wantToDo || ''}
                      onChange={val => updateSkill(skill.name, 'wantToDo', val)}
                    />
                  </td>
                  <td>
                    <SkillDots
                      value={sd.skillLevel || ''}
                      onChange={val => updateSkill(skill.name, 'skillLevel', val)}
                    />
                  </td>
                  <td>
                    {type ? (
                      <span className={`type-badge ${typeStyle?.className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Icon name={skillTypeIcon[type]} size="13px" />
                        {type}
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {energisers.length > 0 && (
        <div className="callout tip" style={{ marginBottom: '24px' }}>
          <Icon name="rocket_launch" className="callout-icon" style={{ color: '#059669' }} />
          <div className="callout-content">
            <h4>Your Energisers ({energisers.length})</h4>
            <p>These are your sweet-spot skills — things you're great at and want to do more of:</p>
            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {energisers.map(name => (
                <span key={name} style={{ background: '#d1fae5', color: '#059669', padding: '3px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: '600' }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="stage-complete-row">
        <button className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`} onClick={onComplete}>
          {isCompleted ? (
            <><Icon name="check_circle" size="17px" /> Stage Complete</>
          ) : (
            <>Mark Stage Complete <Icon name="arrow_forward" size="17px" /></>
          )}
        </button>
      </div>
    </div>
  );
}
