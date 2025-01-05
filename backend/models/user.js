'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // One User can have many TaskAssignments (1-to-many relationship)
      User.hasMany(models.TaskAssignment, { foreignKey: 'userId', as: 'assignments' });

      // Additional relationship: A user can have many tasks through task assignments
      User.belongsToMany(models.Task, {
        through: models.TaskAssignment,
        foreignKey: 'userId',
        otherKey: 'taskId',
        as: 'tasks',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
