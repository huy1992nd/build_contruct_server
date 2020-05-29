'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('appointmentRules', 'monday', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('appointmentRules', 'tuesday', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('appointmentRules', 'wednesday', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('appointmentRules', 'thursday', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('appointmentRules', 'friday', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('appointmentRules', 'saturday', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('appointmentRules', 'sunday', {
        type: Sequelize.TEXT,
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
