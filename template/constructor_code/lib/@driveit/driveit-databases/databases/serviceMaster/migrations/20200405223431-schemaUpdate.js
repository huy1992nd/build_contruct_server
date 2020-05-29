'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('contractType', 'branchId', { type: Sequelize.UUID, allowNull: true }),

      queryInterface.addColumn('costCenter', 'tenantCompanyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('costCenter', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('costCenter', 'tenantBranchId', { type: Sequelize.UUID, allowNull: true }),

      queryInterface.addColumn('costCenterGroup', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('costCenterGroup', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.renameColumn('costCenterGroup', 'tenantBranchId', 'branchId')
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
