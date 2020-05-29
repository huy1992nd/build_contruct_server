
'use strict'

require('array.prototype.flatmap').shim()
const audit = require('./audit-log');
const _ = require('lodash');
exports.hookAfterEvent = async (event, databaseName, informsOrigin, option, excludeTable) => {
    try {
        let informs = _.cloneDeep(informsOrigin);
        let tableName = null;
        let data = [];
        switch (event) {
            case 'afterBulkUpdate':
                tableName = informs.model.name;
                if (informs.where.id) {
                    informs.where.idUpdated = informs.where.id;
                    delete informs.where.id;
                }
                if (informs && informs.attributes && informs.attributes.deleted) {
                    event = 'delete';
                }
                // let whereCondition = JSON.stringify(informs.where);
                data.push({ ...informs.attributes, whereCondition: informs.where });
                break;
            case 'afterUpdate':
                // data = [];
                tableName = informs._modelOptions.tableName;
                data.push(informs.dataValues);
                break;
            case 'afterCreate':
                // data = [];
                tableName = informs._modelOptions.tableName;
                // data = informs.dataValues;
                data.push(informs.dataValues);
                break;
            case 'afterBulkCreate':
                tableName = option.model.name;
                // data = [];
                if (informs && informs.length > 0) {
                    for (let inform of informs) {
                        data.push(inform.dataValues);
                    }
                }
                break;
            case 'afterBulkDestroy':
                tableName = informs.model.name;
                data.push({ where: informs.where });
                break;

            default:
                break;
        }
        const checkTable = 
        excludeTable.includes(tableName.toLowerCase());
        if (!checkTable) {
            let userName, userEmail = '';
            if (data.length && data[0].updatedBy) 
            {
                let user = await audit.getInformUserById(data[0].updatedBy);
                if (user) {
                    userName = user.fullName;
                    userEmail = user.email;
                }
            }

            let objLog = { databaseName: databaseName, tableName: tableName, eventName: event, data: data, dateTime: new Date(), userName: userName, userEmail: userEmail };
            // console.log(objLog);
            // TODO: sent message to ElasticSearch.
            audit.audit_log([objLog]);
        }
    } catch (ex) {
        // cache exception if has any problem with hook after.
        console.error(ex);
    }


}