'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn('internal_users', 'serviceStartDate', {
      //   type: Sequelize.DATEONLY,
      //   allowNull: true
      // }),
      // queryInterface.changeColumn('internal_users', 'serviceEndDate', {
      //   type: Sequelize.DATEONLY,
      //   allowNull: true
      // })
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
