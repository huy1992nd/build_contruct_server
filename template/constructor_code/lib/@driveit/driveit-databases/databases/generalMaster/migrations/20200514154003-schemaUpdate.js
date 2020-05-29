'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('orderHeader', 'documentDate', {
        type: Sequelize.DATEONLY,
        allowNull: true
      }),
      queryInterface.changeColumn('orderHeader', 'custKey', {
        type: Sequelize.STRING(15),
        defaultValue: '',
        allowNull: true
      })
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
