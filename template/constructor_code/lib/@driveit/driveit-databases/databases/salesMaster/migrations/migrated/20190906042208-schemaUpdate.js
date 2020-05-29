'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('vehicleBooking', 'paymentTypeId'),
      queryInterface.addColumn('vehicleBooking', 'paymentTermsId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBooking', 'noOfDays', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBooking', 'financierId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBooking', 'mStateId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBooking', 'mBranchId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBooking', 'financierAddr', { type: Sequelize.TEXT, allowNull: true }),
      queryInterface.addColumn('vehicleBooking', 'loanTenure', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBooking', 'interestRate', { type: Sequelize.DOUBLE(4, 2), allowNull: true }),
      queryInterface.addColumn('vehicleBooking', 'loanAmount', { type: Sequelize.DOUBLE, allowNull: true }),
      queryInterface.addColumn('vehicleBooking', 'hpHandlingFee', { type: Sequelize.STRING, allowNull: true }),
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
