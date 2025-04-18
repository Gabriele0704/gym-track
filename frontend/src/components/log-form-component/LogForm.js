import { useState, useEffect } from 'react';
import axios from 'axios';
import './LogForm.css';

export default function LogForm({ onNew }) {
  const [form, setForm] = useState({ date: '', exercise: '', sets: '', reps: '', weight: '' });
  const [previousLog, setPreviousLog] = useState(null);

  // Fetch the last log for the given exercise
  useEffect(() => {
    if (!form.exercise) {
      setPreviousLog(null);
      return;
    }
    const fetchPrev = async () => {
      try {
        const res = await axios.get(`/api/logs/last?exercise=${encodeURIComponent(form.exercise)}`);
        setPreviousLog(res.data || null);
      } catch (err) {
        console.error('Errore fetching previous log:', err);
        setPreviousLog(null);
      }
    };
    fetchPrev();
  }, [form.exercise]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Permetti solo cifre per i campi 'sets', 'reps' e 'weight'
    if ((name === 'sets' || name === 'reps' || name === 'weight') && !/^[0-9]*$/.test(value)) {
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/logs', form);
      onNew(res.data);
      setForm({ date: '', exercise: '', sets: '', reps: '', weight: '' });
      setPreviousLog(null);
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label">
        <span>Data</span>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        <span>Esercizio</span>
        <input
          type="text"
          name="exercise"
          placeholder="Esercizio"
          value={form.exercise}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        <span>Serie</span>
        <input
          type="text"
          name="sets"
          placeholder="Serie"
          value={form.sets}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        <span>Ripetizioni</span>
        <input
          type="text"
          name="reps"
          placeholder="Ripetizioni"
          value={form.reps}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        <span>Tonnellaggio</span>
        <input
          type="text"
          name="weight"
          placeholder="Tonnellaggio (kg)"
          value={form.weight}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>

      {previousLog && (
        <div className="previous-log">
          <p>
            Ultimo log per "{form.exercise}":<br />
            {previousLog.sets} serie x {previousLog.reps} ripetizioni x {previousLog.weight} kg il {previousLog.date}
          </p>
        </div>
      )}

      <button type="submit" className="form-button">
        Aggiungi
      </button>
    </form>
  );
}