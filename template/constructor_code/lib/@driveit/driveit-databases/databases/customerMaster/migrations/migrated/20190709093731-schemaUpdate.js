'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('customerDetails', 'customerGroupId', {
      type: Sequelize.UUID,
/*       onUpdate: 'cascade',
      onDelete: 'SET NULL', */
      references: {        
        model: 'customerGroup',
        key: 'id'
      }
    });
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