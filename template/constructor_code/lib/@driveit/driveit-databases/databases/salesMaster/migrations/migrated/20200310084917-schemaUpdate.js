'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('lead', 'makeId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('lead', 'modelId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('lead', 'variantId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('lead', 'productId', {
        type: Sequelize.STRING,
        allowNull: true
      })
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
