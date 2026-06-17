import { useState, useEffect, useRef } from 'react';
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
import Celebration from './components/Celebration';
import Icon from './components/Icon';

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [current, setCurrent] = useState('home');
  const [userData, setUserData] = useState({});
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState('success');
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'
  const [emailSending, setEmailSending] = useState(false);
  const debounceTimer = useRef(null);
  const syncResetTimer = useRef(null);

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

  // Save to Firestore with 300ms debounce; optimistic local update is immediate
  function updateStageData(stage, data) {
    const next = { ...userData, [stage]: { ...(userData[stage] || {}), ...data } };
    setUserData(next);
    if (!user) return;

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      setSyncStatus('saving');
      try {
        await setDoc(doc(db, 'users', user.uid), next, { merge: true });
        setSyncStatus('saved');
        clearTimeout(syncResetTimer.current);
        syncResetTimer.current = setTimeout(() => setSyncStatus('idle'), 2000);
      } catch {
        setSyncStatus('error');
        showToast('Failed to save. Check your connection.', 'error');
      }
    }, 300);
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
      setCurrent('celebration');
    }
  }

  function showToast(msg, type = 'success') {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(''), 2500);
  }

  function handleEmailSummary() {
    setEmailSending(true);
    const subject = encodeURIComponent('Your Generalist World Positioning Summary');
    const body = encodeURIComponent(buildSummary(userData, user));
    window.open(`mailto:${user.email}?subject=${subject}&body=${body}`);
    showToast('Email draft opened!');
    setEmailSending(false);
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
        syncStatus={syncStatus}
      />

      <main className="main-content">
        {current === 'home' && <Home onNavigate={setCurrent} completed={completed} />}
        {current === 'stage1' && <Stage1 data={userData.stage1 || {}} onUpdate={d => updateStageData('stage1', d)} onComplete={() => markComplete('stage1')} isCompleted={completed.includes('stage1')} />}
        {current === 'stage2' && <Stage2 data={userData.stage2 || {}} onUpdate={d => updateStageData('stage2', d)} onComplete={() => markComplete('stage2')} isCompleted={completed.includes('stage2')} />}
        {current === 'stage3' && <Stage3 data={userData.stage3 || {}} onUpdate={d => updateStageData('stage3', d)} onComplete={() => markComplete('stage3')} isCompleted={completed.includes('stage3')} />}
        {current === 'stage4' && <Stage4 data={userData.stage4 || {}} onUpdate={d => updateStageData('stage4', d)} onComplete={() => markComplete('stage4')} isCompleted={completed.includes('stage4')} />}
        {current === 'stage5' && <Stage5 allData={userData} user={user} onNavigate={setCurrent} onComplete={() => markComplete('stage5')} isCompleted={completed.includes('stage5')} />}
        {current === 'stage6' && <Stage6 data={userData.stage6 || {}} onUpdate={d => updateStageData('stage6', d)} onComplete={() => markComplete('stage6')} isCompleted={completed.includes('stage6')} />}
        {current === 'gallery' && <ProfileGallery />}
        {current === 'celebration' && <Celebration allData={userData} user={user} onNavigate={setCurrent} />}
      </main>

      <div aria-live="polite" aria-atomic="true" className="toast-live-region">
        {toast && (
          <div className={`toast${toastType === 'error' ? ' toast-error' : ''}`}>
            <Icon name={toastType === 'error' ? 'warning' : 'check_circle'} size="16px" /> {toast}
          </div>
        )}
      </div>
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
