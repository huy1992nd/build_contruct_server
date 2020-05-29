'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const status = require('../models/enums/ENikStatus').status;
    const StatusEnum = require('../models/enums/ENikStatus');
    let statusEnum = status.sort();
    return Promise.all([
      queryInterface
      .changeColumn('eNik', 'status', {
        type: Sequelize.ENUM(...statusEnum),
        allowNull: true,
        defaultValue: StatusEnum.NEW,
        values: [StatusEnum.status]
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
