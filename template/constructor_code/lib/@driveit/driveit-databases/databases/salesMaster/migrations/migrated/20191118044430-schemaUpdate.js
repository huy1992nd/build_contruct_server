'use strict';
const adhocAccesorriesStatusEnum = require('../database/models/enums/AdhocAccesorriesStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('adhocAccessoriesOrder', 'status', {
      type: Sequelize.ENUM,
      allowNull: false,
      defaultValue: adhocAccesorriesStatusEnum.NEW,
      values: [adhocAccesorriesStatusEnum.status]
    })
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
