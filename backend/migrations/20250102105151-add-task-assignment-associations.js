'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Example: Adding an assignedTo field to the Task table
    await queryInterface.addColumn('Tasks', 'assignedTo', {
      type: Sequelize.INTEGER,
      allowNull: true, // Allow null if assignment is optional
      references: {
        model: 'Users', // Name of the Users table
        key: 'id',      // Key in Users table that this field refers to
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the column in case of rollback
    await queryInterface.removeColumn('Tasks', 'assignedTo');
  },
};
