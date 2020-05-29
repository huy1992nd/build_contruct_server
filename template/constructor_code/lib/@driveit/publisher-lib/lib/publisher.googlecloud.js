"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const publisher_config_1 = require("./publisher.config");
class ModelWithPublisher extends sequelize.Model {
    static create(values, options) {
        return super.create(values, Object.assign(Object.assign({}, options), { returning: true })).then((data) => {
            if (data) {
                //Send to publisher 
                const pubData = {
                    database: data._modelOptions.sequelize.config.database,
                    table: super.getTableName().tableName,
                    action: 'insert',
                    data: [data],
                };
                publishData(pubData.database, pubData);
            }
            return data;
        });
    }
    static update(values, options) {
        return this.findAll(options).then((beforeData) => {
            // @ts-ignore
            return super.update(values, options).then((data) => {
                const ids = beforeData.map((each) => each.id);
                //get data
                const where = {
                    id: {
                        [sequelize.Op.in]: ids
                    }
                };
                this.findAll({
                    where
                }).then((changedData) => {
                    //send to pub
                    if (changedData && changedData.length > 0) {
                        const pubData = {
                            database: (beforeData && beforeData.length > 0) ? beforeData[0]._modelOptions.sequelize.config.database : null,
                            table: super.getTableName().tableName,
                            action: 'update',
                            data: changedData,
                        };
                        publishData(pubData.database, pubData);
                    }
                });
                return data;
            });
        });
    }
    static destroy(options) {
        return this.findAll(options).then((beforeData) => {
            return super.destroy(options).then((data) => {
                if (data && data > 0) {
                    const pubData = {
                        database: (beforeData && beforeData.length > 0) ? beforeData[0]._modelOptions.sequelize.config.database : null,
                        table: super.getTableName().tableName,
                        action: 'delete',
                        data: beforeData,
                    };
                    publishData(pubData.database, pubData);
                }
                return data;
            });
        });
    }
    static bulkCreate(dataArr, options = {}) {
        // @ts-ignore
        return super.bulkCreate(dataArr, Object.assign(Object.assign({}, options), { returning: true })).then((data) => {
            if (data && data.length > 0) {
                const pubData = {
                    database: (data && data.length > 0) ? data[0]._modelOptions.sequelize.config.database : null,
                    table: super.getTableName().tableName,
                    action: 'insert',
                    data: data,
                };
                publishData(pubData.database, pubData);
            }
            return data;
        });
    }
}
exports.ModelWithPublisher = ModelWithPublisher;
function publishData(database, data) {
    console.log("Pub data:", data);
    let topic = publisher_config_1.topics[database];
    if (!topic) {
        console.warn("Publisher topic is invalid. Please check config on publisher.topic");
        return;
    }
    const dataBuffer = Buffer.from(JSON.stringify(data));
    publisher_config_1.publisher.topic(topic).publish(dataBuffer).then((messageId) => {
        console.info("Publisher successfull with message id: ", messageId);
    }).catch((reason) => {
        console.error("Publisher failed with error: ", reason);
    });
}
exports.publishData = publishData;
