'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const roStatus = require('../models/enums/Status').roStatus;
    let statusEnum = roStatus.sort();
    return Promise.all([
      queryInterface.changeColumn('repairOrderParts', 'status', {
        type: Sequelize.ENUM(...statusEnum),
        allowNull: false,
        defaultValue: 'new',
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
