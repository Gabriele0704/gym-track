import { useState } from 'react';
import './ImportPlan.css';

export default function ImportPlan({ onImport }) {
  const [planInfo, setPlanInfo] = useState(null);
  const [error, setError]       = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/plans/import', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Upload fallito');
      const data = await res.json();
      setPlanInfo(data);
      setError(null);
      if (onImport) onImport(data);
    } catch (err) {
      console.error(err);
      setError('Errore durante l\'importazione del piano');
      setPlanInfo(null);
      if (onImport) onImport(null);
    }
  };

  return (
    <div className="import-plan-container">
      <h2>Importa Scheda Coach (PDF)</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {error && <p className="import-plan-summary">{error}</p>}
      {planInfo && (
        <div className="import-plan-summary">
          <p>Giornate trovate: {planInfo.numDays}</p>
          {Object.entries(planInfo.days).map(([day, lines]) => (
            <div key={day} className="import-plan-day">
              <h3>{day.toUpperCase()}</h3>
              <ul>
                {lines.map((line, idx) => <li key={idx}>{line}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}