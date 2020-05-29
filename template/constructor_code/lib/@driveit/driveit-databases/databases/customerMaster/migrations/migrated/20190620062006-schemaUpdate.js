'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return Promise.all ([
    queryInterface.removeConstraint('companyPlant', 'companyPlant_ibfk_1'),
    queryInterface.renameColumn(
      'companyPlant',
      'plantId',
      'branchId'
     ),
    queryInterface.changeColumn(
      'companyPlant',
      'branchId',
      {
        type: Sequelize.UUID,
      }
     ),
     queryInterface.sequelize.query("ALTER TABLE companyPlant ADD CONSTRAINT companyPlant_branchId_fkey FOREIGN KEY (branchId) REFERENCES branch (id);")
     ,
     queryInterface.renameColumn(
      'plantDivision',
      'plantId',
      'branchId'
     ),
    queryInterface.changeColumn(
      'plantDivision',
      'branchId',
      {
        type: Sequelize.UUID,
      }
     ),
    queryInterface.sequelize.query("ALTER TABLE plantDivision ADD CONSTRAINT plantDivision_branchId_fkey FOREIGN KEY (branchId) REFERENCES branch (id);"),
    queryInterface.removeConstraint('plantStorageLocation', 'plantStorageLocation_ibfk_1'),
     queryInterface.renameColumn(
      'plantStorageLocation',
      'plantId',
      'branchId'
     ),
     queryInterface.changeColumn(
       'plantStorageLocation',
       'branchId',
      {
         type: Sequelize.UUID,
       }
     ),
    queryInterface.sequelize.query("ALTER TABLE plantStorageLocation ADD CONSTRAINT plantStorageLocation_branchId_fkey FOREIGN KEY (branchId) REFERENCES branch (id);")

     ]);
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
