'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return Promise.all([
    queryInterface.addColumn('make', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('model', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('variant', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('transmissionType', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('bodyType', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('vehicleType', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('fuelType', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('assemblyType', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('vehicle', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('colorType', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('color', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    queryInterface.addColumn('vehicleUsage', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
   ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('make', 'inactivateReason'),
      queryInterface.removeColumn('model', 'inactivateReason'),
      queryInterface.removeColumn('variant', 'inactivateReason'),
      queryInterface.removeColumn('transmissionType', 'inactivateReason'),
      queryInterface.removeColumn('bodyType', 'inactivateReason'),
      queryInterface.removeColumn('vehicleType', 'inactivateReason'),
      queryInterface.removeColumn('fuelType', 'inactivateReason'),
      queryInterface.removeColumn('assemblyType', 'inactivateReason'),
      queryInterface.removeColumn('vehicle', 'inactivateReason'),
      queryInterface.removeColumn('colorType', 'inactivateReason'),
      queryInterface.removeColumn('color', 'inactivateReason'),
      queryInterface.removeColumn('vehicleUsage', 'inactivateReason'),
    ]);
  }
};
