'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vehicleBooking', 'buyerOrderDate', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vehicleBooking', 'buyerOrderNo', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vehicleBooking', 'purchaseOrderNo', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vehicleBooking', 'exciseExempted', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn('vehicleBooking', 'salesTaxExempted', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn('vehicleBooking', 'registrationRegionId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vehicleBooking', 'initialExtendedWarranty', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
