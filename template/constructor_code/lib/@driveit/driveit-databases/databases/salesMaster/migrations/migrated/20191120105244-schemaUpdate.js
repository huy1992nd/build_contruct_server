'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
   queryInterface.changeColumn('vehicleTransfer', 'designatedLocationId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('vehicleTransfer', 'designatedStorageLocationId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vehicleTransfer', 'vendorId', {
        type: Sequelize.STRING,
        allowNull: true
      })
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
