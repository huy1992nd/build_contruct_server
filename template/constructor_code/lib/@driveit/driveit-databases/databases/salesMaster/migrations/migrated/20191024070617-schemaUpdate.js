'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.renameColumn('vehicleBookingTradeInDetail', 'vehicleId', 'echecklistId'),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'regNo', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'makeId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'modelId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'variantId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'colorId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'chassisNo', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'engineNo', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'transmissionTypeId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'engineCapacity', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'jpjEngineTypeId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'jpjUsageTypeId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'jpjBodyTypeId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'registrationDate', { type: Sequelize.DATEONLY, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'contactRelationshipId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBookingTradeInDetail', 'customerId', { type: Sequelize.STRING, allowNull: true }),

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
