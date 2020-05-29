'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('branch', 'charOfAccount', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('branch', 'profitCenterId', {
        type: Sequelize.STRING(40),
        allowNull: true
      }),
      queryInterface.addColumn('branch', 'costCenterId', {
        type: Sequelize.STRING(40),
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
