'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn('excisePayment', 'deleted', {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: true,
      //   defaultValue: false
      // }),
      // queryInterface.addColumn('excisePayment', 'createdBy', {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }),
      // queryInterface.addColumn('excisePayment', 'updatedBy', {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // }),
      // queryInterface.addColumn('excisePayment', 'createdAt', {
      //   type: Sequelize.DATE,
      //   allowNull: true
      // }),
      // queryInterface.addColumn('excisePayment', 'updatedAt', {
      //   type: Sequelize.DATE,
      //   allowNull: true
      // }),
      // queryInterface.addColumn('excisePayment', 'fileName', {
      //   type: Sequelize.STRING(2000),
      //   allowNull: true
      // }),
      // queryInterface.addColumn('excisePayment', 'fileUrl', {
      //   type: Sequelize.STRING(2000),
      //   allowNull: true
      // }),
      queryInterface.addColumn('excisePayment', 'uploadBy', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('excisePayment', 'uploadDate', {
        type: Sequelize.DATE,
        allowNull: true
      })]);
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
