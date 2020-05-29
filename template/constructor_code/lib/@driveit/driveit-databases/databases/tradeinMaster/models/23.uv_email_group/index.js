const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');
const uv_route = require('../22.uv_route');
const uv_email_list = require('../24.uv_email_list');

const tableName = "uv_email_group";
const modelName = "uv_email_group";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Uv_email_group extends Sequelize.Model {

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
        /* this.myAssociation = this.belongsTo(models.uv_route, {
            foreignKey: 'routeCode',
            targetKey: 'code'
        }); */

        this.myAssociation = this.belongsTo(models.uv_route, {
            foreignKey: 'routeCode',
            targetKey: 'code',
            constraints: false
        });
       /*  this.myAssociation = this.hasOne(models.uv_route, {
            sourceKey: "routeCode",
            foreignKey: 'code',
            constraints: false,
        }); */
        this.myAssociation = this.hasMany(models.uv_email_list, {
            foreignKey: 'roleCode',
            sourceKey: 'roleCode',
            constraints: false
        });
    }

    static searchAll(likeArr = [], attribute = [], pagination, orderBy, filterArr = []) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {
                    [Op.like]: likeArrItem.text
                };
                prepQry.push(qry);
            });
            where = {
                [Op.or]: prepQry
            };
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

    static getEmailTo(where) {
        return this.findAll({
            where: where['uv_email_group'],
            include: [{
                model: uv_route,
                attributes: ['code'],
                foreignKey: 'code',
                where: where['uv_route'],
            }, {
                model: uv_email_list,
                required: false,
                attributes: ['email', 'id', 'roleCode'],
                foreignKey: 'roleCode',
                where: where['uv_email_list']
            }]
        })
    }
}