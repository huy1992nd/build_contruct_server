const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');

const tableName = "uv_purpose";
const modelName = "uv_purpose";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Uv_purpose extends Sequelize.Model {

        //schema
        static init(sequelize, databaseName) {
            return super.init(schema(), {
                tableName,
                modelName,
                schema: databaseName,
                sequelize
            });
        }
    
        static getAll(where, attribute = []) {
            let status = {};
            status['status'] = { [Op.not]: StatusEnum.DELETED};
            return this.findAll({
               where : {...where, 
                    [Op.and]:status},
                    where,
                order: [
                    ["createdAt", "DESC"]
                ],
                attributes: attribute
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
                ...pagination,
                attributes: attribute,
                order: [orderBy]
            });
        }


        static getId(where) {
            let status = {};
            status['deleted'] = { [Op.not]: true};
            return this.findOne({
                where : {
                    ...where, 
                    [Op.and]:status
                },
                //attributes: ["id"],
                order: [
                    ["createdAt", "DESC"]
                ]
            });
        }
}