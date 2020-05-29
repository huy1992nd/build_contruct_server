'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.removeColumn('variant', 'cc'),
    queryInterface.removeColumn('variant', 'seatingCapacity'),
    queryInterface.removeColumn('variant', 'wheelBase'),
    queryInterface.removeColumn('variant', 'modelYear'),
    queryInterface.removeColumn('variant', 'isFourWheelDrive'),
    queryInterface.addColumn('variant', 'engineTypeId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'engineCapacity', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'carryingCapacity', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'jpgModel', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'jpgCompanyId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'exciseDutyBranchId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'exciseFreeDutyBranchId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'originalStatusId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'bookingAvailability', { type: Sequelize.BOOLEAN, onUpdate: 'cascade', onDelete: 'SET NULL'})
  ]);
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
