'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('orderListSetup', 'branchId', {
        type: Sequelize.UUID,
        allowNull: true 
      }),
      queryInterface.renameColumn('orderListSetup', 'dropPointId', 'storageLocationId'),
      queryInterface.renameColumn('orderListSetup', 'dropPoint', 'storageLocationName')
    ]); 
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
