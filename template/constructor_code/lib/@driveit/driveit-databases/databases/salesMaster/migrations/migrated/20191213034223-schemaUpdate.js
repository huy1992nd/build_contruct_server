'use strict';
const StatusEnum = require('../database/models/enums/OrderListStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('orderList', 'status', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: StatusEnum.NEW,
        values: [StatusEnum.status],
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
