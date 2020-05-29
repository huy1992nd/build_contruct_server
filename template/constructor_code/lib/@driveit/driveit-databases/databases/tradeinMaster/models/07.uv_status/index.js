const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');

const tableName = "uv_status";
const modelName = "uv_status";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Uv_status extends Sequelize.Model {

        //schema
        static init(sequelize, databaseName) {
            return super.init(schema(), {
                tableName,
                modelName,
                schema: databaseName,
                sequelize
            });
        }
    
        static searchAll(likeArr = [], attribute = [], pagination, orderBy, filterArr = []) {
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
                    ...where,
                    deleted: {
                        [Op.not]: true
                    }
                },
                attributes: attribute,
                ...pagination,
                order: [orderBy]
            });
        }

        static getAll(where =[], attribute = []) {
            let status = {};
            status['status'] = { [Op.not]: StatusEnum.DELETED};
            return this.findAll({
               where : {...where, 
                    [Op.and]:status},
                order: [
                    ["createdAt", "DESC"]
                ],
                attributes: attribute
            });
        }

        static getOne(where =[], attribute = []) {
            let status = {};
            status['status'] = { [Op.not]: StatusEnum.DELETED};
            return this.findOne({
               where : {...where, 
                    [Op.and]:status},
                order: [
                    ["createdAt", "DESC"]
                ],
                attributes: attribute
            });
        }
}