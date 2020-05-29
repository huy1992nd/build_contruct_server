'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('PreRepairOrder', 'customerId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('PreRepairOrder', 'vehicleId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('PreRepairOrder', 'mileageCurrent', {
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
