const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "billing";
const modelName = "billing";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const RepairOrderModel = require('../07.repairOrder')

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Billing extends Sequelize.Model {

    //schema
    static init(sequelize, DataTypes, databaseName) {
        return super.init(schema(DataTypes), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }

    //associations
    static associate(models) {
        this.myAssociation = this.belongsTo(models.Payment, { 
            foreignKey: 'paymentId', 
            targetKey: 'id' 
        });
    }

    //methods
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

    static getRecordsRaw(billTos, branchIds, roStatus, offset, limit) {

        return this.sequelize.query(`
        SELECT 
        billing.*,
        ro.id AS 'repairOrder.id',
        ro.refNo AS 'repairOrder.refNo',
        ro.branchId AS 'repairOrder.branchId',
        ro.roStatus AS 'repairOrder.roStatus',
        ro.currencyId AS 'repairOrder.currencyId',
        (SELECT 
            COUNT(*)
        FROM
            service_master.billing AS billing
                INNER JOIN
            service_master.repairOrder AS ro ON billing.roId = ro.refNo
        WHERE
            billing.billTo = ?
                AND ro.branchId IN (?)
                AND ro.roStatus NOT IN (?)) AS 'total_count'
        FROM
            service_master.billing AS billing
                INNER JOIN
            service_master.repairOrder AS ro ON billing.roId = ro.refNo
        WHERE
            billing.billTo = ?
                AND ro.branchId IN (?)
                AND ro.roStatus NOT IN (?)
        LIMIT ? , ?;
        `, {
            replacements: [...billTos, ...branchIds, roStatus,...billTos, ...branchIds, roStatus, offset, limit], 
            type: this.sequelize.QueryTypes.SELECT,
            nest: true
        })
    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = { [Op.like]: likeArrItem.text };
                prepQry.push(qry);
            });
            where = { [Op.or]: prepQry };
        }

        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        let include = [];
        if (!skipInclude) {
            include = [];
        }

        let searchAllObj = {
            where: {
                ...where
            },
            include,
            ...pagination,
            order: [orderBy]
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
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


}