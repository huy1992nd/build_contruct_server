'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   /** seed initial values */
    return queryInterface.bulkInsert('miscCharges', [
      { "id": uuidv4(), "code":"HNDPLT", "name": "H & D Plate", "createdBy": 'System', "updatedBy": 'System', "createdAt": new Date(), "updatedAt": new Date()},
      { "id": uuidv4(), "code":"ITCFEE", "name": "Interchange Fee/Road Tax", "createdBy": 'System', "updatedBy": 'System', "createdAt": new Date(), "updatedAt": new Date()},
      { "id": uuidv4(), "code":"JKRINSP", "name": "JKR - Inspection Fee", "createdBy": 'System', "updatedBy": 'System', "createdAt": new Date(), "updatedAt": new Date()},
      { "id": uuidv4(), "code":"WIH2", "name": "Service Fee - Tender/Interchange", "createdBy": 'System', "updatedBy": 'System', "createdAt": new Date(), "updatedAt": new Date()},
      { "id": uuidv4(), "code":"TNDRNO", "name": "Tender No", "createdBy": 'System', "updatedBy": 'System', "createdAt": new Date(), "updatedAt": new Date()},
      { "id": uuidv4(), "code":"TRFFEE", "name": "Transfer Fee", "createdBy": 'System', "updatedBy": 'System', "createdAt": new Date(), "updatedAt": new Date()},
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
