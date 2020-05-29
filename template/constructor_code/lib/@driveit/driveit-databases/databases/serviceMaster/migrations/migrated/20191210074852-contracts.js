'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('contracts', 'currencyId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('contracts', 'labourTaxRate', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('contracts', 'partsTaxRates', {
        type: Sequelize.STRING,
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
