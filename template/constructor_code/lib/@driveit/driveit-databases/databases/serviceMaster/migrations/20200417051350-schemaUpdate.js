'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const roStatus = require('../models/enums/Status').roStatus;
    let statusEnum = roStatus.sort();
    return Promise.all([
      queryInterface
      .changeColumn('repairOrderParts', 'status', {
        type: Sequelize.ENUM(...statusEnum),

      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
