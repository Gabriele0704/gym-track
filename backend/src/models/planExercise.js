// models/planExercise.js
const { DataTypes } = require('sequelize');
const { sequelize }  = require('./index');

const PlanExercise = sequelize.define('PlanExercise', {
  dayOfWeek: { type: DataTypes.INTEGER, allowNull: false },
  sets:      { type: DataTypes.INTEGER, allowNull: true },
  reps:      { type: DataTypes.INTEGER, allowNull: true },
  weight:    { type: DataTypes.INTEGER, allowNull: true },
});

// Collegamenti
WorkoutPlan.hasMany(PlanExercise, { foreignKey: 'workoutPlanId' });
PlanExercise.belongsTo(WorkoutPlan, { foreignKey: 'workoutPlanId' });
Exercise.hasMany(PlanExercise, { foreignKey: 'exerciseId' });
PlanExercise.belongsTo(Exercise, { foreignKey: 'exerciseId' });
