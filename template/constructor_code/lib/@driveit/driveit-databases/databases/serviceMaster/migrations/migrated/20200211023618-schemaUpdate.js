'use strict';
const StatusEnum = require('..//models/enums/Status');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('repairOrder', 'roStatus', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [StatusEnum.roStatus],
        defaultValue: StatusEnum.NEW,
      }
      )
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
