'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('materialMasterBasicinfo', 'fulfilledMeterialID', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('materialMasterBasicinfo', 'fulfilledQty', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('materialMasterBasicinfo', 'returnedQty', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('materialMasterBasicinfo', 'returnAcceptedQty', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('materialMasterBasicinfo', 'totalCost', {
        type: Sequelize.DECIMAL(13,2),
        allowNull: true
      }),
      queryInterface.addColumn('materialMasterBasicinfo', 'unitCost', {
        type: Sequelize.DECIMAL(13,2),
        allowNull: true
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
