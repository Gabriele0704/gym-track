const { DataTypes } = require('sequelize');
const { sequelize }  = require('./index');

const WorkoutPlan = sequelize.define('WorkoutPlan', {
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = WorkoutPlan;
