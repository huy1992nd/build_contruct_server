'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('customerVehicleRelation', 'email', { type: Sequelize.STRING }),
      queryInterface.addColumn('customerVehicleRelation', 'areaCode', { type: Sequelize.STRING }),
      queryInterface.addColumn('TempVehicleCust', 'areaCode', { type: Sequelize.STRING }),
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
