'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.describeTable('customerGroup').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      return queryInterface.addColumn('customerGroup', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('customer').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      return queryInterface.addColumn('customer', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('customerDetails').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('customerDetails', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('customerFinance').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('customerFinance', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('customerContact').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('customerContact', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('customerGroup').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('employmentSector', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('industry').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('industry', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('annualIncome').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('annualIncome', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('maritalStatus').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('maritalStatus', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('plant').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('plant', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('division').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('division', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('paymentTerms').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('paymentTerms', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('storageLocation').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('storageLocation', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('distributionChannel').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('distributionChannel', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('plantDivision').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('plantDivision', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('plantDistributionChannel').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('plantDistributionChannel', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('companyPlant').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('companyPlant', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('areaOfUsage').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('areaOfUsage', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('plantStorageLocation').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('plantStorageLocation', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('employmentStatus').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('employmentStatus', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('block').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('block', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('leads').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('leads', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('contactRelationship').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('contactRelationship', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('customerAccountGroup').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('customerAccountGroup', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('company').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('company', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('taxclass').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('taxclass', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    queryInterface.describeTable('occupation').then(tableDefinition => { if (tableDefinition && !tableDefinition['inactivateReason']){
      queryInterface.addColumn('occupation', 'inactivateReason', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'});
    } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true);     }),
    ]);
   //return Promise.resolve(true);
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
