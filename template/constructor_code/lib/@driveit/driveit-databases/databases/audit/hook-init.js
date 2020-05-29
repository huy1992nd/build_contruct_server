
'use strict'

const hookAfter = require('./hook-after');

exports.initHookEvent = (sequelize, excludeTable) =>{
  try{
    let hookEventAfters = ['afterDestroy', 'afterUpdate', 'afterBulkDestroy', 'afterBulkUpdate', 'afterCreate', 'afterBulkCreate'];
    let databaseName = sequelize.config.database;
    hookEventAfters.forEach(event => {
        // let databaseName = sequelize.config.database;
        sequelize.addHook(event, function (informs, option) {
          hookAfter.hookAfterEvent(event, databaseName, informs, option, excludeTable);
    
        });
    });
    return sequelize;
  }catch(ex){
    console.log(ex);
  }
    
}