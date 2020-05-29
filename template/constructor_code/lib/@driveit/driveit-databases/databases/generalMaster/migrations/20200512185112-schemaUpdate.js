'use strict';
const StatusEnum = require("../models/enums/Status");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('materialMasterBasicinfo', 'materialId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('materialMasterBasicinfo', 'materialDescription', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0'
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
