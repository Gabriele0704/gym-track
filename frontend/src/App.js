import { useState, useEffect } from 'react';
import ImportPlan      from './components/import-plan/ImportPlan';
import LogForm         from './components/log-form-component/LogForm';
import LogList         from './components/log-form-component/LogList';
import TodayExercises  from './components/today-exercises/TodayExercises';

function App() {
  const [newLog, setNewLog] = useState(null);
  const [planId, setPlanId] = useState(() =>
    localStorage.getItem('activePlanId') || null
  );

  // Ogni volta che planId cambia, lo salviamo su localStorage
  useEffect(() => {
    if (planId) localStorage.setItem('activePlanId', planId);
  }, [planId]);

  // Callback chiamata da ImportPlan
  const handlePlanImport = (data) => {
    if (data && data.planId) {
      setPlanId(data.planId);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Gym Tracker</h1>

      {/* Import piano solo se non hai già un planId */}
      {!planId && <ImportPlan onImport={handlePlanImport} />}

      {/* Esercizi di oggi: mostra la lista se il piano è già importato */}
      {planId && (
        <>
          <h2>Esercizi di oggi</h2>
          <TodayExercises planId={planId} />
        </>
      )}

      {/* Form per inserire i log */}
      <LogForm onNew={setNewLog} />

      {/* Lista dei log */}
      <LogList newLog={newLog} />
    </div>
  );
}

export default App;