import Icon from './Icon';

export default function StepBreadcrumb({ steps, current, onNavigate }) {
  return (
    <div className="step-breadcrumb">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="step-bc-item">
            <button
              className={`step-bc-dot ${done ? 'done' : ''} ${active ? 'active' : ''}`}
              onClick={() => done && onNavigate(i)}
              disabled={!done}
              aria-label={`Step ${i + 1}: ${label}`}
            >
              {done ? <Icon name="check" size="12px" /> : i + 1}
            </button>
            <span className={`step-bc-label ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className={`step-bc-line ${done ? 'done' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function StepNav({ current, total, onBack, onNext, onComplete, isCompleted }) {
  const isLast = current === total - 1;
  return (
    <div className="step-nav">
      {current > 0 && (
        <button className="btn btn-secondary" onClick={onBack}>
          <Icon name="arrow_back" size="17px" /> Back
        </button>
      )}
      <div style={{ flex: 1 }} />
      {isLast ? (
        <button className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`} onClick={onComplete}>
          {isCompleted
            ? <><Icon name="check_circle" size="17px" /> Stage Complete</>
            : <>Mark Stage Complete <Icon name="arrow_forward" size="17px" /></>}
        </button>
      ) : (
        <button className="btn btn-primary" onClick={onNext}>
          Next <Icon name="arrow_forward" size="17px" />
        </button>
      )}
    </div>
  );
}
