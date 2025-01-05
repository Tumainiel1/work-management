'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'due_date', {
      type: Sequelize.DATE,
      allowNull: true, // Allow null if the due date is optional
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('Tasks', 'due_date');
  }
};
