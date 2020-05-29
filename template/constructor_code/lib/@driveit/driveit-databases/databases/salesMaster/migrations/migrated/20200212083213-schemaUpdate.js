'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn('excisePayment', 'customerId', {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }),
      // queryInterface.addColumn('excisePayment', 'customerName', {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }),
      // queryInterface.addColumn('excisePayment', 'exciseNo', {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }),
      // queryInterface.changeColumn('excisePayment', 'chassisNo', {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }),
      // queryInterface.addColumn('excisePayment', 'engineNo', {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }),
      // queryInterface.addColumn('excisePayment', 'releaseDate', {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }),
    ]);
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
