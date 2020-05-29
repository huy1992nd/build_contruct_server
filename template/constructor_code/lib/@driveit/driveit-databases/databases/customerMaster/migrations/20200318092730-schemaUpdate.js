'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn('branch', 'eChecklist', {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false
      // }),
      // queryInterface.addColumn('branch', 'eDisposal', {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false
      // }),
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
