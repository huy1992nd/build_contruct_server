'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('warrantyApprovalIncident', 'fileName', {
        type: Sequelize.STRING(2000),
        allowNull: true
      }),
      queryInterface.addColumn('warrantyApprovalIncident', 'fileUrl', {
        type: Sequelize.STRING(2000),
        allowNull: true
      }),
      queryInterface.addColumn('warrantyApprovalIncident', 'uploadBy', {
        type: Sequelize.STRING(2000),
        allowNull: true
      }),
      queryInterface.addColumn('warrantyApprovalIncident', 'uploadDate', {
        type: Sequelize.STRING(2000),
        allowNull: true
      })
    ])
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
