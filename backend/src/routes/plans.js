const express = require('express');
const fs      = require('fs');
const path    = require('path');
const multer  = require('multer');
const pdf     = require('pdf-parse');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post(
  '/import',
  upload.single('file'),
  async (req, res) => {                      // ← qui la async
    try {
      const pdfPath    = path.join(req.file.destination, req.file.filename);
      const dataBuffer = fs.readFileSync(pdfPath);
      const { text }   = await pdf(dataBuffer);

    // 2) Trova tutti i "day N"
    const dayHeaders = [...new Set(
      (text.match(/^day\s+\d+/gmi) || [])
        .map(h => h.trim().toLowerCase())
    )];

    // 3) Suddividi il testo per blocchi giornalieri
    const days = {};
    let currentDay = null;
    text.split(/\r?\n/).forEach(line => {
      const header = line.match(/^day\s+(\d+)/i);
      if (header) {
        currentDay = `day${header[1]}`;
        days[currentDay] = [];
      } else if (currentDay && line.trim()) {
        days[currentDay].push(line.trim());
      }
    });

    // 4) Risposta JSON con numero di giornate e contenuto grezzo
    res.json({
      numDays: dayHeaders.length,
      days,       // { day1: [...], day2: [...], ... }
    });

    // (Qui potresti anche popolare WorkoutPlan + PlanExercise)
  } catch (err) {
    console.error('Import error:', err);
    res.status(500).json({ error: 'Upload o parsing fallito' });
  }
});

// GET /api/plans/:planId/exercises?day=0‑6
router.get('/:planId/exercises', async (req, res) => {
  const { planId } = req.params;
  const day = parseInt(req.query.day, 10);
  const list = await PlanExercise.findAll({
    where: { workoutPlanId: planId, dayOfWeek: day },
    include: [Exercise]
  });
  res.json(list.map(pe => ({
    exercise: pe.Exercise.name,
    sets:     pe.sets,
    reps:     pe.reps,
    weight:   pe.weight
  })));
});


module.exports = router;
