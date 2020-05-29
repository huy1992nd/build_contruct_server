const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const uv_price_item = require('../05.uv_price_item');
const uv_price_channel = require('../06.uv_price_channel');
const uv_route = require('../22.uv_route');

const tableName = "edisposal_proposal";
const modelName = "edisposal_proposal";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Edisposal_proposal extends Sequelize.Model {

        //schema
        static init(sequelize, databaseName) {
            return super.init(schema(), {
                tableName,
                modelName,
                schema: databaseName,
                sequelize
            });
        }

        static associate(models) {
/*             this.myAssociation = this.hasOne(uv_route, {
                foreignKey: 'id',
                sourceKey: 'uvRouteId'
            }); */
            this.myAssociation = this.belongsTo(models.uv_route, {
                foreignKey: 'uvRouteId',
                targetKey: 'id'
            });
            this.myAssociation = this.belongsTo(models.uv_route, {
                foreignKey: 'routeCode',
                targetKey: 'code',
                constraints: false,
            });
            this.myAssociation = this.belongsTo(models.uv_price_item,{
                foreignKey: 'prcItemId',
                targetKey: 'id'
            });
            this.myAssociation = this.belongsTo(models.uv_file_upload, {
                foreignKey: 'fileId',
                targetKey: 'id'
            });
        }

        static searchAll(likeArr = [], attribute = [], pagination, orderBy, filterArr = []) 
        {
            let prepQry = [];
            let where = {};
            if(likeArr.length>0) {
                _.forEach(likeArr, (likeArrItem) => {
                    let qry = {};
                    qry[likeArrItem.colId] = {[Op.like]: likeArrItem.text};
                    prepQry.push(qry);
                });
                where = {[Op.or]: prepQry};
            }
            
            let arrFilter = Utils.filterGenerator(filterArr);
            
            if (arrFilter.length > 0) {
                _.forEach(arrFilter, (val) => {
                    _.forEach(val, (v, k) => {
                        where[k] = v;
                    });
                });
            }
    
            return this.findAndCountAll({
                where: {
                    ...where
                },
                include: [
                {
                    model: uv_price_item,
                    attributes: ["id", "code", "name","prcChannelCode"],
                    required: true,
                    where: {
                        deleted: {
                            [Op.not]: true
                        }
                    }, include: [
                    {
                        model: uv_price_channel,
                        attributes: ["id", "code", "name"],
                        required: true,
                        where: {
                            deleted: {
                                [Op.not]: true
                            }
                        }
                    }]
                },
                {
                    model: uv_route,
                    attributes: ["id", "code", "name"],
                    required: true,
                    where: {
                        deleted: {
                            [Op.not]: true
                        }
                    }
                }],
                ...pagination,
                order: [orderBy]
            })
            .then(disposalchannel => {
                const resObj = _.map(disposalchannel.rows, (dp) => { 
                    return Object.assign({
                        id: dp.id,
                        edisposalId: dp.edisposalId,
                        edCycleId: dp.edCycleId,
                        inputType: dp.inputType,
                        uvRouteId: dp.uv_route.id,
                        routeCode: dp.uv_route.code,
                        seq: this.updateValueForDisposalChannelSeq(dp.uv_route.code),
                        value: this.updateValueForDisposalChannel(dp.inputType, dp),
                        prcItemId: dp.prcItemId,
                        prcItemCode: dp.uv_price_item.code,
                        prcItemName: dp.uv_price_item.name,
                        uvchannel: dp.uv_price_item.prcChannelCode,
                        uv_price_channel: dp.uv_price_item.uv_price_channel
                    });
                });
                return {rows: resObj};
            });
        }

        static addRecord(record, transaction = null) {
            return this.create(record, {
                returning: true
            }, transaction);
    
        }
    
        static updateRecord(record, where, transaction = null) {
            return this.update(record, {
                where,
                isNewRecord: false
            }, transaction);
        }

        static updateValueForDisposalChannel(inputType, dataItem) {
            let value = null;
            switch (inputType) {
                case "text":
                    value = dataItem.valtext;
                break;
                case "numeric":
                    value = dataItem.valdecimal;
                break;
                case "date":
                    value = dataItem.valdate;
                break;
                case "bool":
                    value = dataItem.valbool;
                break;
            }
    
            return value;
        }

        static updateValueForDisposalChannelSeq(routecode) {
            let value = null;
            switch (routecode) {
                case "01":
                    value = 1;
                break;
                case "02":
                    value = 2;
                break;
                case "04":
                    value = 4;
                break;
            }
    
            return value;
        }
        static getAll(where, transaction = null) {
            return this.findAll({
                where
            }, transaction);
        }
}