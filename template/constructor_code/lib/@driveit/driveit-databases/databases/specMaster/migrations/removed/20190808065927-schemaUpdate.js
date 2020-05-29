'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vehicle', 'makeCode',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'principleModeCode',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'colorCode',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'colorType',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'yearMake',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'releaseDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'referenceDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'exciseType',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'exciseDuty',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'exciseNo',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'salesTax',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'remarks',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'indentNo',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('vehicle', 'plantModelCode',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),      
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
      queryInterface.removeColumn('vehicle', 'makeCode',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'principleModeCode',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'colorCode',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'colorType',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'colorType',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'yearMake',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'releaseDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'referanceDate',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'exciseType',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'exciseDuty',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'exciseNo',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'salesTax',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'remarks',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'indentNo',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.removeColumn('vehicle', 'plantModelCode',  { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
