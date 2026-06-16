import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Stage1 from './components/stages/Stage1';
import Stage2 from './components/stages/Stage2';
import Stage3 from './components/stages/Stage3';
import Stage4 from './components/stages/Stage4';
import Stage5 from './components/stages/Stage5';
import Stage6 from './components/stages/Stage6';
import ProfileGallery from './components/ProfileGallery';

const STORAGE_KEY = 'gw-guidebook-v1';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export default function App() {
  const [current, setCurrent] = useState('home');
  const [userData, setUserData] = useState(loadData);
  const [toast, setToast] = useState('');

  useEffect(() => {
    saveData(userData);
  }, [userData]);

  function updateStageData(stage, data) {
    setUserData(prev => ({ ...prev, [stage]: { ...(prev[stage] || {}), ...data } }));
  }

  const completed = userData.completed || [];

  function markComplete(stageId) {
    if (completed.includes(stageId)) return;
    const next = [...completed, stageId];
    setUserData(prev => ({ ...prev, completed: next }));
    showToast('Stage complete! 🎉');
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  const stageProps = {
    onNavigate: setCurrent,
    onComplete: (id) => () => markComplete(id),
  };

  return (
    <>
      <Sidebar
        current={current}
        onNavigate={setCurrent}
        completed={completed}
      />

      <main className="main-content">
        {current === 'home' && (
          <Home onNavigate={setCurrent} completed={completed} />
        )}

        {current === 'stage1' && (
          <Stage1
            data={userData.stage1 || {}}
            onUpdate={data => updateStageData('stage1', data)}
            onComplete={() => markComplete('stage1')}
            isCompleted={completed.includes('stage1')}
          />
        )}

        {current === 'stage2' && (
          <Stage2
            data={userData.stage2 || {}}
            onUpdate={data => updateStageData('stage2', data)}
            onComplete={() => markComplete('stage2')}
            isCompleted={completed.includes('stage2')}
          />
        )}

        {current === 'stage3' && (
          <Stage3
            data={userData.stage3 || {}}
            onUpdate={data => updateStageData('stage3', data)}
            onComplete={() => markComplete('stage3')}
            isCompleted={completed.includes('stage3')}
          />
        )}

        {current === 'stage4' && (
          <Stage4
            data={userData.stage4 || {}}
            onUpdate={data => updateStageData('stage4', data)}
            onComplete={() => markComplete('stage4')}
            isCompleted={completed.includes('stage4')}
          />
        )}

        {current === 'stage5' && (
          <Stage5
            allData={userData}
            onNavigate={setCurrent}
            onComplete={() => markComplete('stage5')}
            isCompleted={completed.includes('stage5')}
          />
        )}

        {current === 'stage6' && (
          <Stage6
            data={userData.stage6 || {}}
            onUpdate={data => updateStageData('stage6', data)}
            onComplete={() => markComplete('stage6')}
            isCompleted={completed.includes('stage6')}
          />
        )}

        {current === 'gallery' && (
          <ProfileGallery />
        )}
      </main>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
