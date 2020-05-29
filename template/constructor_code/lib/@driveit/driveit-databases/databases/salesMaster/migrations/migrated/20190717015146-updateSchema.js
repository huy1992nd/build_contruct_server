'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.changeColumn('vehicleBooking', 'status', {
      type: Sequelize.ENUM('hold', 'unhold', 'new', 'allocated', 'registered', 'cancel','delivered'),
      allowNull: false,
      defaultValue: 'new'
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.changeColumn('vehicleBooking', 'status', {
      type: Sequelize.ENUM('hold', 'unhold', 'new', 'allocated', 'registered', 'cancel'),
      allowNull: false,
      defaultValue: 'new'
    });
  }
};
