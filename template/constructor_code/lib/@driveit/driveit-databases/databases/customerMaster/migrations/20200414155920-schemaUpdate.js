'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('customerCorrespondenceAddress', 'telCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('customerCorrespondenceAddress', 'faxCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('customerCorrespondenceAddress', 'mobileCode', {
        type: Sequelize.STRING,
        allowNull: true,
      })
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
