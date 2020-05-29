const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "timeRecording";
const modelName = "timeRecording";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const ActivityCostType = require('../18.activityCostType');
const TimeRecordingTerminal = require('../26.timeRecordingTerminal');
const RepairOrder = require('../07.repairOrder');
const RepairOrderFlatRate = require('../11.repairOrderFlatRate');
const TimeRecordingEventType = require('../23.timeRecordingEventType');
const BayMaster = require('../42.bayMaster');
const Jobs = require('../16.jobs');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class TimeRecording extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.ActivityCostType, {
            foreignKey: 'activityCostTypeId'
        });
        this.myAssociation = this.belongsTo(models.TimeRecordingTerminal, {
            foreignKey: 'timeRecordingTerminalId'
        });
        this.myAssociation = this.belongsTo(models.RepairOrder, {
            foreignKey: 'repairOrderId'
        });
        this.myAssociation = this.belongsTo(models.RepairOrderFlatRate, {
            foreignKey: 'repairOrderFlatRateId'
        });
        this.myAssociation = this.belongsTo(models.TimeRecordingEventType, {
            foreignKey: 'timeRecordingEventTypeId'
        });
        this.myAssociation = this.belongsTo(models.BayMaster, {
            foreignKey: 'bayMasterId'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{
                model: ActivityCostType
            }, {
                model: TimeRecordingTerminal
            }, {
                model: RepairOrder
            }, {
                model: RepairOrderFlatRate,
                include: [{ model: Jobs }]
            }, {
                model: TimeRecordingEventType
            }, {
                model: BayMaster
            }]
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
            include: [{
                model: ActivityCostType
            }, {
                model: TimeRecordingTerminal
            }, {
                model: RepairOrder
            }, {
                model: RepairOrderFlatRate,
                include: [{ model: Jobs }]
            }, {
                model: TimeRecordingEventType
            }, {
                model: BayMaster
            }]
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null, group = null) {

        return this.findAndCountAll({
            where,
            include: [{
                model: ActivityCostType
            }, {
                model: TimeRecordingTerminal
            }, {
                model: RepairOrder
            }, {
                model: RepairOrderFlatRate,
                include: [{ model: Jobs }]
            }, {
                model: TimeRecordingEventType
            }, {
                model: BayMaster
            }],
            group: group,
            ...pagination,
            order: [orderBy],
            attributes: group ? [
                'id',
                'internalUserId',
                'status',
                'deleted',
                'inactivateReason',
                'createdBy',
                'updatedBy',
                'createdAt',
                'updatedAt',
                'activityCostTypeId',
                'timeRecordingTerminalId',
                'repairOrderId',
                'repairOrderFlatRateId',
                'timeRecordingEventTypeId',
                'bayMasterId'
                [sequelize.fn('MAX', sequelize.col('dateTimeStamp')), 'dateTimeStamp'],
            ] : null,
        }, transaction);
    }

    static getRecords2(pagination, orderBy, where, transaction = null, group = null) {

        return this.findAndCountAll({
            where,
            include: [{
                model: ActivityCostType
            }, {
                model: TimeRecordingTerminal
            }, {
                model: RepairOrder
            }, {
                model: RepairOrderFlatRate,
                include: [{ model: Jobs }]
            }, {
                model: TimeRecordingEventType
            }, {
                model: BayMaster
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
                { model: ActivityCostType },
                { model: TimeRecordingTerminal },
                { model: RepairOrder },
                { model: RepairOrderFlatRate, include: [{ model: Jobs }] },
                { model: TimeRecordingEventType },
                { model: BayMaster }
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

    static addNew(obj, transaction) {
        return this.create(
            obj
            , {
                returning: true,
                transaction: transaction
            });
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