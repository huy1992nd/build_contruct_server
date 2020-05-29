'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('usedVehicleBookingData', 'vehicleRegNo', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('usedVehicleBookingData', 'makeName', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('usedVehicleBookingData', 'modelName', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('usedVehicleBookingData', 'variantName', {
        type: Sequelize.STRING,
        allowNull: true,
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
