'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // One Task can have many TaskAssignments (1-to-many relationship)
      Task.hasMany(models.TaskAssignment, { foreignKey: 'taskId', as: 'assignments' });

      // Additional relationship (optional): A task could potentially have many users through task assignments
      Task.belongsToMany(models.User, {
        through: models.TaskAssignment,
        foreignKey: 'taskId',
        otherKey: 'userId',
        as: 'users',
      });
    }
  }
  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      due_date: {
        type: DataTypes.DATE,
        allowNull: true, // Optional due date
      },
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
