'use strict';
const StatusEnum = require('../models/enums/Status');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('jvs', 'amount', {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      }),

      queryInterface.addColumn('jvs', 'salesId', {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: '00000000-0000-0000-0000-000000000000'
      }),

      queryInterface.changeColumn('jvs', 'isManual', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: StatusEnum.JVSTRANSACTIONTYPE.MANUAL,
        values: [StatusEnum.jvsTransactionType],
      }),
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
