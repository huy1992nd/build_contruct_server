'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('lead', 'salesAdvisorId', { type: Sequelize.STRING(36), allowNull: true }),
      queryInterface.addColumn('lead', 'salesAdvisorEmployeeId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('lead', 'salesAdvisorName', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('lead', 'branchId', { type: Sequelize.STRING(36), allowNull: true }),
      queryInterface.addColumn('leadVehicleOwn', 'variantId', { type: Sequelize.STRING(36), allowNull: false }),
      queryInterface.changeColumn('leadVehicleOwn', 'description', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
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
