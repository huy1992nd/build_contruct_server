'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('accessoriesItem', 'afdNo'),
      queryInterface.removeColumn('accessoriesItem', 'afdDate'),
      queryInterface.removeColumn('accessoriesItem', 'afdStatus'),
      queryInterface.removeColumn('accessoriesItem', 'printedDate')
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
