const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "repairOrderFlatRate";
const modelName = "repairOrderFlatRate";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class RepairOrderFlatRate extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.RepairOrder, {
            foreignKey: 'repairOrderId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.BayMaster, {
            foreignKey: 'bayMasterId',            
        });
        this.myAssociation = this.belongsTo(models.Jobs, {
            foreignKey: 'jobsId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.JobClass, {
            foreignKey: 'jobClassId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.JobType, {
            foreignKey: 'jobTypeId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.ServicePackage, {
            foreignKey: 'servicePackageId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.SubletCode, {
            foreignKey: 'subletCodeId',
            targetKey: 'id'
        });
        /*  this.myAssociation = this.belongsTo(models.ChargeType, {
             foreignKey: 'chargeTypeId',
             targetKey: 'id'
         }); */
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

    static addRecord(record, transaction = null) {
        
            return this.create(record, {
                returning: true
            }, transaction);;
    }

    static updateRecord(record, where, transaction = null) {
        
            return this.update(record, {
                where,
                isNewRecord: false
            }, transaction);;
    }

    static deleteRecord(where, transaction = null) {
        
            return this.destroy({
                where: where
            }, transaction);;
    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
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

    static updateRow(data, condition) {
        return this.update(data, condition);
    }

    static async getWorkingHoursForDay(startDate, endDate, branchId) {
        //get jobTypeId of INNTERNAL
        let foundIds = await this.getJobTypeId('INT');
        let id = (foundIds.length > 0) ? foundIds[0].id : '';
        return this.sequelize.query(`
            SELECT sum(job.hours) as totalHours, DATE_FORMAT(ro.roCreationDate,'%d/%m/%Y') as date, DAYNAME(ro.roCreationDate) as day FROM service_master.repairOrderFlatRate AS job
            INNER JOIN service_master.repairOrder AS ro ON ro.id = job.repairOrderId
            WHERE ro.roCreationDate 
            BETWEEN ? AND ? 
            AND ro.branchId = ?
            AND job.jobTypeId = ?
            GROUP BY DATE(ro.roCreationDate);`, { 
            replacements: [startDate, endDate, branchId, id], type: this.sequelize.QueryTypes.SELECT
        })
    }

    static async getJobTypeId(code) {
        return this.sequelize.query(`SELECT id FROM service_master.jobType where code = ?;`, {
            replacements: [code], type: this.sequelize.QueryTypes.SELECT
        });
    }
}