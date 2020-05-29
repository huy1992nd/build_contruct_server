const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "workSchedule";
const modelName = "workSchedule";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class WorkSchedule extends Sequelize.Model {

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
        // this.myAssociation = this.belongsTo(models.ActivityLeaveType, {
        //     foreignKey: 'activityLeaveTypeId'
        // });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where,
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


    static getWeeklyWrokingCapacity(branchId, employeePosition) {
        return this.sequelize.query(`
        SELECT SUM(mon) as Monday,SUM(tue) as Tuesday,SUM(wed) as Wednesday,SUM(thu) as Thursday,SUM(fri) as Friday,SUM(sat) as Saturday,SUM(sun) as Sunday 
        FROM (SELECT internal_users.fullname, internal_users.id,internal_users.employeeId,
            HOUR(TIMEDIFF(TIMEDIFF(monWorkTo, monWorkFrom),TIMEDIFF(monBreakTo, monBreakFrom))) as mon,
            HOUR(TIMEDIFF(TIMEDIFF(tueWorkTo, tueWorkFrom),TIMEDIFF(tueBreakTo, tueBreakFrom))) as tue,
            HOUR(TIMEDIFF(TIMEDIFF(wedWorkTo, wedWorkFrom),TIMEDIFF(wedBreakTo, wedBreakFrom))) as wed,
            HOUR(TIMEDIFF(TIMEDIFF(thuWorkTo, thuWorkFrom),TIMEDIFF(thuBreakTo, thuBreakFrom))) as thu,
            HOUR(TIMEDIFF(TIMEDIFF(friWorkTo, friWorkFrom),TIMEDIFF(friBreakTo, friBreakFrom))) as fri,
            HOUR(TIMEDIFF(TIMEDIFF(satWorkTo, satWorkFrom),TIMEDIFF(satBreakTo, satBreakFrom))) as sat,
            HOUR(TIMEDIFF(TIMEDIFF(sunWorkTo, sunWorkFrom),TIMEDIFF(sunBreakTo, sunBreakFrom))) as sun
            from service_master.workSchedule AS workSchedule
            INNER JOIN auth.internal_users AS internal_users ON internal_users.id = workSchedule.employeeId 
                AND internal_users.isEmployee = 1
            INNER JOIN auth.employeePosition AS employeePosition ON employeePosition.id = internal_users.employeePositionId 
                AND employeePosition.name = ?
            where service_master.workSchedule.branchId = ?)
        AS temp;`, {
            replacements: [employeePosition, branchId], type: this.sequelize.QueryTypes.SELECT
        })
    }
}