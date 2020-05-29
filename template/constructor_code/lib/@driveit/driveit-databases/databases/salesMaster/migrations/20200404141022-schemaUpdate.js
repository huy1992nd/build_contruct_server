'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('jvsTypesControl', 'branchId', { type: Sequelize.UUID, allowNull: true }),

      queryInterface.addColumn('discretionaryMarginLimit', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('discretionaryMarginLimit', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.renameColumn('discretionaryMarginLimit', 'tenantBranchId', 'branchId')
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
