import Icon from './Icon';

const stages = [
  { id: 'stage1', icon: 'bolt',              title: 'Identify Your Strengths & Superpowers',  time: '2–4 hours',          desc: 'Discover your core skills and map them as energisers, assets, drainers and potentials.' },
  { id: 'stage2', icon: 'psychology',        title: 'Discover Your Generalist Archetype',      time: '30–45 min',          desc: 'Take the archetype quiz and find out if you\'re a Translator, Connector, Innovator or Systems Thinker.' },
  { id: 'stage3', icon: 'edit_note',         title: 'Craft Your Generalist Narrative',         time: '2–4 hours',          desc: 'Use the Name, Same, Fame, Aim, Game framework and generate your AI-powered tagline.' },
  { id: 'stage4', icon: 'palette',           title: 'Create Your Generalist Portfolio',        time: '1–2 hours',          desc: 'Build a digital personal portfolio that shows, not just tells, your generalist story.' },
  { id: 'stage5', icon: 'view_list',         title: 'Put It All Together',                     time: '30 min',             desc: 'Review everything you\'ve built and get a clear summary of your positioning in one place.' },
  { id: 'stage6', icon: 'record_voice_over', title: 'Nail Your Narrative When It Matters',     time: '2–3 hrs / interview', desc: 'Prep for interviews using the STARL method and your bank of generalist stories.' },
  { id: 'gallery',icon: 'grid_view',         title: 'Profile Gallery',                         time: null,                 desc: 'Browse 50+ real generalist portfolios for inspiration on how to present your story.' },
];

export default function Home({ onNavigate, completed }) {
  return (
    <div>
      <div className="home-hero">
        <h1>
          Own Your Story as a <span>Generalist</span>
        </h1>
        <p>
          We've helped thousands of generalists design their careers. This interactive guidebook walks you
          through the toughest challenge: embracing who you are and owning your narrative.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-accent" onClick={() => onNavigate('stage1')}>
            Start Stage 1
            <Icon name="arrow_forward" size="18px" />
          </button>
          <a
            href="https://www.generalist.world/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Visit Generalist World
            <Icon name="open_in_new" size="16px" />
          </a>
        </div>
      </div>

      <div style={{ padding: '0 36px 14px', maxWidth: '780px', margin: '0 auto' }}>
        <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Your journey
        </p>
      </div>

      <div className="home-cards">
        {stages.map(s => (
          <button
            key={s.id}
            className={`home-stage-card ${completed.includes(s.id) ? 'completed' : ''}`}
            onClick={() => onNavigate(s.id)}
          >
            <Icon name={s.icon} className="home-card-icon" />
            <span className="home-card-title">{s.title}</span>
            {s.time && (
              <span className="home-card-time">
                <Icon name="schedule" size="13px" style={{ marginRight: 4 }} />
                {s.time}
              </span>
            )}
            <span style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.4' }}>{s.desc}</span>
            {completed.includes(s.id) && (
              <span className="home-card-check">
                <Icon name="check_circle" size="14px" style={{ marginRight: 4 }} />
                Complete
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '0 36px 48px', color: 'var(--gray-400)', fontSize: '13px' }}>
        Made with care by{' '}
        <a href="https://www.generalist.world/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gw-purple)' }}>
          Generalist World
        </a>
      </div>
    </div>
  );
}
