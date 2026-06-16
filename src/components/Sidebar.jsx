const navItems = [
  { id: 'home', emoji: '🏠', title: 'Home', stage: null },
  { id: 'stage1', emoji: '⛳', title: 'Strengths & Superpowers', stage: 'Stage 1' },
  { id: 'stage2', emoji: '🌱', title: 'Your Generalist Archetype', stage: 'Stage 2' },
  { id: 'stage3', emoji: '💌', title: 'Craft Your Narrative', stage: 'Stage 3' },
  { id: 'stage4', emoji: '🎨', title: 'Build Your Portfolio', stage: 'Stage 4' },
  { id: 'stage5', emoji: '🎬', title: 'Putting It All Together', stage: 'Stage 5' },
  { id: 'stage6', emoji: '🖇️', title: 'Nail Your Narrative', stage: 'Stage 6' },
  { id: 'gallery', emoji: '🗃️', title: 'Profile Gallery', stage: null },
];

export default function Sidebar({ current, onNavigate, completed }) {
  const stages = navItems.filter(n => n.stage);
  const done = stages.filter(s => completed.includes(s.id)).length;
  const pct = Math.round((done / stages.length) * 100);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Generalist World</h1>
        <span>Positioning Guidebook</span>
      </div>

      <div className="sidebar-progress">
        <div className="progress-label">Progress</div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-count">{done} of {stages.length} stages complete</div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          const isStage = !!item.stage;
          const isDone = completed.includes(item.id);
          const showLabel = i === 0 || (i === 1) || (i === navItems.length - 1);

          return (
            <button
              key={item.id}
              className={`nav-item ${current === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-item-emoji">{item.emoji}</span>
              <span className="nav-item-text">
                {item.stage && (
                  <span className="nav-item-stage">{item.stage}</span>
                )}
                <span className="nav-item-title" style={{ display: 'block' }}>{item.title}</span>
              </span>
              {isDone && <span className="nav-item-check">✓</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
