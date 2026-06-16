import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Stage1 from './components/stages/Stage1';
import Stage2 from './components/stages/Stage2';
import Stage3 from './components/stages/Stage3';
import Stage4 from './components/stages/Stage4';
import Stage5 from './components/stages/Stage5';
import Stage6 from './components/stages/Stage6';
import ProfileGallery from './components/ProfileGallery';
import Icon from './components/Icon';

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [current, setCurrent] = useState('home');
  const [userData, setUserData] = useState({});
  const [toast, setToast] = useState('');
  const [emailSending, setEmailSending] = useState(false);

  // Auth listener
  useEffect(() => {
    return onAuthStateChanged(auth, u => setUser(u ?? null));
  }, []);

  // Firestore sync — listen to user's doc
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    const unsub = onSnapshot(ref, snap => {
      if (snap.exists()) setUserData(snap.data());
    });
    return unsub;
  }, [user]);

  // Save to Firestore on change (debounced via useEffect)
  function updateStageData(stage, data) {
    const next = { ...userData, [stage]: { ...(userData[stage] || {}), ...data } };
    setUserData(next);
    if (user) {
      setDoc(doc(db, 'users', user.uid), next, { merge: true });
    }
  }

  const completed = userData.completed || [];

  const stageOrder = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6'];

  function markComplete(stageId) {
    if (!completed.includes(stageId)) {
      const next = [...completed, stageId];
      const nextData = { ...userData, completed: next };
      setUserData(nextData);
      if (user) setDoc(doc(db, 'users', user.uid), nextData, { merge: true });
    }
    const idx = stageOrder.indexOf(stageId);
    const nextStage = stageOrder[idx + 1];
    if (nextStage) {
      setCurrent(nextStage);
      showToast('Stage complete! On to the next one.');
    } else {
      setCurrent('stage5');
      showToast('All stages complete!');
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  async function handleEmailSummary() {
    setEmailSending(true);
    try {
      const summary = buildSummary(userData, user);
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': '', // placeholder — see note below
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1200,
          messages: [{ role: 'user', content: `Format the following positioning summary as a clean, readable plain-text email to send to ${user.email}. Start with a warm greeting, then present each section clearly:\n\n${summary}` }],
        }),
      });
      // Email via mailto fallback since we don't have a backend mailer
      const subject = encodeURIComponent('Your Generalist World Positioning Summary');
      const body = encodeURIComponent(summary);
      window.open(`mailto:${user.email}?subject=${subject}&body=${body}`);
      showToast('Email draft opened!');
    } catch {
      // fallback: open mailto directly
      const subject = encodeURIComponent('Your Generalist World Positioning Summary');
      const body = encodeURIComponent(buildSummary(userData, user));
      window.open(`mailto:${user.email}?subject=${subject}&body=${body}`);
      showToast('Email draft opened!');
    } finally {
      setEmailSending(false);
    }
  }

  // Loading state
  if (user === undefined) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gw-lavender-light)' }}>
        <div style={{ color: 'var(--gw-purple)', fontSize: '15px', fontFamily: 'var(--font-body)' }}>Loading…</div>
      </div>
    );
  }

  if (!user) return <Login />;

  return (
    <>
      <Sidebar
        current={current}
        onNavigate={setCurrent}
        completed={completed}
        user={user}
        onSignOut={() => signOut(auth)}
        onEmailSummary={handleEmailSummary}
        emailSending={emailSending}
      />

      <main className="main-content">
        {current === 'home' && <Home onNavigate={setCurrent} completed={completed} />}
        {current === 'stage1' && <Stage1 data={userData.stage1 || {}} onUpdate={d => updateStageData('stage1', d)} onComplete={() => markComplete('stage1')} isCompleted={completed.includes('stage1')} />}
        {current === 'stage2' && <Stage2 data={userData.stage2 || {}} onUpdate={d => updateStageData('stage2', d)} onComplete={() => markComplete('stage2')} isCompleted={completed.includes('stage2')} />}
        {current === 'stage3' && <Stage3 data={userData.stage3 || {}} onUpdate={d => updateStageData('stage3', d)} onComplete={() => markComplete('stage3')} isCompleted={completed.includes('stage3')} />}
        {current === 'stage4' && <Stage4 data={userData.stage4 || {}} onUpdate={d => updateStageData('stage4', d)} onComplete={() => markComplete('stage4')} isCompleted={completed.includes('stage4')} />}
        {current === 'stage5' && <Stage5 allData={userData} onNavigate={setCurrent} onComplete={() => markComplete('stage5')} isCompleted={completed.includes('stage5')} />}
        {current === 'stage6' && <Stage6 data={userData.stage6 || {}} onUpdate={d => updateStageData('stage6', d)} onComplete={() => markComplete('stage6')} isCompleted={completed.includes('stage6')} />}
        {current === 'gallery' && <ProfileGallery />}
      </main>

      {toast && <div className="toast"><Icon name="check_circle" size="16px" /> {toast}</div>}
    </>
  );
}

function buildSummary(data, user) {
  const s1 = data.stage1 || {};
  const s2 = data.stage2 || {};
  const s3 = data.stage3 || {};
  const s4 = data.stage4 || {};
  const s6 = data.stage6 || {};
  const arch = s2.archetypeResult;
  const fw = s3.framework || {};
  const portfolio = s4.portfolio || {};

  const energisers = Object.entries(s1.skills || {})
    .filter(([, v]) => v.wantToDo === 'More' && (typeof v.skillLevel === 'number' ? v.skillLevel >= 3 : v.skillLevel === 'High' || v.skillLevel === 'Medium'))
    .map(([name]) => name);

  const lines = [
    `GENERALIST WORLD POSITIONING SUMMARY`,
    `${user.displayName} — ${user.email}`,
    `Generated: ${new Date().toLocaleDateString()}`,
    '',
    `── STAGE 1: STRENGTHS ──`,
    energisers.length ? `Top Energiser Skills: ${energisers.join(', ')}` : '',
    s1.reflections?.play ? `What feels like play: ${s1.reflections.play}` : '',
    s1.reflections?.feedback ? `Strengths others see: ${s1.reflections.feedback}` : '',
    s1.reflections?.advice ? `What people ask for: ${s1.reflections.advice}` : '',
    '',
    `── STAGE 2: ARCHETYPE ──`,
    arch ? `Archetype: ${arch.name}` : '',
    arch ? `Tagline: ${arch.tagline}` : '',
    arch ? `Strengths: ${arch.strengths?.join(', ')}` : '',
    '',
    `── STAGE 3: NARRATIVE ──`,
    fw.name ? `Name: ${fw.name}` : '',
    fw.same ? `Same: ${fw.same}` : '',
    fw.fame ? `Fame: ${fw.fame}` : '',
    fw.aim ? `Aim: ${fw.aim}` : '',
    fw.game ? `Game: ${fw.game}` : '',
    s3.oneLiner ? `\nOne-Liner: "${s3.oneLiner}"` : '',
    s3.aiResult ? `\nAI Tagline:\n${s3.aiResult}` : '',
    '',
    `── STAGE 4: PORTFOLIO ──`,
    portfolio.roles ? `Roles: ${portfolio.roles}` : '',
    portfolio.mission ? `Mission: ${portfolio.mission}` : '',
    portfolio.belief ? `Belief: ${portfolio.belief}` : '',
    portfolio.contact ? `Contact: ${portfolio.contact}` : '',
    '',
    `── STAGE 6: INTERVIEW PREP ──`,
    ...(s6.starlStories || []).filter(s => s.title).map((s, i) => `Story ${i + 1}: ${s.title}`),
  ];

  return lines.filter(l => l !== '').join('\n');
}
