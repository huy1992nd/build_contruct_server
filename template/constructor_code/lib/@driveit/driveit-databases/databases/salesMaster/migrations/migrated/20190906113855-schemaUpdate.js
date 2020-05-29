'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('vehicleBooking', 'mStateId'),
      queryInterface.removeColumn('vehicleBooking', 'mBranchId'),
      queryInterface.addColumn('vehicleBooking', 'aStateId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleBooking', 'aBranchId', { type: Sequelize.STRING, allowNull: true }),
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
