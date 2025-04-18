const express = require('express');
const router  = express.Router();
const Log     = require('../models/log');

// GET tutti i log
router.get('/', async (req, res) => {
  const logs = await Log.findAll();
  res.json(logs);
});

// POST un nuovo log
router.post('/', async (req, res) => {
  const { date, exercise, sets, reps } = req.body;
  const newLog = await Log.create({ date, exercise, sets, reps });
  res.status(201).json(newLog);
});

module.exports = router;
