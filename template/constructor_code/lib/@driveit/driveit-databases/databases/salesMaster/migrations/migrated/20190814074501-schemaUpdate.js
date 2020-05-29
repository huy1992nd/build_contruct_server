'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'leadSource', // name of Source model
      'leadSourceGroup' // key we want to remove
    );
    // return queryInterface.addColumn(
    //   'leadSource', // name of Source model
    //   'leadSourceGroupId', // name of the key we're adding 
    //   {
    //     type: Sequelize.UUID,
    //     references: {
    //       model: 'LeadSourceGroup', // name of Target model
    //       key: 'id', // key in Target model that we're referencing
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'SET NULL',
    //   }
    // );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'leadSource', // name of Source model
      'leadSourceGroup' // key we want to remove
    );
  }
};