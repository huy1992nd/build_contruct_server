'use strict';
const StatusEnum = require('../database/models/enums/OrderListSetupStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('orderListSetup', 'status', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: StatusEnum.NEW,
        values: [StatusEnum.status],
      }),

      queryInterface.addColumn('orderListSetup', 'cancelReasonId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('orderListSetup', 'cancelOtherReason', {
        type: Sequelize.TEXT,
        allowNull: true
      }),
      queryInterface.addColumn('orderListSetup', 'rejectReasonId', {
        type: Sequelize.STRING,
        allowNull: true
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
