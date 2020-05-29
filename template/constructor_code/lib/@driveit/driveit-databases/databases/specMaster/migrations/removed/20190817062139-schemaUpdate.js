'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('variant', 'vtaApprovalDate'),
      queryInterface.removeColumn('variant', 'bookingAvailability'),
      queryInterface.addColumn('variant', 'targetEffectiveStartDate',  { type: Sequelize.STRING, allowNull: false, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('variant', 'targetEffectiveEndDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'})
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
