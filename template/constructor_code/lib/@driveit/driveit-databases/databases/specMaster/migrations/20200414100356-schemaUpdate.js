'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('customerVehicleRelation', 'makeId', { type: Sequelize.STRING }),
      queryInterface.addColumn('customerVehicleRelation', 'modelId', { type: Sequelize.STRING }),
      queryInterface.addColumn('customerVehicleRelation', 'variantId', { type: Sequelize.STRING }),
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
