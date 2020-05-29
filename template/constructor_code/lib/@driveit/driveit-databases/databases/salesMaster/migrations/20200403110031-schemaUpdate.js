'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([      
      queryInterface.addColumn('accessoriesDismantle', 'tenantCompanyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('accessoriesDismantle', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('accessoriesDismantle', 'tenantBranchId', { type: Sequelize.UUID, allowNull: true }),

      queryInterface.addColumn('adhocAccessoriesOrder', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('adhocAccessoriesOrder', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('adhocAccessoriesOrder', 'branchId', { type: Sequelize.UUID, allowNull: true }),
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
