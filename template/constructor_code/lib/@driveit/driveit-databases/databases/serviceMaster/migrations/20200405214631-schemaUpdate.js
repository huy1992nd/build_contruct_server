'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('bayMaster', 'tenantId'),
      queryInterface.changeColumn('bayMaster', 'branchId', { type: Sequelize.UUID, allowNull: false }),
      
      queryInterface.addColumn('contracts', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('contracts', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.renameColumn('contracts', 'tenantBranchId', 'branchId')

    ]).catch((error) => console.log(error));
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
