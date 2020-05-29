'use strict';
const DismantleStatusEnum = require('../database/models/enums/DismantleStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('accessoriesItem', 'accessoriesDismantleId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('accessoriesItem', 'dismantleStatus', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [DismantleStatusEnum.status]
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
