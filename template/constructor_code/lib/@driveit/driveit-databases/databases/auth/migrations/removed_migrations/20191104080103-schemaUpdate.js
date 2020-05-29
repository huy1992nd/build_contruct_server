'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn('internal_users', 'isEmployee', {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: true,
      //   defaultValue: false,
      // }),
      queryInterface.addColumn('internal_users', 'countryId', {
        type: Sequelize.STRING(36),
        allowNull: true
      }),
      queryInterface.addColumn('internal_users', 'companyId', {
        type: Sequelize.STRING(36),
        allowNull: true
      }),
      queryInterface.addColumn('internal_users', 'branchId', {
        type: Sequelize.STRING(36),
        allowNull: true
      }),
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
