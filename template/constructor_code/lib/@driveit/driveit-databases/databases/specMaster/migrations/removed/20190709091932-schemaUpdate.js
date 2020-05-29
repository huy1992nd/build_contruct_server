'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
    'vehicle',
    'lastMileage', {
      type: Sequelize.INTEGER,
      onUpdate: 'cascade',
      onDelete: 'SET NULL'
    }
  )
  },

  down: (queryInterface, Sequelize) => {
  }
};
