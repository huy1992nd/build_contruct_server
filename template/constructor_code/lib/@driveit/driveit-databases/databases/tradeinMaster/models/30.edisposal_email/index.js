const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
const StatusEnum = require('../enums/Status');
const Utils = require('../../../../utils/database.utils');

const tableName = "edisposal_email";
const modelName = "edisposal_email";
const Op = Sequelize.Op;

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Edisposal_email extends Sequelize.Model {


    static associate(models) {
        this.myAssociation = this.belongsTo(models.uv_route, {
            foreignKey: 'uvRouteId',
            targetKey: 'id'
        });
    }
    //schema
    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where
        }, transaction);
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
        }, transaction);
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

}