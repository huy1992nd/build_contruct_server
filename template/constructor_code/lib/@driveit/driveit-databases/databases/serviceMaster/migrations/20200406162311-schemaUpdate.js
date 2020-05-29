'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('profitCostCenterCategory', 'branchId', { type: Sequelize.UUID, allowNull: true }),
      
      queryInterface.changeColumn('purchaseOrder', 'branchId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.removeColumn('purchaseOrder', 'tenantId'),
      queryInterface.removeColumn('purchaseOrder', 'tenantBranchId'),

      queryInterface.addColumn('repairOrderInvoice', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('repairOrderInvoice', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.renameColumn('repairOrderInvoice', 'tenantBranchId', 'branchId'),

      queryInterface.addColumn('contractInvoice', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('contractInvoice', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.renameColumn('contractInvoice', 'tenantBranchId', 'branchId')
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
