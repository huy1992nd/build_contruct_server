'use strict';
const StatusEnum = require('../database/models/enums/AflStatus')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.changeColumn('adhocAccessoriesOrder', 'aflStatus', {
      type: Sequelize.ENUM,
      allowNull: true,
      defaultValue: null,
      values: [StatusEnum.status]
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
