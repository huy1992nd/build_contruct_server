'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.addColumn('variant', 'cc',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'seatingCapacity', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'wheelBase',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'modelYear', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'isFourWheelDrive',  { type: Sequelize.Boolean, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    // queryInterface.addColumn('variant', 'engineTypeId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    // queryInterface.addColumn('variant', 'engineCapacity', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    // queryInterface.addColumn('variant', 'carryingCapacity', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    // queryInterface.addColumn('variant', 'jpgModel', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    // queryInterface.addColumn('variant', 'jpgCompanyId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    // queryInterface.addColumn('variant', 'exciseDutyBranchId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    // queryInterface.addColumn('variant', 'exciseFreeDutyBranchId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    // queryInterface.addColumn('variant', 'originalStatusId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    // queryInterface.addColumn('variant', 'bookingAvailability', { type: Sequelize.BOOLEAN, onUpdate: 'cascade', onDelete: 'SET NULL'})
    
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
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
