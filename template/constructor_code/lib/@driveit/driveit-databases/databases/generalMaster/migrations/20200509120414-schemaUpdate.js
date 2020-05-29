'use strict';
const StatusEnum = require("../../generalMaster/models/enums/Status");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn('navisionInv', 'syncStatus', {
          type: Sequelize.ENUM,
          allowNull: false,
          values: [StatusEnum.syncStatus],
          defaultValue: StatusEnum.FAILED,
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
