'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('repairOrderInsurance', 'underinsuredAmountWaiver', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      }),
      queryInterface.addColumn('repairOrderInsurance', 'bettermentAmountWaiver', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      }),
      queryInterface.addColumn('repairOrderInsurance', 'accessAmountWaiver', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
