'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('excisePayment', 'uploadFileDate', {
        type: Sequelize.STRING(2000),
        allowNull: true
      }),
      // queryInterface.changeColumn('excisePayment', 'uploadDate', {
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
