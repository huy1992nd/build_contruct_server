'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vehicleBooking', 'optionalPackageIds', {type: Sequelize.STRING, allowNull: true}),
      queryInterface.addColumn('vehicleBooking', 'optionalItemIds', {type: Sequelize.STRING, allowNull: true}),
      queryInterface.addColumn('vehicleBooking', 'supplyItemIds', {type: Sequelize.STRING, allowNull: true}),
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
