'use strict';

const AfdStatusEnum = require('../database/models/enums/AfdStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('accessoriesItem', 'accessoriesFitmentDocumentId'),
      queryInterface.addColumn('accessoriesItem', 'afdNo', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('accessoriesItem', 'afdDate', {
        type: Sequelize.DATE,
        allowNull: true
      }),
      queryInterface.addColumn('accessoriesItem', 'afdStatus', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: AfdStatusEnum.NEW,
        values: [AfdStatusEnum.status]
      }),
      queryInterface.addColumn('accessoriesItem', 'printedDate', {
        type: Sequelize.DATE,
        allowNull: true
      }),
      queryInterface.addColumn('accessoriesItem', 'vehicleId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
