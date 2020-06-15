'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('variant', 'productItemIds', { type: Sequelize.TEXT, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('variant', 'warrantyItemIds', { type: Sequelize.TEXT, onUpdate: 'cascade', onDelete: 'SET NULL'}),
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