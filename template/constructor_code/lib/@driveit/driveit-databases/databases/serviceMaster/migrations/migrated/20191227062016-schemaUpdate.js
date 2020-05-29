'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('warrantyIncident', 'warrantyApprovalId'),
      queryInterface.removeColumn('warrantyIncident', 'millage'),
      queryInterface.removeColumn('warrantyIncident', 'defectMaterialName')
    ]).catch(error => {
      console.error('ERROR migration warrantyIncident: ', error);
    });
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
