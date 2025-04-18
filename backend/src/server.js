require('dotenv').config(); 

const express     = require('express');
const cors        = require('cors');
const { sequelize } = require('./models');
const logsRouter  = require('./routes/logs');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Gym Tracker API è viva e vegeta! 🚀');
  });
  
app.use('/api/logs', logsRouter);

const PORT = process.env.PORT || 3001;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
  });
});
