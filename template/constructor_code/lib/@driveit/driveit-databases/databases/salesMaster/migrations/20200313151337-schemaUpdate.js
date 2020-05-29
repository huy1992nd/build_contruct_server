'use strict';
const UsedVehicleBookingEnum = require('../models/enums/UsedVehicleBookingStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.removeColumn('usedVehicleBookingData', 'usedBookingId'),
      // queryInterface.changeColumn('usedVehicleBookingData', 'bookingStatus', {
      //   type: Sequelize.ENUM,
      //   allowNull: true,
      //   values: [UsedVehicleBookingEnum.statuses]
      // }),
      // queryInterface.addColumn('usedVehicleBookingData', 'companyId', {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }),

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
