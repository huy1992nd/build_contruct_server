'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.removeColumn('warrantyApprovalIncident', 'millage'),
      queryInterface.addColumn('warrantyApprovalIncident', 'mileage', {
        type: Sequelize.STRING
      })
    ]).catch(error => {
      console.error('ERROR migration warrantyIncident: ', error);
    });
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
