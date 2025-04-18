const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Log = sequelize.define('Log', {
  date:     { type: DataTypes.DATEONLY, allowNull: false },
  exercise: { type: DataTypes.STRING,    allowNull: false },
  sets:     { type: DataTypes.INTEGER,   allowNull: false },
  reps:     { type: DataTypes.INTEGER,   allowNull: false },
  weight:   { type: DataTypes.INTEGER,   allowNull: false },
});

module.exports = Log;
