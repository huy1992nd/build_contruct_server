'use strict';
const StatusEnum = require("../models/enums/Status");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('navisionInv', 'costCenter', {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: ''
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
