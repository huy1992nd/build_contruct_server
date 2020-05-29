'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('orderListSetup', 'optionalItemCode', {
        type: Sequelize.STRING(1000),
        allowNull: true 
      }),

      queryInterface.addColumn('orderListSetup', 'optionalPackageCode', {
        type: Sequelize.STRING(1000),
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
