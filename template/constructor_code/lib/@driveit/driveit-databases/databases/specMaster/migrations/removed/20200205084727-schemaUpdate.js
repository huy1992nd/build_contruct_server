'use strict';
const StatusEnum = require('../models/enums/Status');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.removeColumn('vehicle', 'vdcStatus'),
      // queryInterface.renameColumn('vehicle', 'vdcStatus_old', 'vdcStatus'),
      // This one will update old ENUM to new ENUM on vdcStatus on Vehicle table
      queryInterface.changeColumn('vehicle', 'vdcStatus', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [StatusEnum.vdcStatus]
      }),
      queryInterface.changeColumn('vehicleMovement', 'vdcStatus', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [StatusEnum.vdcStatus]
      })
    ])
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
