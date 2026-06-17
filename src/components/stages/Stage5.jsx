import Icon from '../Icon';
import StepBreadcrumb, { StepNav } from '../StepBreadcrumb';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PositioningPDF from '../PositioningPDF';

const STEPS = ['Your Summary'];

export default function Stage5({ allData, user, onComplete, isCompleted, onNavigate }) {
  const s1 = allData.stage1 || {};
  const s2 = allData.stage2 || {};
  const s3 = allData.stage3 || {};
  const s4 = allData.stage4 || {};

  const archetype = s2.archetypeResult;
  const framework = s3.framework || {};
  const portfolio = s4.portfolio || {};

  const energisers = Object.entries(s1.skills || {})
    .filter(([, v]) => v.wantToDo === 'More' && (v.skillLevel === 'High' || v.skillLevel === 'Medium'))
    .map(([name]) => name);

  const summaryItems = [
    {
      label: 'Your Generalist Archetype',
      value: archetype ? archetype.name : null,
      nav: 'stage2',
    },
    {
      label: 'Your Top Energiser Skills',
      value: energisers.length ? energisers.join(' · ') : null,
      nav: 'stage1',
    },
    {
      label: 'Your Name (Who you are)',
      value: framework.name,
      nav: 'stage3',
    },
    {
      label: 'Your Same (Analogy)',
      value: framework.same,
      nav: 'stage3',
    },
    {
      label: 'Your Fame (Key achievements)',
      value: framework.fame,
      nav: 'stage3',
    },
    {
      label: 'Your Aim (Current focus)',
      value: framework.aim,
      nav: 'stage3',
    },
    {
      label: 'Your Game (Long-term vision)',
      value: framework.game,
      nav: 'stage3',
    },
    {
      label: 'Your One-Liner',
      value: s3.oneLiner,
      nav: 'stage3',
    },
    {
      label: 'AI-Generated Tagline',
      value: s3.aiResult,
      nav: 'stage3',
    },
    {
      label: 'Your Headline / Roles',
      value: portfolio.roles,
      nav: 'stage4',
    },
    {
      label: 'Your Mission Statement',
      value: portfolio.mission,
      nav: 'stage4',
    },
    {
      label: 'Your Contact / CTA',
      value: portfolio.contact,
      nav: 'stage4',
    },
  ];

  const filledItems = summaryItems.filter(i => i.value);
  const completionPct = Math.round((filledItems.length / summaryItems.length) * 100);

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-badge">
          <Icon name="view_list" size="13px" />
          Stage 5
        </div>
        <h1 className="stage-title">Putting It All Together</h1>
        <div className="stage-meta">
          <span className="stage-time">
            <Icon name="schedule" size="15px" />
            Est. 30 minutes
          </span>
        </div>
      </div>

      <StepBreadcrumb steps={STEPS} current={0} onNavigate={() => {}} />

      <div className="stage-intro">
        Welcome to the fun part! This is where everything comes together. Review everything you've built across all stages — this is your complete positioning snapshot.
      </div>

      <div className="outcomes-box">
        <h4>By the end of this stage, you'll have:</h4>
        <ul>
          <li>All your positioning assets in one place</li>
          <li>A clear sense of what's done and what needs attention</li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontWeight: '700', fontSize: '15px' }}>Your Positioning Snapshot</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{filledItems.length}/{summaryItems.length} filled</span>
            <PDFDownloadLink
              document={<PositioningPDF allData={allData} user={user} />}
              fileName="gw-positioning-snapshot.pdf"
              style={{ textDecoration: 'none' }}
            >
              {({ loading }) => (
                <button className="btn btn-primary btn-sm">
                  <Icon name={loading ? 'hourglass_empty' : 'download'} size="14px" />
                  {loading ? 'Preparing PDF…' : 'Export PDF'}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
        <div style={{ background: 'var(--gray-100)', borderRadius: '99px', height: '8px', overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{ width: `${completionPct}%`, background: 'linear-gradient(to right, var(--purple-500), var(--purple-700))', height: '100%', borderRadius: '99px', transition: 'width 0.4s ease' }} />
        </div>
        <p style={{ fontSize: '13px', color: 'var(--gray-500)' }}>
          {completionPct < 30 ? "You're just getting started — head back to the earlier stages to fill in your story." :
           completionPct < 70 ? "Good progress! Keep going to complete your full positioning." :
           "Almost there! Check what's missing and complete the picture."}
        </p>
      </div>

      <div className="summary-grid">
        {summaryItems.map(item => (
          <div key={item.label} className="summary-item">
            <div className="summary-item-label">{item.label}</div>
            {item.value ? (
              <div className="summary-item-value">{item.value}</div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="summary-item-value empty">Not filled in yet</span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => onNavigate(item.nav)}
                  style={{ flexShrink: 0 }}
                >
                  Fill in <Icon name="arrow_forward" size="14px" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {archetype && (
        <div className="callout tip" style={{ marginBottom: '24px' }}>
          <Icon name={archetype.icon} className="callout-icon" style={{ color: 'var(--gw-purple)' }} />
          <div className="callout-content">
            <h4>Your archetype: {archetype.name}</h4>
            <p>{archetype.tagline}</p>
          </div>
        </div>
      )}

      {s3.oneLiner && (
        <div style={{ background: 'linear-gradient(135deg, var(--purple-50), #eff6ff)', border: '1px solid var(--purple-200)', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Your One-Liner</div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--purple-800)', lineHeight: '1.5' }}>"{s3.oneLiner}"</div>
          <button
            className="btn btn-ghost btn-sm"
            style={{ marginTop: '12px' }}
            onClick={() => navigator.clipboard.writeText(s3.oneLiner)}
          >
            <Icon name="content_copy" size="14px" /> Copy
          </button>
        </div>
      )}

      <StepNav current={0} total={1} onBack={() => {}} onNext={() => {}} onComplete={onComplete} isCompleted={isCompleted} />
    </div>
  );
}
