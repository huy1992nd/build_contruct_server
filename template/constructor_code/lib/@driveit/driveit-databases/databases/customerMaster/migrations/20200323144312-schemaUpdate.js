'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('branch', 'storageLocationId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('branch', 'storageName', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('branch', 'dropStorageLocationId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('branch', 'dropStorageName', {
        type: Sequelize.STRING,
        allowNull: true,
      }),

      queryInterface.changeColumn('dropPoint', 'slocationId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
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
