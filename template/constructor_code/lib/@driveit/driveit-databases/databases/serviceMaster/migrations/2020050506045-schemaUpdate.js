'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const roStatus = require('../models/enums/Status').roStatus;
    let statusEnum = roStatus.sort();
    return Promise.all([
      queryInterface
      .addColumn('warrantyIncident', 'recallInternalNo', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
