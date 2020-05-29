'use strict';
const TDOType = require('../models/enums/VehicleTransfer');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vehicleTransfer', 'tdoType', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [TDOType.tdoType],
      }),
      queryInterface.addColumn('vehicleTransfer', 'issuesCompanyId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vehicleTransfer', 'contractorId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vehicleTransfer', 'transactionChargeable', {
        type: Sequelize.BOOLEAN,
        allowNull: true
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
