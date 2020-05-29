'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'customerVehicleRelation', // name of Source model
      'vehicleModelId', // name of the key we're adding 
      {
        type: Sequelize.UUID,
        references: {
          model: 'vehicleModel', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'customerVehicleRelation', // name of Source model
      'vehicleModelId' // key we want to remove
    );
  }
};
