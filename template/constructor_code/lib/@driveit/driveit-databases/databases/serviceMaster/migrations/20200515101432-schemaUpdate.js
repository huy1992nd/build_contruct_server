'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('warrantyClaimIncidentParts', 'uomCode', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('warrantyClaimIncidentParts', 'uomName', {
        type: Sequelize.STRING
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
