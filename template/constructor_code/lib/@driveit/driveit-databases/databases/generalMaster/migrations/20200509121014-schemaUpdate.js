'use strict';
const StatusEnum = require("../../generalMaster/models/enums/Status");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
        // queryInterface.renameTable('navisionInv', 'navisionServiceInvoiceHistory')
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
