'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('servicePackage', 'milage', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('servicePackage', 'milageTolerance', {
        type: Sequelize.STRING,
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