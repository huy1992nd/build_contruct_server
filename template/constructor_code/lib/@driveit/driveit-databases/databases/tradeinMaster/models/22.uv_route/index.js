const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const uv_email_config = require('../25.uv_email_config');

const tableName = "uv_route";
const modelName = "uv_route";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Uv_route extends Sequelize.Model {

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
            this.myAssociation=this.hasMany(models.uv_email_group,{
                foreignKey:'routeCode',
                sourceKey:'code',
                constraints: false,
            })

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

        static getOne(where, transaction = null) {
            return this.findOne({
                where
            }, transaction);
        }

        static getEmailConfig(where, foreginkey) {
            return this.findAll({
                where,
                include: [{
                    required: false,
                    model: uv_email_config,
                    as: foreginkey,
                    attributes: ["emailSentType", "mailfrom", "mailto", "subjectformat", "bodyformat", "sendGridApiKey",
                        "emailhost", "emailport", "emailsecure", "credentialusername", "credentialpassword"
                    ]
                }]
            });
        }
}