'use strict';
const StatusEnum = require('../models/enums/Status');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('jvsTypesControl', 'isManual', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: StatusEnum.ENABLED,
        values: [StatusEnum.status],
      }),

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
