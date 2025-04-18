// frontend/src/components/LogForm.js
import { useState } from 'react';
import axios from 'axios';

export default function LogForm({ onNew }) {
  const [form, setForm] = useState({
    date:     '',
    exercise: '',
    sets:     '',
    reps:     ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // POST sul tuo backend
    const res = await axios.post('http://localhost:3001/api/logs', form);
    onNew(res.data);
    setForm({ date: '', exercise: '', sets: '', reps: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="exercise"
        placeholder="Esercizio"
        value={form.exercise}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="sets"
        placeholder="Sets"
        value={form.sets}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="reps"
        placeholder="Reps"
        value={form.reps}
        onChange={handleChange}
        required
      />
      <button type="submit">Aggiungi</button>
    </form>
  );
}
