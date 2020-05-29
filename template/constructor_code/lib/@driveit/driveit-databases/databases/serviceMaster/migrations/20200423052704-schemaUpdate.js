'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const partStatus = require('../models/enums/Status').partStatus;
    let statusEnum = partStatus.sort();

    return queryInterface.addColumn('repairOrderParts', 'partStatus', 
    { type: Sequelize.ENUM(...statusEnum),
      allowNull: false,
      defaultValue: 'new',
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
