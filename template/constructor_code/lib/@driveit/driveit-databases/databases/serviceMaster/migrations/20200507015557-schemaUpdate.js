'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const StatusEnum = require('../models/enums/Status');
    return Promise.all([
      queryInterface
        .changeColumn('poItems', 'status', {
          type: Sequelize.ENUM,
          allowNull: true,
          defaultValue: StatusEnum.ENABLED,
          values: [StatusEnum.poItemstatus],
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
