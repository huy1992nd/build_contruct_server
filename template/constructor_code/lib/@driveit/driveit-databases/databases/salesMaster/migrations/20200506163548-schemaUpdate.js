'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn("usedVehicleBookingData", "invoiceNo", {
        type: Sequelize.STRING,
        allowNull: true,
      });
      await queryInterface.addColumn("usedVehicleBookingData", "invoiceDate", {
        type: Sequelize.DATEONLY,
        allowNull: true,
      });
      await queryInterface.addColumn("usedVehicleBookingData", "odoNo", {
        type: Sequelize.STRING,
        allowNull: true,
      });
      await queryInterface.addColumn("usedVehicleBookingData", "odoDate", {
        type: Sequelize.DATEONLY,
        allowNull: true,
      });
      await queryInterface.addColumn("usedVehicleBookingData", "odoAttachment", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } catch(err) {
      throw (err);
    }
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
