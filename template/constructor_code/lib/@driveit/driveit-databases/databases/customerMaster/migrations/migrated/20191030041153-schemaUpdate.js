'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });

    */

    return Promise.all([
      queryInterface.addColumn('branch', 'storageLocationId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('branch', 'storageName', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('branch', 'dropStorageLocationId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('branch', 'dropStorageName', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('branch', 'businessTypeIds', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('branch', 'makeIds', {
        type: Sequelize.STRING,
        allowNull: true
      }),
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
