import { useState, useEffect } from 'react';
import Icon from '../Icon';

const frameworkItems = [
  {
    letter: 'N',
    word: 'Name',
    action: 'Clearly introduce yourself and your professional identity.',
    purpose: 'Create a memorable first impression.',
    example: '"I\'m Alex, a multidisciplinary problem solver specializing in cross-sector innovation."',
    placeholder: 'I\'m [your name], a [how you describe yourself]...',
    key: 'name',
  },
  {
    letter: 'S',
    word: 'Same',
    action: 'Compare your approach or skillset to something familiar.',
    purpose: 'Quickly communicate your unique value proposition.',
    example: '"I\'m like a Swiss Army knife for organizations needing adaptive talent."',
    placeholder: 'I\'m like a [analogy] for [who you help]...',
    key: 'same',
  },
  {
    letter: 'F',
    word: 'Fame',
    action: 'Highlight your distinctive skills, achievements, or unique perspective.',
    purpose: 'Establish credibility and differentiation.',
    example: '"I\'ve successfully bridged challenges across tech, healthcare, and nonprofit sectors."',
    placeholder: 'I\'ve [your key achievements or experiences]...',
    key: 'fame',
  },
  {
    letter: 'A',
    word: 'Aim',
    action: 'Share your current professional focus or short-term objectives.',
    purpose: 'Demonstrate intentionality and forward momentum.',
    example: '"My aim is to develop innovative solutions connecting emerging tech with social impact."',
    placeholder: 'My current focus is [your aim]...',
    key: 'aim',
  },
  {
    letter: 'G',
    word: 'Game',
    action: 'Articulate your broader career vision or long-term aspiration.',
    purpose: 'Inspire interest and show strategic thinking.',
    example: '"My ultimate goal is to become a catalyst for interdisciplinary collaboration."',
    placeholder: 'My bigger vision is [your game]...',
    key: 'game',
  },
];

async function generateTaglineViaAPI(apiKey, prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.content[0]?.text || '';
}

function buildPrompt(framework, oneLiner) {
  const parts = frameworkItems.map(f => framework[f.key] ? `${f.word}: ${framework[f.key]}` : null).filter(Boolean);
  return `You are a positioning coach helping a professional generalist craft their personal tagline and bio.

Here is their framework:
${parts.join('\n') || '(Not filled in yet)'}
${oneLiner ? `\nOne-liner draft: ${oneLiner}` : ''}

Please generate:
1. A punchy, memorable one-liner tagline (max 20 words) that captures their unique value
2. A short professional bio (3-4 sentences) for use on LinkedIn or a website
3. A 2-line bio for speaking engagements or introductions

Make it authentic, confident, and generalist-positive. Avoid generic corporate language.`;
}

export default function Stage3({ data, onUpdate, onComplete, isCompleted }) {
  const [framework, setFramework] = useState(data.framework || {});
  const [oneLiner, setOneLiner] = useState(data.oneLiner || '');
  const [audience, setAudience] = useState(data.audience || '');
  const [outcome, setOutcome] = useState(data.outcome || '');
  const [approach, setApproach] = useState(data.approach || '');
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [aiResult, setAiResult] = useState(data.aiResult || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showCopyPrompt, setShowCopyPrompt] = useState(false);

  useEffect(() => {
    onUpdate({ framework, oneLiner, audience, outcome, approach, aiResult });
  }, [framework, oneLiner, audience, outcome, approach, aiResult]);

  function updateFramework(key, value) {
    setFramework(prev => ({ ...prev, [key]: value }));
  }

  async function handleGenerate() {
    const prompt = buildPrompt(framework, oneLiner);
    setError('');
    setLoading(true);
    try {
      const result = await generateTaglineViaAPI(apiKey, prompt);
      setAiResult(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function copyPrompt() {
    const prompt = buildPrompt(framework, oneLiner);
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const prompt = buildPrompt(framework, oneLiner);

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-badge">
          <Icon name="edit_note" size="13px" />
          Stage 3
        </div>
        <h1 className="stage-title">Crafting Your Generalist Narrative</h1>
        <div className="stage-meta">
          <span className="stage-time">
            <Icon name="schedule" size="15px" />
            Est. 2–4 hours
          </span>
        </div>
      </div>

      <div className="stage-intro">
        Now you've mastered your strengths and discovered your generalist archetype, it's time to craft your narrative. You're often being evaluated against specialists — emphasising your interdisciplinary sauce is of the utmost importance.
      </div>

      <div className="outcomes-box">
        <h4>By the end of this stage, you'll have:</h4>
        <ul>
          <li>Honed your generalist narrative using the Name, Same, Fame, Aim, Game framework</li>
          <li>Crafted your one-liner</li>
          <li>Generated your AI-powered tagline</li>
        </ul>
      </div>

      <div className="section-header">
        <span className="step-badge">Step 1</span>
        <h2>Name, Same, Fame, Aim, Game</h2>
      </div>

      <div className="callout action">
        <Icon name="auto_fix_high" className="callout-icon" />
        <div className="callout-content">
          <h4>Action</h4>
          <p>Work through the framework below to create your high-level narrative. Fill in each section — your answers will be used to generate your AI tagline.</p>
        </div>
      </div>

      {frameworkItems.map(item => (
        <div key={item.key} className="framework-item">
          <div className="framework-item-header">
            <span className="framework-letter">{item.letter}</span>
            <div>
              <div className="framework-item-title">{item.word}</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{item.action} <em>{item.purpose}</em></div>
            </div>
          </div>
          <div className="framework-item-body">
            <div className="framework-example">e.g. {item.example}</div>
            <textarea
              rows={3}
              placeholder={item.placeholder}
              value={framework[item.key] || ''}
              onChange={e => updateFramework(item.key, e.target.value)}
            />
          </div>
        </div>
      ))}

      <div className="section-header">
        <span className="step-badge">Step 2</span>
        <h2>Craft Your One-Liner</h2>
      </div>

      <div className="callout tip">
        <Icon name="bolt" className="callout-icon" />
        <div className="callout-content">
          <p>A great one-liner is like the hook of a story. It grabs attention, piques curiosity, and makes people want to know more. Use the formula: <strong>"I help [target audience] achieve [specific outcomes] by [unique approach]."</strong></p>
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">1. Who is your target audience?</label>
        <p className="field-description">Who do you help? What are their key characteristics? Where do they hang out?</p>
        <textarea rows={2} placeholder="e.g. Early-stage startup founders who are building cross-functional teams..." value={audience} onChange={e => setAudience(e.target.value)} />
      </div>

      <div className="field-group">
        <label className="field-label">2. What specific outcomes do you help them achieve?</label>
        <p className="field-description">What do you help them achieve? What is your unique proposition?</p>
        <textarea rows={2} placeholder="e.g. Scale their operations without losing their culture or vision..." value={outcome} onChange={e => setOutcome(e.target.value)} />
      </div>

      <div className="field-group">
        <label className="field-label">3. What is your unique approach?</label>
        <p className="field-description">How do you help them achieve these outcomes?</p>
        <textarea rows={2} placeholder="e.g. By combining strategic thinking, cross-functional leadership and creative problem-solving..." value={approach} onChange={e => setApproach(e.target.value)} />
      </div>

      <div className="field-group">
        <label className="field-label">4. Your one-liner (bring it all together)</label>
        <div style={{ background: 'var(--purple-50)', border: '1px solid var(--purple-200)', borderRadius: '8px', padding: '12px', marginBottom: '10px', fontSize: '13px', color: 'var(--purple-700)', fontStyle: 'italic' }}>
          Template: "I help [target audience] achieve [specific outcomes] by [unique approach]."
        </div>
        <textarea
          rows={3}
          placeholder="I help ..."
          value={oneLiner}
          onChange={e => setOneLiner(e.target.value)}
        />
      </div>

      <div className="section-header">
        <span className="step-badge">Step 3</span>
        <h2>Generate Your AI Tagline</h2>
      </div>

      <div className="ai-box">
        <div className="ai-box-header">
          <Icon name="auto_awesome" size="28px" style={{ color: 'var(--gw-purple)', flexShrink: 0 }} />
          <div>
            <div className="ai-box-title">AI-Powered Tagline Generator</div>
            <div className="ai-box-subtitle">Uses your framework answers to craft a personalised tagline and bio</div>
          </div>
        </div>

        <div className="callout info" style={{ marginBottom: '16px' }}>
          <Icon name="info" className="callout-icon" />
          <div className="callout-content">
            <p>Option A: Enter your Anthropic API key below for instant generation. Your key is only used in your browser and never stored on any server.</p>
            <p style={{ marginTop: '4px' }}>Option B: Copy the prompt and paste it into <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--purple-600)' }}>claude.ai</a> or any AI tool.</p>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label className="field-label">Anthropic API Key (optional)</label>
          <div className="ai-key-row">
            <input
              type={showKey ? 'text' : 'password'}
              placeholder="sk-ant-..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
            <button className="btn btn-secondary btn-sm" onClick={() => setShowKey(v => !v)}>
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={!apiKey || loading}
          >
            <Icon name={loading ? 'hourglass_empty' : 'auto_awesome'} size="16px" />
            {loading ? 'Generating...' : 'Generate with AI'}
          </button>
          <button className="btn btn-secondary" onClick={() => setShowCopyPrompt(v => !v)}>
            <Icon name="content_copy" size="16px" />
            {showCopyPrompt ? 'Hide Prompt' : 'View / Copy Prompt'}
          </button>
          {showCopyPrompt && (
            <button className="btn btn-secondary btn-sm" onClick={copyPrompt}>
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          )}
        </div>

        {showCopyPrompt && (
          <div className="ai-copy-prompt-box" style={{ marginTop: '12px' }}>
            {prompt}
          </div>
        )}

        {error && (
          <div style={{ marginTop: '12px', padding: '10px 14px', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#7f1d1d', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <Icon name="warning" size="16px" style={{ flexShrink: 0, marginTop: '1px' }} />
            {error}
          </div>
        )}

        {aiResult && (
          <div className="ai-result">
            <div className="ai-result-label">AI-Generated Tagline &amp; Bio</div>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: 'var(--gray-800)' }}>
              {aiResult}
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { navigator.clipboard.writeText(aiResult); }}
              >
                <Icon name="content_copy" size="14px" /> Copy Result
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => { setAiResult(''); onUpdate({ ...data, aiResult: '' }); }}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="stage-complete-row">
        <button className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`} onClick={onComplete}>
          {isCompleted ? (
            <><Icon name="check_circle" size="17px" /> Stage Complete</>
          ) : (
            <>Mark Stage Complete <Icon name="arrow_forward" size="17px" /></>
          )}
        </button>
      </div>
    </div>
  );
}
