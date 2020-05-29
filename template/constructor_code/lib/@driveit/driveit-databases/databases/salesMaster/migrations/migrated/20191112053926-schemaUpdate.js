'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('accessoriesFitmentDocument', 'makeId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('accessoriesFitmentDocument', 'modelId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('accessoriesFitmentDocument', 'variantId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('accessoriesFitmentDocument', 'productId', { type: Sequelize.STRING, allowNull: true }),
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
