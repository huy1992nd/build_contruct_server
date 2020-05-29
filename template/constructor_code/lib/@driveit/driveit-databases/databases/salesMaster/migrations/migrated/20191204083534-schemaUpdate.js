'use strict';
const StatusEnum = require('../database/models/enums/AdlStatus')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return Promise.all([
    queryInterface.changeColumn('accessoriesDismantle', 'status', {
      type: Sequelize.ENUM,
      allowNull: false,
      defaultValue: StatusEnum.NEW,
      values: [StatusEnum.status]
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
