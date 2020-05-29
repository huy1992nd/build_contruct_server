'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('repairOrderParts', 'fulfilledMeterialID', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('repairOrderParts', 'fulfilledQty', { type: Sequelize.INTEGER, allowNull: true }),
      queryInterface.addColumn('repairOrderParts', 'returnedQty', { type: Sequelize.INTEGER, allowNull: true }),
      queryInterface.addColumn('repairOrderParts', 'returnAcceptedQty', { type: Sequelize.INTEGER, allowNull: true }),
      queryInterface.addColumn('repairOrderParts', 'totalCost', { type: Sequelize.DECIMAL(13,2), allowNull: true }),
      queryInterface.addColumn('repairOrderParts', 'unitCost', { type: Sequelize.DECIMAL(13,2), allowNull: true }),
    ])
  },

  down: (queryInterface, Sequelize) => {
  }
};
