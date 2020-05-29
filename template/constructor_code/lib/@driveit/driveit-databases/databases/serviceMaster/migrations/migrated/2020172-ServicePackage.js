'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.renameColumn(
      //   'servicePackage',
      //   'mileage',
      //   'mileageFrom'
      //  ),
      //  queryInterface.renameColumn(
      //   'servicePackage',
      //   'mileageTolerance',
      //   'mileageTo'
      //  ),
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