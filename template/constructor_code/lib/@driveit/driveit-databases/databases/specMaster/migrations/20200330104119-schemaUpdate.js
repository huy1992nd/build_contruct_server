'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('customerVehicleRelation', 'customerName', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('customerVehicleRelation', 'customerIdentityNo', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('customerVehicleRelation', 'phoneNo', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('customerVehicleRelation', 'regNo', {
        type: Sequelize.STRING,
      })
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
