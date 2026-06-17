import Icon from './Icon';

export default function Celebration({ allData, user, onNavigate }) {
  const s2 = allData.stage2 || {};
  const s3 = allData.stage3 || {};
  const archetype = s2.archetypeResult;

  return (
    <div className="celebration-page">
      <div className="celebration-confetti">
        {[...Array(9)].map((_, i) => <span key={i} className="confetti-dot" />)}
      </div>

      <div className="celebration-badge">All stages complete</div>

      <h1 className="celebration-title">
        You've done it.<br />Your positioning is ready.
      </h1>

      <p className="celebration-subtitle">
        You've worked through all six stages and built a complete, authentic generalist positioning.
        {user?.displayName ? ` Well done, ${user.displayName.split(' ')[0]}.` : ' Well done.'}
      </p>

      {s3.oneLiner && (
        <div className="celebration-oneliner">
          "{s3.oneLiner}"
        </div>
      )}

      {archetype && (
        <div className="celebration-archetype">
          <Icon name={archetype.icon} size="16px" />
          {archetype.name}
        </div>
      )}

      <div className="celebration-actions">
        <button className="btn btn-primary" onClick={() => onNavigate('stage5')}>
          <Icon name="view_list" size="16px" /> View Full Summary
        </button>
        <button className="btn btn-secondary" onClick={() => onNavigate('home')}>
          <Icon name="home" size="16px" /> Back to Home
        </button>
      </div>
    </div>
  );
}
