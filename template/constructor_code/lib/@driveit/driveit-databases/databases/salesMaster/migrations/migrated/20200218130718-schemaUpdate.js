'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('jvsGroup', 'tenantId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('jvsGroup', 'tenantBranchId', {
        type: Sequelize.STRING,
        allowNull: true
      }),

      queryInterface.addColumn('jvsTypesControl', 'tenantId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('jvsTypesControl', 'tenantBranchId', {
        type: Sequelize.STRING,
        allowNull: true
      }),

      queryInterface.addColumn('jvsCalendar', 'tenantId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('jvsCalendar', 'tenantBranchId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
    ]);
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
