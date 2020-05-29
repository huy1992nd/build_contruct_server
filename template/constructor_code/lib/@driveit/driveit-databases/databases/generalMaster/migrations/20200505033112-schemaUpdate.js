'use strict';
const StatusEnum = require("../models/enums/Status");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('navisionHistory', 'historyType',
        {
          type: Sequelize.ENUM,
          allowNull: false,
          values: [StatusEnum.navistionHistoryTypes],
          defaultValue: StatusEnum.JVS,
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
