'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('purchaseOrder', 'paymentMode', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('poItems', 'arrivalDate', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
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
