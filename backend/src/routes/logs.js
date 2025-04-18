const express = require('express');
const router  = express.Router();
const Log     = require('../models/log');

// GET tutti i log
router.get('/', async (req, res) => {
  const logs = await Log.findAll();
  res.json(logs);
});

// GET ultimo log per esercizio
router.get('/last', async (req, res) => {
  const { exercise } = req.query;
  const last = await Log.findOne({
    where: { exercise },
    order: [['date', 'DESC']],
  });
  if (!last) return res.status(204).end();
  res.json(last);
});

// POST un nuovo log
router.post('/', async (req, res) => {
  const { date, exercise, sets, reps, weight } = req.body;
  const newLog = await Log.create({ date, exercise, sets, reps, weight });
  res.status(201).json(newLog);
});

module.exports = router;