const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "toolsAndEquipments";
const modelName = "toolsAndEquipments";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const ToolsAndEquipmentsAttachments = require('../../models/77.toolsAndEquipmentsAttachments');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class ToolsAndEquipments extends Sequelize.Model {

    static init(sequelize, DataTypes, databaseName) {
        return super.init(schema(DataTypes), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }

    static associate(models) {
        this.myAssociation = this.hasMany(models.ToolsAndEquipmentsAttachments, {
            foreignKey: 'toolsAndEquipmentsId'
        });
    }

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
        let include = [
            {
                model: ToolsAndEquipmentsAttachments
            }
        ];
        return this.findAndCountAll({
            where,
            include,
            distinct: true,
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
            include = [
                { model: ToolsAndEquipmentsAttachments }
            ];
        }

        let searchAllObj = {
            where: {
                ...where
            },
            include,
            distinct: true,
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

    static async addMany(datas, who) {
        let promises = [];
        for (let t = 0; t < datas.length; t++) {
            let data = datas[t];
            promises.push(EvoucherJobsParts.add(data, who).catch((error) => {
                return errorDef.compileError(error);
            }));
        }
        return Promise.all(promises);
    }

    static async add(data, who) {
        const record = {
            ...data,
            updatedBy: who,
            createdBy: who
        }
        return EvoucherJobsParts.addRecord(record);
    }
}