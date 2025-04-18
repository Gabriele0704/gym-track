import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LogList({ newLog }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('/api/logs')
      .then(res => setLogs(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (newLog) setLogs(curr => [newLog, ...curr]);
  }, [newLog]);

  if (!logs.length) return <p>Nessun log presente.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {logs.map(l => (
        <li key={l.id} style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>
          {l.date} — {l.exercise}: {l.sets}×{l.reps} × {l.weight} kg
        </li>
      ))}
    </ul>
  );
}