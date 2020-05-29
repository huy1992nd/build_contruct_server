'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('jvsGroup', 'branchId', { type: Sequelize.UUID, allowNull: true }),

      queryInterface.addColumn('jvsTypesControl', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('jvsTypesControl', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.renameColumn('jvsTypesControl', 'tenantBranchId', 'branchId')
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
