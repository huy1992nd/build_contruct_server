'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn('orderSetupModel', 'modelId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('orderSetupVariant', 'variantId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('orderSetupProduct', 'productId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('orderSetupColor', 'colorId', { type: Sequelize.STRING, allowNull: true }),
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
