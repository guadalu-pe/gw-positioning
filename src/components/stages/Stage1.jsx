import { useState, useEffect } from 'react';
import { softSkills, computeSkillType, skillTypeIcon } from '../../data/skills';
import Icon from '../Icon';
import StepBreadcrumb, { StepNav } from '../StepBreadcrumb';

const STEPS = ['Strengths vs. Skills', 'Identify Strengths', 'Map Your Skills'];

const reflections = [
  { key: 'play', title: 'What feels like play to you that seems like work to others?', description: "Think back to when you were a child or teenager. What were 3 things you were obsessed with, couldn't get enough of, or kept being drawn back to?" },
  { key: 'feedback', title: 'What strengths do others see in you?', description: 'Look at feedback forms or past performance reviews. What are your 3–5 greatest strengths according to others?' },
  { key: 'advice', title: 'What do people always come to you for?', description: 'What do your friends, family and colleagues always ask your advice about? Consider sending a quick feedback form to find out.' },
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
        <button key={opt.value} className={`want-btn ${value === opt.value ? 'selected' : ''}`} onClick={() => onChange(value === opt.value ? '' : opt.value)} aria-label={opt.value} title={opt.value}>
          {opt.symbol}
        </button>
      ))}
    </div>
  );
}

function SkillDots({ value, onChange }) {
  const filled = typeof value === 'number' ? value : 0;
  return (
    <div className="skill-dots" title={filled ? `Level ${filled}/5` : 'Click to set skill level'}>
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} className={`skill-dot ${filled >= i ? 'filled' : ''}`} onClick={() => onChange(filled === i ? 0 : i)} aria-label={`Level ${i}`} />
      ))}
    </div>
  );
}

const calendarOptions = [
  { label: 'Every 3 months', months: 3, rule: 'RRULE:FREQ=MONTHLY;INTERVAL=3' },
  { label: 'Every 6 months', months: 6, rule: 'RRULE:FREQ=MONTHLY;INTERVAL=6' },
  { label: 'Every year',     months: 12, rule: 'RRULE:FREQ=YEARLY;INTERVAL=1' },
];

function addToCalendar(rule) {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(10, 0, 0, 0);
  const fmt = d => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const description = [
    'Time to revisit your generalist positioning!', '',
    'The Generalist World Positioning Guidebook helps you identify your strengths, discover your archetype, craft your narrative, and build a personal portfolio that shows the world who you really are.', '',
    'This recurring reminder keeps your story sharp — because the best generalists never stop owning their narrative.', '',
    'Open your guidebook: https://guadalu-pe.github.io/gw-positioning/', '',
    'Estimated time: 2–4 hours for a full refresh, or 30 min for a quick tune-up.',
  ].join('\n');
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', 'Time to Get Your Positioning Positioned!');
  url.searchParams.set('dates', `${fmt(start)}/${fmt(end)}`);
  url.searchParams.set('recur', rule);
  url.searchParams.set('details', description);
  url.searchParams.set('sf', 'true');
  url.searchParams.set('output', 'xml');
  window.open(url.toString(), '_blank');
}

const typeStyleMap = {
  Energiser: { className: 'energiser', color: '#059669' },
  Asset:     { className: 'asset',     color: '#d97706' },
  Drainer:   { className: 'drainer',   color: '#dc2626' },
  Potential: { className: 'potential', color: 'var(--gw-purple)' },
};

export default function Stage1({ data, onUpdate, onComplete, isCompleted }) {
  const [step, setStep] = useState(0);
  const [reflectionAnswers, setReflectionAnswers] = useState(data.reflections || {});
  const [skillData, setSkillData] = useState(data.skills || {});

  useEffect(() => {
    onUpdate({ reflections: reflectionAnswers, skills: skillData });
  }, [reflectionAnswers, skillData]);

  function updateReflection(key, value) {
    setReflectionAnswers(prev => ({ ...prev, [key]: value }));
  }

  function updateSkill(name, field, value) {
    setSkillData(prev => ({ ...prev, [name]: { ...(prev[name] || {}), [field]: value } }));
  }

  const energisers = Object.entries(skillData)
    .filter(([, v]) => computeSkillType(v.wantToDo, v.skillLevel) === 'Energiser')
    .map(([name]) => name);

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-badge"><Icon name="bolt" size="13px" /> Stage 1</div>
        <h1 className="stage-title">Identifying Your Strengths & Superpowers</h1>
        <div className="stage-meta">
          <span className="stage-time"><Icon name="schedule" size="15px" /> Est. 2–4 hours</span>
        </div>
      </div>

      <StepBreadcrumb steps={STEPS} current={step} onNavigate={setStep} />

      {/* ── Step 0: Strengths vs. Skills ── */}
      {step === 0 && (
        <>
          <div className="stage-intro">
            Welcome to the first step of your positioning journey! Identifying your strengths and superpowers is one of the most high-leverage things you can do to develop confidence in your story.
            <div style={{ marginTop: '10px', padding: '10px 14px', background: 'rgba(92,0,152,0.05)', borderRadius: '8px', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Icon name="tips_and_updates" size="16px" style={{ color: 'var(--gw-purple)', marginTop: '1px', flexShrink: 0 }} />
              <span>It's helpful to do these exercises once, but even more fruitful to do it repeatedly — once a quarter or twice a year.</span>
            </div>
          </div>

          <div className="calendar-prompt">
            <div className="calendar-prompt-header">
              <Icon name="event_repeat" size="20px" style={{ color: 'var(--gw-purple)' }} />
              <div>
                <div className="calendar-prompt-title">Make it a habit</div>
                <div className="calendar-prompt-sub">Add a recurring reminder to revisit your positioning</div>
              </div>
            </div>
            <div className="calendar-prompt-btns">
              {calendarOptions.map(opt => (
                <button key={opt.months} className="calendar-btn" onClick={() => addToCalendar(opt.rule)}>
                  <Icon name="add" size="15px" />{opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="outcomes-box">
            <h4>By the end of this stage, you'll have:</h4>
            <ul>
              <li>Identified your core strengths and skills</li>
              <li>Mapped your skills as assets, energisers, drainers and potentials</li>
            </ul>
          </div>

          <div className="callout info">
            <Icon name="info" className="callout-icon" />
            <div className="callout-content">
              <p><strong>Strengths</strong> are things you're naturally good at. <strong>Skills</strong> are things you learn and develop over time. Ideally, you want to lean into your strengths as much as possible — even if you have strengths in areas you don't care about, understanding what comes naturally is a key part of this process.</p>
            </div>
          </div>
        </>
      )}

      {/* ── Step 1: Identify Your Strengths ── */}
      {step === 1 && (
        <>
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
              <textarea rows={4} placeholder="Write your thoughts here..." value={reflectionAnswers[r.key] || ''} onChange={e => updateReflection(r.key, e.target.value)} />
            </div>
          ))}
        </>
      )}

      {/* ── Step 2: Map Your Skills ── */}
      {step === 2 && (
        <>
          <div className="callout info">
            <Icon name="info" className="callout-icon" />
            <div className="callout-content">
              <p>Segment your skills into four types:</p>
              <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {[
                  { icon: 'balance',        label: 'Assets',     desc: 'Good at, want to do less of',     color: '#d97706' },
                  { icon: 'rocket_launch',  label: 'Energisers', desc: 'Good at, want to do more of',     color: '#059669' },
                  { icon: 'do_not_disturb', label: 'Drainers',   desc: 'Not good at, want to do less of', color: '#dc2626' },
                  { icon: 'bolt',           label: 'Potentials',  desc: 'Want more of, not good at yet',   color: 'var(--gw-purple)' },
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
                      <td><WantPicker value={sd.wantToDo || ''} onChange={val => updateSkill(skill.name, 'wantToDo', val)} /></td>
                      <td><SkillDots value={sd.skillLevel || ''} onChange={val => updateSkill(skill.name, 'skillLevel', val)} /></td>
                      <td>
                        {type ? (
                          <span className={`type-badge ${typeStyle?.className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Icon name={skillTypeIcon[type]} size="13px" />{type}
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
                    <span key={name} style={{ background: '#d1fae5', color: '#059669', padding: '3px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: '600' }}>{name}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <StepNav current={step} total={STEPS.length} onBack={() => setStep(s => s - 1)} onNext={() => setStep(s => s + 1)} onComplete={onComplete} isCompleted={isCompleted} />
    </div>
  );
}
