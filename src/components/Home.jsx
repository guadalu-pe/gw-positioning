import Icon from './Icon';
import { calendarOptions, addToCalendar } from '../utils/calendar';

const stages = [
  { id: 'stage1', icon: 'bolt',              num: '01', title: 'Strengths & Superpowers',  time: '2–4 hrs',  desc: 'Map your core skills as energisers, assets, drainers and potentials.' },
  { id: 'stage2', icon: 'psychology',        num: '02', title: 'Your Generalist Archetype', time: '30–45 min', desc: 'Discover if you\'re a Translator, Connector, Innovator or Systems Thinker.' },
  { id: 'stage3', icon: 'edit_note',         num: '03', title: 'Craft Your Narrative',      time: '2–4 hrs',  desc: 'Use the Name, Same, Fame, Aim, Game framework and generate your AI tagline.' },
  { id: 'stage4', icon: 'palette',           num: '04', title: 'Build Your Portfolio',      time: '1–2 hrs',  desc: 'Build a portfolio that shows, not just tells, your generalist story.' },
  { id: 'stage5', icon: 'view_list',         num: '05', title: 'Putting It All Together',   time: '30 min',   desc: 'Review your complete positioning snapshot in one place.' },
  { id: 'stage6', icon: 'record_voice_over', num: '06', title: 'Nail Your Narrative',       time: '2–3 hrs',  desc: 'Prep for interviews using the STARL method and your story bank.' },
];

const outcomes = [
  { icon: 'bolt',              label: 'Strengths Map',      desc: 'A clear picture of your energiser skills — the things you\'re great at and love to do.' },
  { icon: 'psychology',        label: 'Your Archetype',     desc: 'Know exactly which type of generalist you are and how to talk about it.' },
  { icon: 'edit_note',         label: 'Your Narrative',     desc: 'A compelling one-liner and bio that make people want to know more.' },
  { icon: 'palette',           label: 'Your Portfolio',     desc: 'A personal website that shows the world who you are and what you stand for.' },
];

export default function Home({ onNavigate, completed }) {
  const done = stages.filter(s => completed.includes(s.id)).length;
  const pct = Math.round((done / stages.length) * 100);
  const nextStage = stages.find(s => !completed.includes(s.id));

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <div className="home-hero-new">
        <div className="home-hero-content">
          <div className="home-hero-eyebrow">Generalist World</div>
          <h1 className="home-hero-headline">
            Own Your Story.<br />
            <span className="home-hero-accent">Land Your Next Opportunity.</span>
          </h1>
          <p className="home-hero-sub">
            Identifying your strengths and superpowers is one of the most high-leverage things you can do to develop confidence in your story. This interactive guidebook walks you through every step — from knowing yourself to nailing the interview.
          </p>
          <div className="home-hero-actions">
            <button className="btn btn-accent" onClick={() => onNavigate(nextStage ? nextStage.id : 'stage1')}>
              {done > 0 ? 'Continue Journey' : 'Start Your Journey'}
              <Icon name="arrow_forward" size="18px" />
            </button>
            <a href="https://www.generalist.world/" target="_blank" rel="noopener noreferrer" className="btn btn-hero-ghost">
              Visit Generalist World <Icon name="open_in_new" size="15px" />
            </a>
          </div>
          {done > 0 && (
            <div className="home-hero-progress">
              <div className="home-hero-progress-bar">
                <div style={{ width: `${pct}%` }} className="home-hero-progress-fill" />
              </div>
              <span>{done} of {stages.length} stages complete</span>
            </div>
          )}
        </div>
        <div className="home-hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">6</div>
            <div className="hero-stat-label">Stages</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">10+</div>
            <div className="hero-stat-label">Hours of exercises</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">50+</div>
            <div className="hero-stat-label">Profile examples</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">AI</div>
            <div className="hero-stat-label">Tagline generator</div>
          </div>
        </div>
      </div>

      {/* ── What you'll leave with ── */}
      <div className="home-section">
        <div className="home-section-inner">
          <p className="home-section-eyebrow">What you'll leave with</p>
          <h2 className="home-section-title">Four things every generalist needs</h2>
          <div className="home-outcomes-grid">
            {outcomes.map(o => (
              <div key={o.label} className="home-outcome-card">
                <div className="home-outcome-icon">
                  <Icon name={o.icon} size="22px" />
                </div>
                <div className="home-outcome-label">{o.label}</div>
                <p className="home-outcome-desc">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Make it a habit ── */}
      <div className="home-habit-section">
        <div className="home-section-inner">
          <div className="home-habit-inner">
            <div className="home-habit-text">
              <Icon name="event_repeat" size="28px" style={{ color: 'var(--gw-purple)', marginBottom: '10px' }} />
              <h2 className="home-section-title" style={{ marginBottom: '8px' }}>Make it a habit</h2>
              <p style={{ color: 'var(--gray-600)', fontSize: '14px', lineHeight: '1.7', maxWidth: '420px' }}>
                It's helpful to do these exercises once, but even more fruitful to do it repeatedly — once a quarter or twice a year. Set a recurring reminder and keep your story sharp.
              </p>
            </div>
            <div className="home-habit-btns">
              <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                Add to Google Calendar
              </p>
              {calendarOptions.map(opt => (
                <button key={opt.months} className="calendar-btn home-calendar-btn" onClick={() => addToCalendar(opt.rule)}>
                  <Icon name="add" size="15px" /> {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stage cards ── */}
      <div className="home-section">
        <div className="home-section-inner">
          <p className="home-section-eyebrow">Your journey</p>
          <h2 className="home-section-title">6 stages to own your narrative</h2>

          <div className="home-stages-grid">
            {stages.map(s => {
              const isComplete = completed.includes(s.id);
              const isNext = nextStage?.id === s.id;
              return (
                <button
                  key={s.id}
                  className={`home-stage-card-new ${isComplete ? 'completed' : ''} ${isNext ? 'next' : ''}`}
                  onClick={() => onNavigate(s.id)}
                >
                  <div className="home-stage-num">{s.num}</div>
                  <div className="home-stage-icon">
                    <Icon name={s.icon} size="20px" />
                  </div>
                  <div className="home-stage-body">
                    <div className="home-stage-title">{s.title}</div>
                    <div className="home-stage-desc">{s.desc}</div>
                  </div>
                  <div className="home-stage-right">
                    {isComplete
                      ? <Icon name="check_circle" size="20px" style={{ color: 'var(--green-600)' }} />
                      : <span className="home-stage-time">{s.time}</span>}
                    <Icon name="chevron_right" size="20px" style={{ color: 'var(--gray-300)', flexShrink: 0 }} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Gallery card */}
          <button className="home-gallery-card" onClick={() => onNavigate('gallery')}>
            <Icon name="grid_view" size="22px" />
            <div>
              <div className="home-gallery-title">Profile Gallery</div>
              <div className="home-gallery-desc">Browse 50+ real generalist portfolios for inspiration</div>
            </div>
            <Icon name="arrow_forward" size="18px" style={{ marginLeft: 'auto', flexShrink: 0 }} />
          </button>
        </div>
      </div>

      <div className="home-footer">
        Made with care by{' '}
        <a href="https://www.generalist.world/" target="_blank" rel="noopener noreferrer">
          Generalist World
        </a>
      </div>
    </div>
  );
}
