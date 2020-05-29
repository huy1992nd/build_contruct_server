'use strict';
const StatusEnum = require('../models/enums/Status');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vehicleTransfer', 'vehicleStockId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('vehicleTransfer', 'vehicleBusinessTypeId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.changeColumn('vehicleTransfer', 'acknowledgeStatus', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: StatusEnum.ACKNOWLEDGESTATUS.NEW,
        values: [StatusEnum.acknowledgeStatus]
      })
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
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
