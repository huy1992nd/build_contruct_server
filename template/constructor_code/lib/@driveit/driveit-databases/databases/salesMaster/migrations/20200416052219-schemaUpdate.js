'use strict';


module.exports = {

  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface
      .changeColumn('vehicleBooking', 'accessoriesFitmentStatus', {
        type: Sequelize.ENUM(...['new', 'wip', 'mep', 'completed', 'cancelled', 'new-pending-cbj', 'wip-pending-cbj', 'new-cbj', 'wip-cbj'].sort()),

      }),
      queryInterface
      .changeColumn('vehicleBooking', 'status', {
        type: Sequelize.ENUM(...['new', 'allocated', 'hold', 'unhold', 'registered', 'cancel', 'delivered', 'pending_refund', 'invoiced'].sort()),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {}
};