'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
     // queryInterface.renameColumn('plantDivision','divisionId', 'businessStreamId'),
      queryInterface.changeColumn(
        'plantDivision',
        'businessStreamId',
        {
          type: Sequelize.UUID,
        }
       ),
       queryInterface.sequelize.query("ALTER TABLE plantDivision ADD CONSTRAINT plantDivision_businessStreamId_fkey FOREIGN KEY (businessStreamId) REFERENCES businessStream (id);")
    ])
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
