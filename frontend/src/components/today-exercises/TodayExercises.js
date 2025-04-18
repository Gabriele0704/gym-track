import { useState, useEffect } from 'react';

export default function TodayExercises({ planId }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (!planId) return;
    const day = new Date().getDay(); // 0=Dom…6=Sab
    fetch(`/api/plans/${planId}/exercises?day=${day}`)
      .then(r => r.json())
      .then(setList);
  }, [planId]);

  if (!planId) return <p>Nessun piano selezionato</p>;
  if (!list.length) return <p>Oggi nessun esercizio programmato</p>;
  return (
    <ul>
      {list.map((e,i) =>
        <li key={i}>
          {e.exercise}: {e.sets}×{e.reps} @ {e.weight}kg
        </li>
      )}
    </ul>
  );
}
