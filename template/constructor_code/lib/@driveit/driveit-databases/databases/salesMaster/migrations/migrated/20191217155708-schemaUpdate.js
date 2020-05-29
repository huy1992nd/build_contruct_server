'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('orderListSetup', 'modelId', {
        type: Sequelize.STRING(40)
      }),
      queryInterface.addColumn('orderListSetup', 'variantId', {
        type: Sequelize.STRING(40)
      }),
      queryInterface.addColumn('orderListSetup', 'productId', {
        type: Sequelize.STRING(40)
      }),
      queryInterface.addColumn('orderListSetup', 'colorId', {
        type: Sequelize.STRING(40)
      }),
      queryInterface.addColumn('orderListSetup', 'exciseTypeId', {
        type: Sequelize.STRING(40)
      }),
      queryInterface.addColumn('orderListSetup', 'optionalPackageId', {
        type: Sequelize.STRING(40)
      }),
      queryInterface.addColumn('orderListSetup', 'standardPackageId', {
        type: Sequelize.STRING(40)
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
