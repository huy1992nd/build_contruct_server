'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('maintenanceReminder', 'branchId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('warrantyApproval', 'branchId', { type: Sequelize.UUID, allowNull: true }),

      queryInterface.addColumn('profitCenter', 'tenantCompanyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('profitCenter', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('profitCenter', 'tenantBranchId', { type: Sequelize.UUID, allowNull: true }),

      queryInterface.addColumn('profitCenterGroup', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('profitCenterGroup', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.renameColumn('profitCenterGroup', 'tenantBranchId', 'branchId')
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
