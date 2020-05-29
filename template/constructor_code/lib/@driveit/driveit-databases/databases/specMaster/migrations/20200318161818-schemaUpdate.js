'use strict';
const StatusEnum = require('../models/enums/CustomerVehicleRelationStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('customerVehicleRelation', 'status', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: StatusEnum.ASSIGNED,
        values: [StatusEnum.status],
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
