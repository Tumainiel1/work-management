'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskAssignment extends Model {
    static associate(models) {
      // A TaskAssignment belongs to one User (many-to-1 relationship)
      TaskAssignment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      // A TaskAssignment belongs to one Task (many-to-1 relationship)
      TaskAssignment.belongsTo(models.Task, { foreignKey: 'taskId', as: 'task' });
    }
  }
  TaskAssignment.init(
    {
      userId: DataTypes.INTEGER,
      taskId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TaskAssignment',
    }
  );
  return TaskAssignment;
};
