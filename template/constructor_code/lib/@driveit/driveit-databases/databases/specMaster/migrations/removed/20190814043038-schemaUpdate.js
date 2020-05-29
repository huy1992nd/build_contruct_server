'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.addColumn('vehicle', 'vehicleStatus', {
      type: Sequelize.ENUM('new', 'allocated'),
      allowNull: false,
      defaultValue: 'new'
    }),
    queryInterface.addColumn('vehicle', 'streamSource', {
      type: Sequelize.ENUM('sales', 'service'),
      allowNull: false
    })
  ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
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
