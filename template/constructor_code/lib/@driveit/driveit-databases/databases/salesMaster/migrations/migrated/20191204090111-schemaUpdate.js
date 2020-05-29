'use strict';
const AflStatusEnum = require('../database/models/enums/AflStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.changeColumn('vehicleBooking', 'accessoriesFitmentStatus', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [AflStatusEnum.status]
      }),
      queryInterface.changeColumn('adhocAccessoriesOrder', 'aflStatus', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [AflStatusEnum.status]
      }),
      queryInterface.changeColumn('accessoriesFitment', 'status', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: AflStatusEnum.NEW,
        values: [AflStatusEnum.status]
      }),
      queryInterface.addColumn('accessoriesFitment', 'rejectedReason', {
        type: Sequelize.STRING,
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
