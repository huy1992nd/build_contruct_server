const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "warrantyIncident";
const modelName = "warrantyIncident";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const warrantyIncidentJobsModel = require('../55.warrantyIncidentJobs');
const warrantyIncidentPartsModel = require('../56.warrantyIncidentParts');
const Jobs = require('../16.jobs');
const JobClass = require('../06.jobClass');
const JobType = require('../04.jobType');
const ServicePackage = require('../38.servicePackage');
const warrantyClaimTypeModel = require('../60.warrantyClaimType');
const warrantyClaimCategoryModel = require('../58.warrantyClaimCategory');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class WarrantyIncident extends Sequelize.Model {

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
        // this.myAssociation = this.hasMany(models.WarrantyIncidentJobs, {
        //     foreignKey: 'warrantyIncidentId'
        // });
        // this.myAssociation = this.hasMany(models.WarrantyIncidentParts, {
        //     foreignKey: 'warrantyIncidentId'
        // });
        this.myAssociation = this.belongsTo(models.RepairOrder, {
            foreignKey: 'repairOrderId'
        });
        this.myAssociation = this.belongsTo(models.WarrantyClaimType, {
            foreignKey: 'warrantyClaimTypeId'
        });
        this.myAssociation = this.belongsTo(models.WarrantyClaimCategory, {
            foreignKey: 'warrantyClaimCategoryId',
        });
        this.myAssociation = this.hasMany(models.WarrantyClaimHistoryStatus, {
            foreignKey: 'warrantyIncidentId',
        });
        this.myAssociation = this.belongsTo(models.SymptomCategory, {
            foreignKey: 'symptomCategoryId'
        });
        this.myAssociation = this.hasMany(models.WarrantyClaimIncident, {
            foreignKey: 'WarrantyIncidentId'
        });
        this.myAssociation = this.hasMany(models.WarrantyClaimAudit, {
            foreignKey: 'WarrantyIncidentId'
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
            where,
            include: [
                {
                    attributes: ['id', 'billTo', 'hours', 'discountAmount', 'discountPercent', 'taxAmount', 'unitAmount', 'amount', 'totalAmount', 'reassignedTechnicianId', 'vendorId', 'reassignedTechnicianName', 'workDate', 'startTime', 'endTime', 'chargeType', 'currencyId', 'resolvedStatus', 'remark', 'status', 'deleted', 'warrantyIncidentId', 'jobsId', 'jobClassId', 'jobTypeId', 'servicePackageId', 'type'],
                    model: warrantyIncidentJobsModel,
                    include: [
                        {
                            attributes: ['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId', 'poGeneration', 'jobGroupId', 'status', 'inactivateReason', 'deleted', 'jobClassId', 'jobTypeId', 'jobCatalogId', 'servicePackageId'],
                            model: Jobs
                        },
                        {
                            attributes: ['id', 'code', 'name', 'status', 'inactivateReason', 'deleted', 'qcbyforeman'],
                            model: JobClass
                        },
                        {
                            attributes: ['id', 'code', 'name', 'status', 'inactivateReason', 'deleted'],
                            model: JobType
                        },
                        {
                            attributes: ['id', 'code', 'name', 'companyId', 'branchId', 'makeId', 'businessStreamId', 'packageTypeId', 'externalKey', 'mileageFrom', 'mileageTo', 'validFrom', 'validTo', 'currencyId', 'changable', 'expressService', 'priceBy', 'totalLabour', 'totalParts', 'totalSublet', 'serviceTax', 'netPrice', 'status', 'inactivateReason', 'deleted'],
                            model: ServicePackage
                        }
                    ]
                },
                {
                    attributes: ['id', 'workshopStocks', 'quantity', 'billTo', 'discountAmount', 'discountPercent', 'taxAmount', 'taxAmount', 'totalAmount', 'unitAmount', 'materialMasterId', 'materialId', 'uomId', 'amount', 'chargeType', 'currencyId', 'resolvedStatus', 'status', 'deleted', 'warrantyIncidentId', 'jobsId', 'servicePackageId'],
                    model: warrantyIncidentPartsModel,
                    include: [{
                        attributes: ['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId', 'poGeneration', 'jobGroupId', 'status', 'inactivateReason', 'deleted', 'jobClassId', 'jobTypeId', 'jobCatalogId', 'servicePackageId'],
                        model: Jobs
                    },
                    {
                        attributes: ['id', 'code', 'name', 'companyId', 'branchId', 'makeId', 'businessStreamId', 'packageTypeId', 'externalKey', 'mileageFrom', 'mileageTo', 'validFrom', 'validTo', 'currencyId', 'changable', 'expressService', 'priceBy', 'totalLabour', 'totalParts', 'totalSublet', 'serviceTax', 'netPrice', 'status', 'inactivateReason', 'deleted'],
                        model: ServicePackage
                    }]
                },
                {
                    attributes: ['name'],
                    model: warrantyClaimTypeModel,
                },
                {
                    attributes: ['name'],
                    model: warrantyClaimCategoryModel,
                }
            ]
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
            include = [
                {
                    attributes: ['id', 'billTo', 'hours', 'discountAmount', 'discountPercent', 'taxAmount', 'unitAmount', 'amount', 'totalAmount', 'reassignedTechnicianId', 'vendorId', 'reassignedTechnicianName', 'workDate', 'startTime', 'endTime', 'chargeType', 'currencyId', 'resolvedStatus', 'remark', 'status', 'deleted', 'warrantyIncidentId', 'jobsId', 'jobClassId', 'jobTypeId', 'servicePackageId', , 'type'],
                    model: warrantyIncidentJobsModel,
                    include: [
                        {
                            attributes: ['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId', 'poGeneration', 'jobGroupId', 'status', 'inactivateReason', 'deleted', 'jobClassId', 'jobTypeId', 'jobCatalogId', 'servicePackageId'],
                            model: Jobs
                        },
                        {
                            attributes: ['id', 'code', 'name', 'status', 'inactivateReason', 'deleted', 'qcbyforeman'],
                            model: JobClass
                        },
                        {
                            attributes: ['id', 'code', 'name', 'status', 'inactivateReason', 'deleted'],
                            model: JobType
                        },
                        {
                            attributes: ['id', 'code', 'name', 'companyId', 'branchId', 'makeId', 'businessStreamId', 'packageTypeId', 'externalKey', 'mileageFrom', 'mileageTo', 'validFrom', 'validTo', 'currencyId', 'changable', 'expressService', 'priceBy', 'totalLabour', 'totalParts', 'totalSublet', 'serviceTax', 'netPrice', 'status', 'inactivateReason', 'deleted'],
                            model: ServicePackage
                        }
                    ]
                },
                {
                    attributes: ['id', 'workshopStocks', 'quantity', 'billTo', 'discountAmount', 'discountPercent', 'taxAmount', 'taxAmount', 'totalAmount', 'unitAmount', 'materialMasterId', 'materialId', 'uomId', 'amount', 'chargeType', 'currencyId', 'resolvedStatus', 'status', 'deleted', 'warrantyIncidentId', 'jobsId', 'servicePackageId'],
                    model: warrantyIncidentPartsModel,
                    include: [{
                        attributes: ['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId', 'poGeneration', 'jobGroupId', 'status', 'inactivateReason', 'deleted', 'jobClassId', 'jobTypeId', 'jobCatalogId', 'servicePackageId'],
                        model: Jobs
                    },
                    {
                        attributes: ['id', 'code', 'name', 'companyId', 'branchId', 'makeId', 'businessStreamId', 'packageTypeId', 'externalKey', 'mileageFrom', 'mileageTo', 'validFrom', 'validTo', 'currencyId', 'changable', 'expressService', 'priceBy', 'totalLabour', 'totalParts', 'totalSublet', 'serviceTax', 'netPrice', 'status', 'inactivateReason', 'deleted'],
                        model: ServicePackage
                    }]
                },
                {
                    attributes: ['name'],
                    model: warrantyClaimTypeModel,
                },
                {
                    attributes: ['name'],
                    model: warrantyClaimCategoryModel,
                }
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

    static getWarrantyClaim(include, pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            include,
            distinct: true
        }, transaction);
    }
}