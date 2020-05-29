'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('materialStorage', 'storageLocationId', {
        type: Sequelize.STRING,
        allowNull: true
      }),

      queryInterface.addColumn('materialStorage', 'deleted', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
    ])
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
