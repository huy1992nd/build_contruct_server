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
      queryInterface.addColumn('sourceProblem', 'distributorCode', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('sourceProblem', 'makeId', {
        type: Sequelize.UUID,
        allowNull: true,
      }),
      queryInterface.addColumn('warrantyClass', 'makeId', {
        type: Sequelize.UUID,
        allowNull: true,
      }),
      queryInterface.addColumn('symptomCategory', 'makeId', {
        type: Sequelize.UUID,
        allowNull: true,
      }),
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
