'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('product', 'foreCastEffectiveStartDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('product', 'foreCastEffectiveEndDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('product', 'orderingEffectiveStartDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('product', 'orderingEffectiveEndDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('product', 'bookingEffectiveStartDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('product', 'bookingEffectiveEndDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('product', 'bookingAvailability'),
      queryInterface.removeColumn('product', 'effectiveStartDate'),
      queryInterface.removeColumn('product', 'effectiveEndDate')
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
