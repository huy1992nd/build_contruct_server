'use strict';
const StatusEnum = require('../models/enums/ENikStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn('eNik', 'status', {
      //   type: Sequelize.ENUM,
      //   allowNull: true,
      //   defaultValue: StatusEnum.NEW,
      //   values: [StatusEnum.status],
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
