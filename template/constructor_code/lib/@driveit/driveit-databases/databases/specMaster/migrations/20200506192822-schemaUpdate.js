'use strict';
const StatusEnum = require('../models/enums/Status');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('vehicle', 'vehicleStatus', {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [StatusEnum.vehicleStatus]
      }),
      queryInterface.changeColumn('vehicle', 'vdcStatus', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [StatusEnum.vdcStatus]
      }),

      queryInterface.changeColumn('vehicleMovement', 'vehicleStatus', {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [StatusEnum.vehicleStatus]
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
