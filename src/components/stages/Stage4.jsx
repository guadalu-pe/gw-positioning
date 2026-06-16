import { useState, useEffect } from 'react';

const sections = [
  {
    num: 1,
    title: 'Your Headline',
    tip: 'This is your headline. Give a snapshot of who you are so people can decide whether to read on. Show the core elements of your journey and what you want to be known for.',
    fields: [
      { key: 'roles', label: 'Your 3 key roles or identities (e.g. "Linguist · Data Analyst · Catalyst")', placeholder: 'Role 1 · Role 2 · Role 3', type: 'text' },
      { key: 'mission', label: 'Your mission statement (I\'m a [X] who\'s on a mission to [Y])', placeholder: "I'm a [X] who's on a mission to [Y]...", type: 'textarea' },
      { key: 'belief', label: 'What you believe in (I believe in [X] as a catalyst for [Y])', placeholder: 'I believe in [X] as a catalyst for [Y]...', type: 'textarea' },
    ],
  },
  {
    num: 2,
    title: 'Your Professional Values',
    tip: 'Share 2–3 values that define how you approach your work. You can use a quote + brief explanation format.',
    fields: [
      { key: 'value1', label: 'Value 1 — Name + short explanation', placeholder: 'e.g. Curiosity — I\'m driven by...', type: 'textarea' },
      { key: 'value2', label: 'Value 2 — Name + short explanation', placeholder: 'e.g. Transparency — I believe in...', type: 'textarea' },
      { key: 'value3', label: 'Value 3 — Name + short explanation', placeholder: 'e.g. Connection — I thrive when...', type: 'textarea' },
    ],
  },
  {
    num: 3,
    title: 'Your Content or Work',
    tip: 'For writers: showcase your latest articles or projects. For visual thinkers: use this space for design or video work.',
    fields: [
      { key: 'content', label: 'Describe your latest work, content, or projects (3–5 examples)', placeholder: 'Article: "Why generalists will lead the future of work" — Medium, 2024\nProject: Led cross-functional product launch at...', type: 'textarea' },
    ],
  },
  {
    num: 4,
    title: 'How You Spend Your Time',
    tip: 'Share how you spend your time professionally (and optionally personally) so people who want to work with you know what to expect.',
    fields: [
      { key: 'howIWork', label: 'How I spend my professional time', placeholder: 'e.g. 40% strategy consulting, 30% community building, 20% writing, 10% advising...', type: 'textarea' },
      { key: 'passions', label: 'Personal passions or interests (optional)', placeholder: 'e.g. Obsessed with long-distance running, trying to learn Portuguese...', type: 'textarea' },
    ],
  },
  {
    num: 5,
    title: 'How to Reach You',
    tip: 'Always have a section for people to get in touch. A Calendly link, email or contact form works great.',
    fields: [
      { key: 'contact', label: 'Your contact info / how to reach you', placeholder: 'Email: hello@yourname.com\nLinkedIn: linkedin.com/in/yourname\nCalendly: calendly.com/yourname', type: 'textarea' },
    ],
  },
  {
    num: 6,
    title: 'Your CTA',
    tip: 'What\'s the ONE place you want to direct people? Newsletter? Portfolio? Book a call?',
    fields: [
      { key: 'cta', label: 'Your main call to action', placeholder: 'e.g. Sign up for my weekly newsletter on...', type: 'textarea' },
    ],
  },
];

const tools = [
  { name: 'Notion', url: 'https://notion.so', desc: 'Free portfolio template — fast to get up and running' },
  { name: 'Carrd', url: 'https://carrd.co', desc: 'Simple one-page sites, very clean' },
  { name: 'Framer', url: 'https://framer.com', desc: 'Beautiful design, great for visual types' },
  { name: 'Squarespace', url: 'https://squarespace.com', desc: 'Polished templates, easy to customize' },
  { name: 'Read.cv', url: 'https://read.cv', desc: 'Built for professionals, minimal and elegant' },
];

export default function Stage4({ data, onUpdate, onComplete, isCompleted }) {
  const [fields, setFields] = useState(data.portfolio || {});

  useEffect(() => {
    onUpdate({ portfolio: fields });
  }, [fields]);

  function update(key, value) {
    setFields(prev => ({ ...prev, [key]: value }));
  }

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-badge">🎨 Stage 4</div>
        <h1 className="stage-title">Creating Your Generalist Portfolio</h1>
        <div className="stage-meta">
          <span className="stage-time">⏰ Est. 1–2 hours</span>
          <span style={{ fontSize: '13px', color: 'var(--gray-400)' }}>🟣 🟣 🟣 🟣 ⚪ ⚪</span>
        </div>
      </div>

      <div className="stage-intro">
        We don't live in a world of bland CVs anymore. Every generalist should have a digital personal portfolio that does a great job of <em>showing, not telling</em>, your narrative.
      </div>

      <div className="outcomes-box">
        <h4>By the end of this stage, you'll have:</h4>
        <ul>
          <li>Built your very own personal portfolio, ready to show the world</li>
        </ul>
      </div>

      <div className="callout action" style={{ marginBottom: '24px' }}>
        <span className="callout-icon">🪄</span>
        <div className="callout-content">
          <h4>Action</h4>
          <p>Draft your portfolio content below, then transfer it to your website tool of choice. Work through each section and replace the template content with your own.</p>
        </div>
      </div>

      {sections.map(section => (
        <div key={section.num} className="card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ background: 'var(--purple-700)', color: 'white', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>
              {section.num}
            </span>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--gray-900)' }}>Section {section.num}: {section.title}</h3>
          </div>
          <div className="callout tip" style={{ marginBottom: '16px' }}>
            <span className="callout-icon">💜</span>
            <div className="callout-content">
              <p>{section.tip}</p>
            </div>
          </div>
          {section.fields.map(f => (
            <div key={f.key} className="field-group">
              <label className="field-label">{f.label}</label>
              {f.type === 'text' ? (
                <input type="text" placeholder={f.placeholder} value={fields[f.key] || ''} onChange={e => update(f.key, e.target.value)} />
              ) : (
                <textarea rows={3} placeholder={f.placeholder} value={fields[f.key] || ''} onChange={e => update(f.key, e.target.value)} />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Tools */}
      <div className="section-header" style={{ marginTop: '32px' }}>
        <span className="step-badge">Tools</span>
        <h2>Recommended Portfolio Tools</h2>
      </div>

      <div style={{ display: 'grid', gap: '10px', marginBottom: '24px' }}>
        {tools.map(t => (
          <a
            key={t.name}
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', border: '1px solid var(--gray-200)', borderRadius: '10px', padding: '14px 16px', textDecoration: 'none', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple-300)'; e.currentTarget.style.background = 'var(--purple-50)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'white'; }}
          >
            <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--purple-700)', minWidth: '90px' }}>💜 {t.name}</span>
            <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{t.desc}</span>
            <span style={{ marginLeft: 'auto', color: 'var(--purple-500)', fontSize: '14px' }}>↗</span>
          </a>
        ))}
      </div>

      <div className="callout tip">
        <span className="callout-icon">🪄</span>
        <div className="callout-content">
          <h4>Next step</h4>
          <p>Once you're happy with your draft content above, transfer it into your chosen tool and publish. Then share it in the <strong>#heckyeah</strong> channel in the Generalist World community to get feedback!</p>
        </div>
      </div>

      <div className="stage-complete-row">
        <button
          className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`}
          onClick={onComplete}
        >
          {isCompleted ? '✓ Stage Complete!' : 'Mark Stage Complete →'}
        </button>
      </div>
    </div>
  );
}
