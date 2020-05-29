'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.describeTable('paymentItem')
      .then(tableDefinition => {
        if (!tableDefinition['amountPayable']) { // if column not exist, add column
          return queryInterface.addColumn('paymentItem', 'amountPayable', { 
            type: Sequelize.STRING 
          });
        }
        return Promise.resolve();
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
