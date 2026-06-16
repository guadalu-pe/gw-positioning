const stages = [
  { id: 'stage1', emoji: '⛳', title: 'Identify Your Strengths & Superpowers', time: '2–4 hours', desc: 'Discover your core skills and map them as energisers, assets, drainers and potentials.' },
  { id: 'stage2', emoji: '🌱', title: 'Discover Your Generalist Archetype', time: '30–45 min', desc: 'Take the archetype quiz and find out if you\'re a Translator, Connector, Innovator or Systems Thinker.' },
  { id: 'stage3', emoji: '💌', title: 'Craft Your Generalist Narrative', time: '2–4 hours', desc: 'Use the Name, Same, Fame, Aim, Game framework and generate your AI-powered tagline.' },
  { id: 'stage4', emoji: '🎨', title: 'Create Your Generalist Portfolio', time: '1–2 hours', desc: 'Build a digital personal portfolio that shows, not just tells, your generalist story.' },
  { id: 'stage5', emoji: '🎬', title: 'Put It All Together', time: '30 min', desc: 'Review everything you\'ve built and get a clear summary of your positioning in one place.' },
  { id: 'stage6', emoji: '🖇️', title: 'Nail Your Narrative When It Matters', time: '2–3 hrs / interview', desc: 'Prep for interviews using the STARL method and your bank of generalist stories.' },
  { id: 'gallery', emoji: '🗃️', title: 'Profile Gallery', time: null, desc: 'Browse 50+ real generalist portfolios for inspiration on how to present your story.' },
];

export default function Home({ onNavigate, completed }) {
  return (
    <div>
      <div className="home-hero">
        <h1>
          Own Your Story as a <span>Generalist</span>
        </h1>
        <p>
          We've helped thousands of generalists design their careers. This interactive guidebook walks you through
          the toughest challenge: embracing who you are and owning your narrative. Grab a cuppa and let's get started. 🙌🏽
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => onNavigate('stage1')}>
            Start Stage 1 →
          </button>
          <a
            href="https://www.generalist.world/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Visit Generalist World ↗
          </a>
        </div>
      </div>

      <div style={{ padding: '0 32px 16px 32px', maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Your journey
          </span>
        </div>
      </div>

      <div className="home-cards">
        {stages.map(s => (
          <button
            key={s.id}
            className={`home-stage-card ${completed.includes(s.id) ? 'completed' : ''}`}
            onClick={() => onNavigate(s.id)}
          >
            <span className="home-card-emoji">{s.emoji}</span>
            <span className="home-card-title">{s.title}</span>
            {s.time && <span className="home-card-time">⏱ {s.time}</span>}
            <span style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.4' }}>{s.desc}</span>
            {completed.includes(s.id) && (
              <span className="home-card-check">✓ Complete</span>
            )}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '0 32px 48px', color: 'var(--gray-400)', fontSize: '13px' }}>
        Made with ❤️ by{' '}
        <a href="https://www.generalist.world/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--purple-600)' }}>
          Generalist World
        </a>
      </div>
    </div>
  );
}
