'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('TempVehicleCust', 'makeId', { type: Sequelize.STRING }),
      queryInterface.addColumn('TempVehicleCust', 'modelId', { type: Sequelize.STRING }),
      queryInterface.addColumn('TempVehicleCust', 'variantId', { type: Sequelize.STRING }),
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
