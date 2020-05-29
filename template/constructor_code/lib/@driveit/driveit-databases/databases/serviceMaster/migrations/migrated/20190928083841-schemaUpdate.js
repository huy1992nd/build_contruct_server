'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('appointmentRules', 'leadTimeValue', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.changeColumn('appointmentRules', 'walkInAllocationForSAHour', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.changeColumn('appointmentRules', 'walkInAllocationForTechnicianHour', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
