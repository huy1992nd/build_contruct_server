'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vehicleBooking', 'insureSettlement', {type: Sequelize.STRING, allowNull: true}),
      queryInterface.addColumn('vehicleBooking', 'insurerOption', {type: Sequelize.STRING, allowNull: true}),
      queryInterface.addColumn('vehicleBooking', 'insurerId', {type: Sequelize.STRING, allowNull: true}),
      queryInterface.addColumn('vehicleBooking', 'insurerReasonId', {type: Sequelize.STRING, allowNull: true}),
      queryInterface.addColumn('vehicleBooking', 'otherInsurer', {type: Sequelize.STRING, allowNull: true}),
      queryInterface.addColumn('vehicleBooking', 'otherInsurerReason', {type: Sequelize.STRING, allowNull: true}),
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
