const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "timeRecordingEventTypeVGroup";
const modelName = "timeRecordingEventTypeVGroup";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const TimeRecordingEventType = require('../23.timeRecordingEventType');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class TimeRecordingEventTypeVGroup extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.TimeRecordingEventType, {
            foreignKey: 'timeRecordingEventTypeId'
        });
        this.myAssociation = this.belongsTo(models.TimeRecordingEventTypeGroup, {
            foreignKey: 'timeRecordingEventTypeGroupId'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{
                model: TimeRecordingEventType
            }]
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
            include: [{
                model: TimeRecordingEventType
            }]
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            include: [{
                model: TimeRecordingEventType
            }],
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
                { model: TimeRecordingEventType }
            ];
        }

        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
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
        // return  this.build(all, {isNewRecord: false}).save();
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