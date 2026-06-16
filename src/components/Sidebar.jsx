import Icon from './Icon';

const navItems = [
  { id: 'home',   icon: 'home',               title: 'Home',                     stage: null },
  { id: 'stage1', icon: 'bolt',               title: 'Strengths & Superpowers',  stage: 'Stage 1' },
  { id: 'stage2', icon: 'psychology',         title: 'Your Generalist Archetype', stage: 'Stage 2' },
  { id: 'stage3', icon: 'edit_note',          title: 'Craft Your Narrative',     stage: 'Stage 3' },
  { id: 'stage4', icon: 'palette',            title: 'Build Your Portfolio',     stage: 'Stage 4' },
  { id: 'stage5', icon: 'view_list',          title: 'Putting It All Together',  stage: 'Stage 5' },
  { id: 'stage6', icon: 'record_voice_over',  title: 'Nail Your Narrative',      stage: 'Stage 6' },
  { id: 'gallery',icon: 'grid_view',          title: 'Profile Gallery',          stage: null },
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
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${current === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} className="nav-item-icon" />
            <span className="nav-item-text">
              {item.stage && <span className="nav-item-stage">{item.stage}</span>}
              <span className="nav-item-title">{item.title}</span>
            </span>
            {completed.includes(item.id) && (
              <Icon name="check_circle" className="nav-item-check" />
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
