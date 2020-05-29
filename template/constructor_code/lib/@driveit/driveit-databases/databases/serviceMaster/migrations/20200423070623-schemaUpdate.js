'use strict';
const StatusEnum = require('../models/enums/Status');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('repairOrderInvoice', 'status',
        {
          type: Sequelize.ENUM,
          allowNull: false,
          defaultValue: StatusEnum.ROINVOICE_KEYS.NEW,
          values: [StatusEnum.roInvoiceStatus],
        }),
    ]).catch((error) => console.log(error));
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
