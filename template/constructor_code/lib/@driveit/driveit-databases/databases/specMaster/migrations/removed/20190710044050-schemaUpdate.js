'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.addColumn('product', "packageId",  {
        type: Sequelize.UUID,
        onUpdate: 'cascade',
        onDelete: 'SET NULL'
      }).then(() => {
        return queryInterface.sequelize.query("ALTER TABLE product ADD CONSTRAINT product_packageId_fkey FOREIGN KEY (packageId) REFERENCES package (id);")
      });
    
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
