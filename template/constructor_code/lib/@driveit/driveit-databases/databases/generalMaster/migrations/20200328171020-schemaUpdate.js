'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      /** NEED TO MANUALLY ADD CONSTRAINT in Staging */
      /** change charset collation to utf8, utf8_bin for Column materialId */

      // queryInterface.addConstraint('materialStorage', ['materialId'], {
      //   type: 'foreign key',
      //   references: {
      //     table: 'materialMasterBasicinfo',
      //     field: 'id'
      //   },
      //   onDelete: 'SET NULL',
      //   onUpdate: 'cascade'
      // })
    ]);
    
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
