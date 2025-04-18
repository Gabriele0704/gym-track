require('dotenv').config();
const express     = require('express');
const cors        = require('cors');
const { sequelize } = require('./models');
const logsRouter  = require('./routes/logs');
const app = express();
const plansRouter = require('./routes/plans');

app.use(cors());
app.use(express.json());
app.use('/api/logs', logsRouter);
app.use('/api/plans', plansRouter);

const PORT = process.env.PORT || 3001;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
  });
});