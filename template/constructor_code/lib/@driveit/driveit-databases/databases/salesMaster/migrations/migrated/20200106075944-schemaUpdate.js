'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('jvs', 'payrollYear', {
        type: Sequelize.INTEGER(4),
        allowNull: true
      }),

      queryInterface.addColumn('jvs', 'payrollMonth', {
        type: Sequelize.STRING(50),
        allowNull: true
      }),

      queryInterface.addColumn('jvs', 'jvsCalendarPeriodId', {
        type: Sequelize.UUID,
        defaultValue: '00000000-0000-0000-0000-000000000000',
      }),

      queryInterface.addColumn('jvs', 'jvsCalendarId', {
        type: Sequelize.UUID,
        defaultValue: '00000000-0000-0000-0000-000000000000'
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
