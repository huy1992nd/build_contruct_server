'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable('vendorBusinessFinancial')
    .then(tableDefinition => {
      if (!tableDefinition['companyCode']) { // if column not exist, add column
        return queryInterface.addColumn('vendorBusinessFinancial', 'companyCode', {
          type: Sequelize.STRING,
        })
      } 
      return Promise.resolve();
    });
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
