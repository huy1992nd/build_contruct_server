'use strict';
const InstallationStatusEnum = require('../database/models/enums/InstallationStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.changeColumn('accessoriesItem', 'installationStatus', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [InstallationStatusEnum.status]
      })
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
