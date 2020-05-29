'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable('navisionCustomerHistory')
    .then(tableDefinition => {
      if (!tableDefinition['gstStatusLastCheckedDate']) { // if column not exist, add column
        return queryInterface.addColumn('navisionCustomerHistory', 'gstStatusLastCheckedDate', {
          type: Sequelize.DATE,
        })
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
