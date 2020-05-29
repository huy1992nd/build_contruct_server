'use strict';
const StatusEnum = require("../models/enums/Status");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'documentRef', {
        type: Sequelize.STRING(10),
        defaultValue: 'ROINV',
        allowNull: false,
      }),
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'documentNo', {
        type: Sequelize.STRING(50),
        allowNull: false,
      }),

      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'externalDocumentNo', {
        type: Sequelize.STRING(50),
        allowNull: false,
      }),
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'description', {
        type: Sequelize.STRING(80),
        defaultValue: '',
        allowNull: false,
      }),

      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'applyToDocumentNo', {
        type: Sequelize.STRING(50),
        defaultValue: ''
      }),
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'chequeNo', {
        type: Sequelize.STRING(50),
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
