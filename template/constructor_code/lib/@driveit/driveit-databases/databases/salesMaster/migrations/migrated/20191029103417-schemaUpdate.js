'use strict';
const BookingStatusEnum = require('../database/models/enums/BookingStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('vehicleBooking', 'status', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: BookingStatusEnum.NEW,
        values: [BookingStatusEnum.status]
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
