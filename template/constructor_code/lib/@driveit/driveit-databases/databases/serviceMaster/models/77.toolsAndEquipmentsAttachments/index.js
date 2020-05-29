const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');
// const roAttachment = require('../45.roUploadAttachment');

const tableName = "toolsAndEquipmentsAttachment";
const modelName = "toolsAndEquipmentsAttachment";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class ToolsAndEquipmentsAttachment extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.ToolsAndEquipments, {
            foreignKey: 'toolsAndEquipmentsId',
            targetKey: 'id'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            // include: [{
            //     model: roAttachment
            // }]
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
            // include: [{
            //     model: roAttachment
            // }]
        }, transaction);
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
        }, transaction);
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
                ...where,
                deleted: {
                    [Op.not]: true
                }
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

    static addNew(obj, transaction) {
        return this.create(
            obj
            , {
                returning: true,
                transaction: transaction
            });
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