const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const uv_route = require('../22.uv_route');
const uv_expenses = require('../26.uv_expenses');
const tableName = "edisposal_expenses";
const modelName = "edisposal_expenses";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Edisposal_expenses extends Sequelize.Model {

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
            this.myAssociation = this.belongsTo(models.uv_route, {
                foreignKey: 'uvRouteId',
                targetKey: 'id'
            });
            this.myAssociation = this.belongsTo(models.uv_route, {
                foreignKey: 'routeCode',
                targetKey: 'code',
                constraints: false,
                as: "uvRouteByCode"
            });
            this.myAssociation = this.belongsTo(models.uv_expenses, {
                foreignKey: 'expensesId',
                targetKey: 'id'
            });
            /* this.myAssociation = this.hasOne(uv_expenses, {
                foreignKey: 'id',
                sourceKey: 'expensesId'
            }); */
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
                    model: uv_expenses,
                    attributes: ["id", "name"],
                    required: false
                },
                {
                    model: uv_route,
                    attributes: ["id", "code", "name"],
                    required: false
                }],
                ...pagination,
                order: [orderBy]
            })
            .then(disposalexpenses => {
                const resObj = _.map(disposalexpenses.rows, (dp) => { 
                    return Object.assign({
                        id: dp.id,
                        edisposalId: dp.edisposalId,
                        edCycleId: dp.edCycleId,
                        uvRouteId: dp.uv_route.id,
                        routeCode: dp.uv_route.code,
                        channelseq: this.updateValueForDisposalChannelSeq(dp.uv_route.code),
                        itemseq: dp.seqNo,
                        value: dp.amount,
                        prcItemId: dp.expensesId,
                        prcItemName: dp.name,

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

        
        static deleteRecord(where, transaction = null) {
            return this.destroy({
                where: where
            }, transaction);
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
}