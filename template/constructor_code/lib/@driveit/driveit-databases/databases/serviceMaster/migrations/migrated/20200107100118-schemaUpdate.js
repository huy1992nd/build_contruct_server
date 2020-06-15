'use strict';

const StatusEnum = require('../models/enums/Status');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return Promise.all([
    queryInterface.changeColumn('warrantyClaimIncident', 'status', {
      type: Sequelize.ENUM,
      allowNull: false,
      defaultValue: StatusEnum.APPROVED_HQ,
      values: [StatusEnum.warrantyClaimStatus],
    })
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