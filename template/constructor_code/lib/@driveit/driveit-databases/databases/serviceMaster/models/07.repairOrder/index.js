const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "repairOrder";
const modelName = "repairOrder";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const RepairOrderRemark = require('../93.repairOrderRemarks');
const RepairOrderType = require('../08.repairOrderType');
const Appointments = require('../01.appointments');
const RepairOrderParts = require('../12.repairOrderParts');
const RepairOrderInsurance = require('../61.insurance');
const Jobs = require('../16.jobs');
// const Parts = require('../05.parts');
const RepairOrderFlatRate = require('../11.repairOrderFlatRate');
const RepairOrderPackages = require('../43.repairOrderPackages');
const JobClass = require('../06.jobClass');
const JobType = require('../04.jobType');
// const PartGroup = require('../15.partGroup');
const AppointmentType = require('../02.appointmentType');
const AppointmentMethod = require('../03.appointmentMethod');
const ServicePackage = require('../38.servicePackage');
const UploadAttachment = require('../45.roUploadAttachment');
const JobsParts = require('../17.jobsParts');
const BayMaster = require('../42.bayMaster');
const POitems = require('../47.poItems');
const PurchaseOrder = require('../46.purchaseOrder');
const warrantyIncidentModel = require('../54.warrantyIncident');
const warrantyIncidentJobsModel = require('../55.warrantyIncidentJobs');
const warrantyIncidentPartsModel = require('../56.warrantyIncidentParts');


const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class RepairOrder extends ModelWithPublisher {

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
        this.myAssociation = this.belongsTo(models.RepairOrderType, {
            foreignKey: 'repairOrderTypeId'
        });
        this.myAssociation = this.belongsTo(models.Appointments, {
            foreignKey: 'appointmentsId'
        });

        this.myAssociation = this.hasMany(models.RepairOrderParts, {
            foreignKey: 'repairOrderId',
            sourceKey: 'id'
        }, {
            onDelete: 'CASCADE'
        });
        this.myAssociation = this.hasMany(models.RepairOrderFlatRate, {
            foreignKey: 'repairOrderId',
            sourceKey: 'id'
        }, {
            onDelete: 'CASCADE'
        });
        this.myAssociation = this.hasMany(models.RepairOrderPackages, {
            foreignKey: 'repairOrderId',
            sourceKey: 'id'
        }, {
            onDelete: 'CASCADE'
        });

        this.myAssociation = this.hasMany(models.RepairOrderRemarks, {
            foreignKey: 'repairOrderId',
            sourceKey: 'id'
        }, {
            onDelete: 'CASCADE'
        });

        this.myAssociation = this.hasOne(models.RepairOrderInvoice, {
            foreignKey: 'repairOrderId'
        });

        this.myAssociation = this.hasMany(models.Packages, {
            foreignKey: 'repairOrderId',
            sourceKey: 'id'
        }, {
            onDelete: 'CASCADE'
        });
        this.myAssociation = this.hasOne(models.RepairOrderInsurance, {
            foreignKey: 'repairOrderId',
            sourceKey: 'id'
        }, {
            onDelete: 'CASCADE'
        });
        this.myAssociation = this.hasMany(models.UploadAttachment, {
            foreignKey: 'repairOrderId'
        });
        this.myAssociation = this.hasMany(models.PurchaseOrder, {
            foreignKey: 'roId'
        });
        this.myAssociation = this.hasMany(models.WarrantyIncident, {
            foreignKey: 'repairOrderId'
        });
        this.myAssociation = this.hasMany(models.QualityCheck, {
            foreignKey: 'repairOrderId',
            sourceKey: 'id'
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [{
                model: RepairOrderType
            }, {
                model: Appointments,
                include: [{
                    model: AppointmentType
                },
                {
                    model: AppointmentMethod
                }
                ],
            }, {
                model: RepairOrderParts,
                include: [{
                    model: Jobs
                },
                {
                    model: ServicePackage
                }
                    // {
                    //     model: Parts,
                    //     include: [{
                    //         model: PartGroup
                    //     }]
                    // }
                ]
            }, {
                model: RepairOrderFlatRate,
                include: [
                    { model: Jobs },
                    { model: JobClass },
                    { model: JobType },
                    { model: ServicePackage },
                    { model: BayMaster }
                ]
            }, {
                model: RepairOrderPackages,
                include: [{
                    model: ServicePackage
                }]
            }, {
                model: RepairOrderType
            }, {
                model: warrantyIncidentModel,
                include: [
                    {
                        model: warrantyIncidentJobsModel,
                        include: [
                            { model: Jobs },
                            { model: JobClass },
                            { model: JobType },
                            { model: ServicePackage }
                        ]
                    },
                    {
                        model: warrantyIncidentPartsModel,
                        include: [{
                            model: Jobs
                        },
                        {
                            model: ServicePackage
                        }]
                    }
                ]
            }
            ],
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where
        }, transaction);
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({

            ...pagination,
            order: [orderBy],
            include: [{
                attributes: ['id', 'code', 'name', 'chargeType'],
                model: RepairOrderType
            },
            {
                attributes: ['id', 'companyCode', 'companyName', 'approvalNumber', 'vehicleAccidentDate', 'approvalAmount', 'totalLabour', 'totalPart', 'tax', 'processingFees', 'towingCharges', 'totalAmount', 'payableAmount', 'underinsuredAmount', 'bettermentAmount', 'accessAmount', 'customerPayableTax', 'introducerId', 'introducerName', 'introducerContactNumber', 'introducerCommission', 'status', 'inactivateReason', 'deleted', 'repairOrderId', 'underinsuredAmountWaiver', 'bettermentAmountWaiver', 'accessAmountWaiver'],
                model: RepairOrderInsurance
            },
            {
                model: Appointments,
                include: [{
                    attributes: ['id', 'code', 'name', 'hoursPreBlocked', 'servicePackageIds'],
                    model: AppointmentType
                },
                {
                    attributes: ['id', 'code', 'name'],
                    model: AppointmentMethod
                }
                ],
            }, {
                model: UploadAttachment
            }, {
                model: RepairOrderParts,
                include: [
                    {
                        attributes: ['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId', 'poGeneration', 'jobGroupId', 'status', 'inactivateReason', 'deleted', 'jobClassId', 'jobTypeId', 'jobCatalogId', 'servicePackageId'],
                        model: Jobs
                    },
                    {
                        attributes: ['id', 'code', 'name', 'companyId', 'branchId', 'makeId', 'businessStreamId', 'packageTypeId', 'externalKey', 'mileageFrom', 'mileageTo', 'validFrom', 'validTo', 'currencyId', 'changable', 'expressService', 'priceBy', 'totalLabour', 'totalParts', 'totalSublet', 'serviceTax', 'netPrice', 'status', 'inactivateReason', 'deleted'],
                        model: ServicePackage
                    }
                    // {
                    //     model: Parts,
                    //     include: [{
                    //         model: PartGroup
                    //     }]
                    // }
                ]
            }, {
                model: RepairOrderFlatRate,
                include: [{
                    attributes: ['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId', 'poGeneration', 'jobGroupId', 'status', 'inactivateReason', 'deleted', 'jobClassId', 'jobTypeId', 'jobCatalogId', 'servicePackageId'],
                    model: Jobs,
                    include: [{ model: JobsParts }]
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
                },
                { model: BayMaster }
                ]
            }, {
                // attributes:['billToName'],
                model: RepairOrderPackages,
                include: [{
                    attributes: ['id', 'code', 'name', 'companyId', 'branchId', 'makeId', 'businessStreamId', 'packageTypeId', 'externalKey', 'mileageFrom', 'mileageTo', 'validFrom', 'validTo', 'currencyId', 'changable', 'expressService', 'priceBy', 'totalLabour', 'totalParts', 'totalSublet', 'serviceTax', 'netPrice', 'status', 'inactivateReason', 'deleted'],
                    model: ServicePackage
                }]
            }, {
                model: PurchaseOrder,
                include: [{ model: POitems }]
            },
                //  { 
                //     attributes: ['id', 'warrantyClaimFormNo', 'warrantyClaimStatusId', 'warrantyProfileId', 'warrantyExpiredDate', 'warrantyClaimTypeId', 'warrantyCategoryId', 'warrantyClaimCategory', 'warrantyAppovalNumber', 'defectMaterialId', 'symptomCategoryId', 'symptomCodeId', 'troubleCodeId', 'warrantyClassCodeId', 'sourceofProblemId', 'pNCCodeId', 'problem', 'cause', 'rectification', 'remarksNSDOfficer', 'totalLabour', 'totalPart', 'taxAmount', 'totalAmount', 'status', 'deleted', 'repairOrderId'],
                //     model: warrantyIncidentModel,
                //     include: [
                //     //     { 
                //     //         attributes:['id', 'billTo', 'hours', 'discountAmount', 'discountPercent', 'taxAmount', 'unitAmount', 'amount', 'totalAmount', 'reassignedTechnicianId','vendorId', 'reassignedTechnicianName', 'workDate', 'startTime', 'endTime', 'chargeType', 'currencyId', 'resolvedStatus', 'remark', 'status', 'deleted', 'warrantyIncidentId', 'jobsId', 'jobClassId', 'jobTypeId', 'servicePackageId'],
                //     //         model: warrantyIncidentJobsModel,
                //     //         include: [
                //     //             { 
                //     //                 attributes:['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId', 'poGeneration', 'jobGroupId', 'status','inactivateReason', 'deleted', 'jobClassId', 'jobTypeId', 'jobCatalogId', 'servicePackageId'],
                //     //                 model: Jobs 
                //     //             }, 
                //     //             {   
                //     //                 attributes:['id', 'code', 'name', 'status', 'inactivateReason', 'deleted', 'qcbyforeman'],
                //     //                 model: JobClass 
                //     //             }, 
                //     //             { 
                //     //                 attributes:['id', 'code', 'name', 'status', 'inactivateReason', 'deleted'],
                //     //                 model: JobType 
                //     //             }, 
                //     //             { 
                //     //                 attributes:['id', 'code', 'name', 'companyId', 'branchId', 'makeId', 'businessStreamId', 'packageTypeId', 'externalKey', 'mileageFrom', 'mileageTo', 'validFrom', 'validTo', 'currencyId', 'changable', 'expressService', 'priceBy', 'totalLabour', 'totalParts', 'totalSublet', 'serviceTax', 'netPrice', 'status', 'inactivateReason', 'deleted'],
                //     //                 model: ServicePackage
                //     //              }
                //     //         ]
                //     //     },
                //         { 
                //             attributes:['id', 'workshopStocks', 'quantity', 'billTo', 'discountAmount', 'discountPercent', 'taxAmount', 'taxAmount', 'totalAmount', 'unitAmount','materialMasterId', 'materialId', 'uomId', 'amount', 'chargeType', 'currencyId', 'resolvedStatus', 'status', 'deleted', 'warrantyIncidentId', 'jobsId', 'servicePackageId'],
                //             model: warrantyIncidentPartsModel,
                //             include: [{
                //                 attributes:['id', 'code', 'name', 'uomId', 'hours', 'amount', 'materialId', 'poGeneration', 'jobGroupId', 'status','inactivateReason', 'deleted', 'jobClassId', 'jobTypeId', 'jobCatalogId', 'servicePackageId'],
                //                 model: Jobs
                //             },
                //             {
                //                 attributes:['id', 'code', 'name', 'companyId', 'branchId', 'makeId', 'businessStreamId', 'packageTypeId', 'externalKey', 'mileageFrom', 'mileageTo', 'validFrom', 'validTo', 'currencyId', 'changable', 'expressService', 'priceBy', 'totalLabour', 'totalParts', 'totalSublet', 'serviceTax', 'netPrice', 'status', 'inactivateReason', 'deleted'],
                //                 model: ServicePackage
                //             }]
                //         }
                //     ]
                // }
            ],
            distinct: true,
            where: {
                ...where,
                deleted: false
            },
        }, transaction);
    }
    static getRecords_old(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({

            ...pagination,
            order: [orderBy],
            include: [
                { model: RepairOrderType },
                {
                    model: Appointments,
                    include: [
                        { model: AppointmentType },
                        { model: AppointmentMethod }
                    ],
                },
                { model: UploadAttachment },
                {
                    model: RepairOrderParts,
                    include: [
                        { model: Jobs },
                        { model: ServicePackage }
                        // {
                        //     model: Parts,
                        //     include: [{
                        //         model: PartGroup
                        //     }]
                        // }
                    ]
                },
                {
                    model: RepairOrderFlatRate,
                    include: [{
                        model: Jobs,
                        include: [{ model: JobsParts }]
                    },
                    { model: JobClass },
                    { model: JobType },
                    { model: ServicePackage },
                    { model: BayMaster }
                    ]
                },
                {
                    model: RepairOrderPackages,
                    include: [{ model: ServicePackage }]
                },
                {
                    model: PurchaseOrder,
                    include: [{ model: POitems }]
                }, {
                    model: warrantyIncidentModel,
                    include: [
                        {
                            model: warrantyIncidentJobsModel,
                            include: [
                                { model: Jobs },
                                { model: JobClass },
                                { model: JobType },
                                { model: ServicePackage }
                            ]
                        },
                        {
                            model: warrantyIncidentPartsModel,
                            include: [{
                                model: Jobs
                            },
                            {
                                model: ServicePackage
                            }]
                        }
                    ]
                }
            ],
            distinct: true,
            where: {
                ...where,
                deleted: false
            },
        }, transaction);
    }

    static getRecordsByPayment(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            ...pagination,
            order: [orderBy],
            // distinct: true,
            where: {
                ...where,
                deleted: false
            },
        }, transaction);
    }

    static addRecord(record, transaction = null) {

        return this.create(record, {
            returning: true,
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
            ...pagination,
            order: [orderBy]
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
    }

    static searchAllForES(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
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
            ];
        }

        let searchAllObj = {
            raw: true,
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


    /**
     * Get data for Listing Screen
     */
    static getDataForListingScreen(where, pagination, orderBy) {
        return new Promise(async (resolve, reject) => {
            const count = await this.count({
                where: {
                    'deleted': 0
                }
            });
            this.sequelize.query(`
            SELECT 
                repairOrder.id,
                repairOrder.refNo AS refNo,
                repairOrder.roPrintDate,
                repairOrder.proNumber,
                repairOrder.proStatus,
                repairOrder.status,
                appointmentsId,
                appointmentTypeId,
                repairOrder.mileageLast,
                repairOrder.mileageCurrent,
                repairOrder.vehicleId,
                repairOrder.makeId,
                repairOrder.modelId,
                repairOrder.variantId,
                repairOrder.currentBayLocationId,
                repairOrder.createdAt,
                repairOrder.updatedAt,
                repairOrder.updatedBy,
                repairOrder.createdBy,
                repairOrder.currencyId,
                repairOrder.remarks,
                repairOrder.repairOrderTypeId,
                repairOrder.roReleasedDate,
                repairOrder.arrivalTime,
                repairOrder.customerTypeId,
                repairOrder.assignedSAId,
                iUsers.fullName AS saFullName,
                iUsers.employeeId AS saEmployeeID,
                repairOrderType.code AS repairOrderTypeCode,
                repairOrderType.name AS repairOrderTypeName, 
                repairOrderDate, 
                repairOrderTime, 
                repairOrder.vehicleRegNo,
                model.name AS modelName ,
                repairOrder.customerId,
                repairOrder.contactRelationship,
                CONCAT(customer_master.customer.name, ' - ',customer_master.customer.identityNo) AS customerNameIdno, 
                customerAccountGroup.id AS customerAccGroupId, 
                customerAccountGroup.name AS customerAccGroupName, 
                customer_master.customer.name AS customerName, 
                customer_master.customer.identityNo,
                repairOrder.branchId,
                repairOrder.companyId,
                CONCAT(customer_master.branch.code, ' - ', customer_master.branch.name) AS branchCodeName,
                customer_master.branch.code AS branchCode,
                customer_master.branch.name AS branchName,
                customer_master.branch.countryId,
                iUsers.fullName AS asName,
                roStatus,
                vehicle.chassisNo,
                vehicle.chassisNo AS vehicleChassisNo,
                vehicle.engineNo AS vehicleEngineNo,
                DATE_FORMAT(vehicle.registrationDate,"%d-%m-%Y") AS vehicleRegistrationDate,
                appointments.refNo AS appointmentsRefNo,
                DATE_FORMAT(appointments.appointmentDate,"%d-%m-%Y") AS appointmentDate,
                appointments.appointmentTime,
                appointments.estimatedHours,
                appointments.appointmentMethodId,
                appointmentType.name AS appointmentTypeName,
                repairOrder.waitingStatus,
                variant.code AS variantCode,
                variant.serviceModelCode,
                variant.bodyTypeId,
                variant.engineCode, 
                repairOrderType.chargeType as roTypeChargeType,
                appointmentMethod.name AS appointmentMethodName,
                customerDetails.telephone AS customerTel,
                customerDetails.mobile AS customerMobile,
                customerContact.name AS contactName,
                customerContact.telephone AS contactPersonTelephone,
                customerContact.mobile AS contactPersonMobile,
                repairOrder.contactPersonId,
                customerContact.email AS contactPersonEmail,
                customerContact.relationshipId, 
                roUser.fullName AS roUserfullName,
                roUser.fullName AS createdByName,
                roUpdateUser.fullName AS updatedByName, 
                repairOrder.hasCarWash, 
                repairOrder.carWashAmount,
                repairOrder.clockInAction,
                repairOrder.isAfterQc_Passed
            FROM service_master.repairOrder AS repairOrder
            LEFT JOIN service_master.repairOrderType AS repairOrderType ON service_master.repairOrderType.id = repairOrder.repairOrderTypeId
            LEFT JOIN spec_master.vehicle AS vehicle ON spec_master.vehicle.id = repairOrder.vehicleId
            LEFT JOIN spec_master.variant AS variant ON spec_master.variant.id = repairOrder.variantId
            LEFT JOIN spec_master.model AS model ON spec_master.model.id = spec_master.vehicle.modelId
            LEFT JOIN customer_master.branch AS branch ON customer_master.branch.id = repairOrder.branchId
            LEFT JOIN customer_master.customer AS customer ON customer_master.customer.id = repairOrder.customerId
            LEFT JOIN customer_master.customerContact AS customerContact ON customerContact.id = repairOrder.contactPersonId
            LEFT JOIN customer_master.customerDetails AS customerDetails ON customer_master.customerDetails.customerId = repairOrder.customerId
            LEFT JOIN customer_master.customerAccountGroup AS customerAccountGroup ON customerAccountGroup.id = customer.customerAccountGroupId
            LEFT JOIN auth.internal_users AS iUsers ON iUsers.id = repairOrder.assignedSAId
            LEFT JOIN auth.internal_users AS roUser ON roUser.id = repairOrder.createdBy
            LEFT JOIN auth.internal_users AS roUpdateUser ON roUpdateUser.id = repairOrder.updatedBy
            LEFT JOIN service_master.appointments AS appointments ON appointments.id = repairOrder.appointmentsId
            LEFT JOIN service_master.appointmentType AS appointmentType ON appointmentType.id = appointments.appointmentTypeId
            LEFT JOIN service_master.appointmentMethod AS appointmentMethod ON appointmentMethod.id = appointments.appointmentMethodId
            WHERE ${where}
            ORDER BY repairOrder.${orderBy[0]} ${orderBy[1]}
            LIMIT ?,?
            `, { replacements: [pagination.offset, pagination.limit], type: this.sequelize.QueryTypes.SELECT })
                .then(async dbRes => {
                    const finalResponse = await Promise.all(dbRes.map(async x => {
                        x.repairOrderFlatRates = await this.sequelize.query(`SELECT 
                            repairOrderFlatRate.id,
                            repairOrderFlatRate.billTo,
                            repairOrderFlatRate.hours,
                            repairOrderFlatRate.isSplit,
                            (CASE WHEN (repairOrderFlatRate.recommendation = 1) THEN 'true' ELSE 'false' END) AS recommendation,
                            FORMAT(repairOrderFlatRate.discountAmount,2) AS discountAmount,
                            FORMAT(repairOrderFlatRate.discountPercent,2) AS discountPercent, 
                            FORMAT(repairOrderFlatRate.taxAmount,2) AS taxAmount,
                            FORMAT(repairOrderFlatRate.unitAmount,2) AS unitAmount, 
                            FORMAT(repairOrderFlatRate.amount,2) AS amount,
                            repairOrderFlatRate.billToName, 
                            FORMAT(repairOrderFlatRate.totalAmount,2) AS totalAmount,
                            repairOrderFlatRate.reassignedTechnicianId, 
                            repairOrderFlatRate.vendorId,
                            repairOrderFlatRate.reassignedTechnicianName, 
                            repairOrderFlatRate.chargeType,
                            repairOrderFlatRate.resolvedStatus,
                            repairOrderFlatRate.createdAt,
                            repairOrderFlatRate.remark,
                            repairOrderFlatRate.warrantyIncidentId,
                            repairOrderFlatRate.status,
                            repairOrderFlatRate.repairOrderId,
                            repairOrderFlatRate.bayMasterId,
                            repairOrderFlatRate.jobsId,
                            repairOrderFlatRate.subletCodeId,
                            repairOrderFlatRate.subletCodeName,
                            repairOrderFlatRate.costCenterId,
                            repairOrderFlatRate.costCenterName,
                            repairOrderFlatRate.jobClassId,
                            repairOrderFlatRate.jobTypeId,
                            repairOrderFlatRate.servicePackageId,
                            repairOrderFlatRate.deleted,
                            job.id AS jobId,
                            job.code AS jobCode,
                            job.name AS jobName,
                            job.materialId AS jobMaterialId,
                            job.poGeneration AS jobPoGeneration,
                            job.jobGroupId AS jobJobGroupId, 
                            job.jobClassId AS jobJobClassId,
                            job.jobTypeId AS jobJobTypeId,
                            job.jobCatalogId AS jobJobCatalogId, 
                            job.servicePackageId AS jobServicePackageId,
                            jobClass.code AS jobClassCode, 
                            jobClass.name AS jobClassName,
                            jobClass.qcbyforeman AS jobClassQcbyforeman,
                            jobType.id AS jobTypeId, 
                            jobType.code AS jobTypeCode,
                            jobType.name AS jobTypeName,
                            A.materialDescription,
                            A.materialId AS materialCode,
                            B.code AS servicePackageCode, 
                            B.name AS servicePackageName,
                            B.validFrom AS servicePackageValidFrom,
                            B.validTo AS servicePackageValidTo,
                            C.id	AS servicePackageTypeId, 
                            C.code	AS servicePackageTypeCode,
                            C.name	AS servicePackageTypeName,
                            D.id 	AS materialTypeId,
                            D.code 	AS materialTypeCode, 
                            D.name 	AS materialTypeName,
                            E.id 	AS materialGroupId,
                            E.code 	AS materialGroupCode,
                            E.name 	AS materialGroupName,
                            F.id	AS uomId,
                            F.code	AS uomCode,
                            F.name	AS uomName,
                            H.id	AS makeId,
                            H.code	AS makeCode,
                            H.name	AS makeName
                        FROM repairOrderFlatRate AS repairOrderFlatRate 
                            INNER JOIN jobs     AS job      ON repairOrderFlatRate.jobsId = job.id AND job.deleted = 0 
                            INNER JOIN jobClass AS jobClass ON repairOrderFlatRate.jobClassId = jobClass.id AND jobClass.deleted = 0 
                            INNER JOIN jobType  AS jobType  ON repairOrderFlatRate.jobTypeId = jobType.id AND jobType.deleted = 0
                            LEFT JOIN general_master.materialMasterBasicinfo AS A ON A.id = job.materialId 
                            LEFT JOIN servicePackage                    AS B ON B.id = repairOrderFlatRate.servicePackageId
                            LEFT JOIN spec_master.packageType           AS C ON C.id = B.packageTypeId
                            LEFT JOIN general_master.materialType       AS D ON D.id = A.materialTypeId AND D.deleted = 0
                            LEFT JOIN general_master.materialGroupCode  AS E ON E.id = A.materialGroupId AND E.deleted = 0
                            LEFT JOIN general_master.uom				AS F ON F.id = job.uomId
                            INNER JOIN service_master.jobCatalog		AS G ON G.id = job.jobCatalogId
                            INNER JOIN spec_master.make					AS H ON H.id = G.makeId

                        WHERE repairOrderFlatRate.repairOrderId = ? 
                        AND repairOrderFlatRate.deleted = 0
                    `, {
                            replacements: [x.id], type: this.sequelize.QueryTypes.SELECT
                        });
                        x.repairOrderParts = await this.sequelize.query(`SELECT 
                            repairOrderParts.id, 
                            repairOrderParts.workshopStocks,
                            FORMAT(repairOrderParts.quantity,0) AS quantity,
                            repairOrderParts.billTo,
                            repairOrderParts.billToName,
                            FORMAT(repairOrderParts.discountAmount,2) AS discountAmount,
                            FORMAT(repairOrderParts.discountPercent,0) AS discountPercent,
                            FORMAT(repairOrderParts.taxAmount,2) AS taxAmount,
                            FORMAT(repairOrderParts.totalAmount,2) AS totalAmount,
                            FORMAT(repairOrderParts.unitAmount,0) AS unitAmount,
                            FORMAT(repairOrderParts.amount,2) AS amount,
                            repairOrderParts.materialMasterId,
                            repairOrderParts.materialId,
                            repairOrderParts.uomId,
                            repairOrderParts.chargeType,
                            repairOrderParts.currencyId,
                            repairOrderParts.status,
                            repairOrderParts.deleted,
                            repairOrderParts.repairOrderId,
                            repairOrderParts.jobsId,
                            repairOrderParts.servicePackageId,
                            repairOrderParts.resolvedStatus,
                            repairOrderParts.warrantyIncidentId,
                            repairOrderParts.costCenterId,
                            repairOrderParts.costCenterName,
                            repairOrderParts.fulfilledMeterialID,
                            repairOrderParts.fulfilledQty,
                            repairOrderParts.returnedQty,
                            repairOrderParts.returnAcceptedQty,
                            repairOrderParts.totalCost,
                            repairOrderParts.unitCost,
                            repairOrderParts.partStatus,    
                            job.id   AS jobId, 
                            job.code AS jobCode, 
                            job.name AS jobName,
                            uom.code AS uomCode,
                            uom.name AS uomName,
                            A.materialId AS partCode,
                            A.materialDescription AS partName,
                            B.id        AS partGroupId,
                            B.code      AS partGroupCode,
                            B.name      AS partGroupName,
                            C.code      AS servicePackageCode, 
                            C.name      AS servicePackageName,
                            C.validFrom AS servicePackageValidFrom,
                            C.validTo   AS servicePackageValidTo,
                            D.id		AS servicePackageTypeId, 
                            D.code		AS servicePackageTypeCode,
                            D.name		AS servicePackageTypeName,
                            E.id 		AS materialTypeId,
                            E.code 		AS materialTypeCode, 
                            E.name 		AS materialTypeName,
                            G.id		AS makeId,
                            G.code		AS makeCode,
                            G.name		AS makeName

                        FROM service_master.repairOrderParts    AS repairOrderParts 
                            LEFT JOIN service_master.jobs       AS job ON repairOrderParts.jobsId = job.id AND job.deleted = 0 
                            LEFT JOIN general_master.uom        AS uom ON repairOrderParts.uomId = uom.id AND uom.deleted = 0
                            LEFT JOIN general_master.materialMasterBasicinfo    AS A ON A.id = repairOrderParts.materialMasterId
                            LEFT JOIN general_master.materialGroupCode          AS B ON B.id = A.materialGroupId
                            LEFT JOIN servicePackage                    AS C ON C.id = repairOrderParts.servicePackageId
                            LEFT JOIN spec_master.packageType	        AS D ON D.id = C.packageTypeId
                            LEFT JOIN general_master.materialType       AS E ON E.id = A.materialTypeId AND E.deleted = 0
                            INNER JOIN general_master.materialMakeIds   AS F ON F.makeId = (
                                SELECT makeId FROM general_master.materialMakeIds AS T WHERE T.materialId = A.id LIMIT 1
                            ) AND F.materialId = A.id
                            INNER JOIN spec_master.make					AS G ON G.id = F.makeId AND G.deleted = 0

                        WHERE repairOrderParts.repairOrderId = ? 
                        AND repairOrderParts.deleted = 0
                    `, {
                            replacements: [x.id], type: this.sequelize.QueryTypes.SELECT
                        });
                        x.repairOrderPackages = await this.sequelize.query(`SELECT
                            A.id,
                            A.chargeType,
                            A.quantity,
                            A.billTo,
                            A.billToName,
                            FORMAT(A.taxAmount,2)   AS taxAmount,
                            FORMAT(A.totalAmount,2) AS totalAmount,
                            A.status,
                            A.servicePackageId,
                            A.repairOrderId,
                            (CASE WHEN (A.deleted = 1) THEN 'true' ELSE 'false' END) AS deleted,
                            B.code AS servicePackageCode,
                            B.name AS servicePackageName,
                            B.companyId,
                            B.branchId,
                            B.makeId,
                            B.businessStreamId,
                            B.packageTypeId,
                            B.externalKey,
                            B.mileageFrom,
                            B.mileageTo,
                            B.validFrom,
                            B.validTo,
                            B.currencyId,
                            B.changable,
                            B.expressService,
                            B.priceBy,
                            FORMAT(B.totalLabour,2) AS totalLabour,
                            FORMAT(B.totalParts,2)  AS totalParts,
                            FORMAT(B.totalSublet,2) AS totalSublet,
                            FORMAT(B.serviceTax,2)  AS serviceTax,
                            FORMAT(B.netPrice,2)    AS netPrice,
                            B.milage,
                            B.milageTolerance,
                            C.code AS currencyCode,
                            A.discountAmount
                        FROM service_master.repairOrderPackages         A
                            INNER JOIN service_master.servicePackage    B ON B.id = A.servicePackageId
                            LEFT JOIN general_master.currency           C ON C.id = B.currencyId AND C.deleted = 0
                        WHERE A.repairOrderId = ? AND A.deleted = 0
                        `, {
                            replacements: [x.id], type: this.sequelize.QueryTypes.SELECT
                        });

                        x.warrantyIncidents = await this.sequelize.query(`SELECT 
                        warrantyIncident.id,
                        warrantyIncident.warrantyIncidentNo,
                        warrantyClaimFormNo,
                        warrantyClaimStatusId,
                        warrantyProfileId,
                        DATE_FORMAT(warrantyExpiredDate, '%d-%m-%Y') AS warrantyExpiredDate,
                        warrantyClaimTypeId,
                        warrantyCategoryId,
                        warrantyClaimCategoryId,
                        warrantyAppovalNumber,
                        defectMaterialId,
                        symptomCategoryId,
                        symptomCodeId,
                        fileName,
                        fileUrl,
                        uploadDate,
                        uploadBy,
                        troubleCodeId,
                        warrantyClassCodeId,
                        sourceofProblemId,
                        pNCCodeId,
                        problem,
                        cause,
                        rectification,
                        remarksNSDOfficer,
                        FORMAT(totalLabour, '0') AS totalLabour,
                        FORMAT(totalPart, '0') AS totalPart,
                        FORMAT(taxAmount, '2') AS taxAmount,
                        FORMAT(totalAmount, '2') AS totalAmount,
                        warrantyIncident.status AS warrantyIncidentStatus,
                        partsPurchaseInvoiceNo,
                        warrantySymptomCategoryId,
                        warrantyCategory.name AS warrantyCategoryName,
                        warrantyCategory.code AS warrantyCategoryCode,
                        warrantyClaimType.name AS warrantyClaimTypeName,
                        warrantyClaimType.code AS warrantyClaimTypeCode,
                        warrantyClaimCategory.name AS warrantyClaimCategoryName,
                        warrantyClaimCategory.code AS warrantyClaimCategoryCode,
                        warrantyIncident.createdBy,
                        internal_users.fullName AS createdByName,
                        warrantyIncident.createdAt,
                        warrantyIncident.warrantyBillToId,
                        warrantyIncident.warrantyBillToName,
                        warrantyIncident.type,
                        warrantyIncident.recallInternalNo
                    FROM
                        service_master.warrantyIncident AS warrantyIncident
                            LEFT JOIN
                        general_master.warrantyCategory AS warrantyCategory ON warrantyCategory.id = warrantyIncident.warrantyCategoryId
                            LEFT JOIN
                        service_master.warrantyClaimType AS warrantyClaimType ON warrantyClaimType.id = warrantyIncident.warrantyClaimTypeId
                            LEFT JOIN
                        service_master.warrantyClaimCategory AS warrantyClaimCategory ON warrantyClaimCategory.id = warrantyIncident.warrantyClaimCategoryId
                            LEFT JOIN
                        auth.internal_users AS internal_users ON internal_users.id = warrantyIncident.createdBy
                    WHERE
                        service_master.warrantyIncident.deleted = 0
                            AND warrantyIncident.repairOrderId = ?`, {
                            replacements: [x.id], type: this.sequelize.QueryTypes.SELECT
                        });

                        x.repairOrderInsurance = await RepairOrderInsurance.findOne({
                            where: {
                                deleted: 0,
                                repairOrderId: x.id,
                            },
                            attributes: ['id', 'companyCode', 'companyName', 'approvalNumber',
                                [this.sequelize.fn('DATE_FORMAT', this.sequelize.col('vehicleAccidentDate'), "%d-%m-%Y"), 'vehicleAccidentDate'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('approvalAmount'), '2'), 'approvalAmount'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('totalLabour'), '0'), 'totalLabour'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('totalPart'), '0'), 'totalPart'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('tax'), '2'), 'tax'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('processingFees'), '2'), 'processingFees'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('towingCharges'), '2'), 'towingCharges'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('totalAmount'), '2'), 'totalAmount'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('payableAmount'), '2'), 'payableAmount'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('underinsuredAmount'), '2'), 'underinsuredAmount'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('underinsuredAmountWaiver'), '2'), 'underinsuredAmountWaiver'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('bettermentAmount'), '2'), 'bettermentAmount'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('bettermentAmountWaiver'), '2'), 'bettermentAmountWaiver'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('accessAmountWaiver'), '2'), 'accessAmountWaiver'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('accessAmount'), '2'), 'accessAmount'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('customerPayableTax'), '2'), 'customerPayableTax'],
                                'introducerCode', 'introducerId', 'introducerName', 'introducerContactNumber', 'introducerCommission', 'status', 'accessAmountWaiver', 'bettermentAmountWaiver', 'underinsuredAmountWaiver']
                        });

                        x.uploadAttachments = await UploadAttachment.findAll({
                            where: {
                                deleted: 0,
                                repairOrderId: x.id,
                            },
                            attributes: ['id', 'fileName', 'fileURL']
                        });

                        x.purchaseOrders = await PurchaseOrder.findAll({
                            where: {
                                deleted: 0,
                                roId: x.id,
                            },
                            attributes: ['id',
                                [this.sequelize.fn('DATE_FORMAT', this.sequelize.col('poDate'), "%d-%m-%Y"), 'poDate'],
                                'poType', 'poNumber', 'status', 'vendorBasicId', 'vendorName', 'supplierAddress', 'supplierPhone', 'companyId', 'billingAddress', 'billingPhone', 'roNumber',
                                [this.sequelize.fn('DATE_FORMAT', this.sequelize.col('roDate'), "%d-%m-%Y"), 'roDate'],
                                'customerName', 'roId'],
                            include: [
                                {
                                    model: POitems,
                                    where: {
                                        deleted: 0
                                    },
                                    attributes: ['id', 'code', 'description', 'quantity', 'unitCost', 'unitSellingPrice', 'totalSellingPrice', 'totalCost', 'supplierInvoiceNo',
                                        [this.sequelize.fn('DATE_FORMAT', this.sequelize.col('supplierInvoiceDate'), "%d-%m-%Y"), 'supplierInvoiceDate'],
                                        'supplierInvoiceUpdate',
                                        'deliveryOrderNo', 'deliveryTo', 'deliveryAddress', 'itemCategory', 'relatedJobs', 'status', 'remark', 'purchaseOrderId']
                                }
                            ]
                        });

                        x.roRemarks = await RepairOrderRemark.findAll({
                            where: {
                                deleted: 0,
                                repairOrderId: x.id,
                            },
                            attributes: ['id', 'symptomCode', 'remarks', 'cBj', 'jobName', 'jobId', 'vehicleRegNo', 'repairOrderId', 'currentMileage']
                        });

                        return x;
                    }));
                    resolve({
                        count: count,
                        rows: finalResponse
                    })
                }).catch(err => reject(err));
        })
    }

    /**
     * Get Contact Details
     */
    static getCustomertDetails(customerId) {
        return new Promise(resolve => {

            return this.sequelize.query(`SELECT id,tenantId,mAddress1,mAddress2,mAddress3,mPostcodeId,mCityId,mStateId,mCountryId,cAddress1,cAddress2,cAddress3,cPostcodeId,cCityId,cStateId,cCountryId,sameAddress,telephone,fax,mobile,email,preferedModeOfContactId,receiveSMS,gender,highestEducationId,occupationId,employmentSectorId,industryId,annualIncomeId,ethnicityId,dateOfBirth,nationality,maritalStatus,religionId,pdpaClause,pdpaConsent,pdpaSignedDate,status,customerId,customerGroupId FROM customer_master.customerDetails WHERE deleted = 0 AND customerId = ?`,
                {
                    replacements: [customerId],
                    type: this.sequelize.QueryTypes.SELECT
                });
        })
    }

    static async convertProToRo(data) {
        const createRo = await this.addRecord(data)
            .catch(err => {
                console.error(err)
            });

        return createRo;

    }

    // static getCustomerContacts(customerId)
    static async getWarrantyIncidents(repairOrderId) {
        const getWarrInc = await warrantyIncidentModel.findAll({
            where: {
                deleted: 0,
                repairOrderId: repairOrderId,
            },
            include: [
                {
                    model: warrantyIncidentJobsModel,
                    where: {
                        deleted: 0
                    }
                },
                {
                    model: warrantyIncidentPartsModel,
                    where: {
                        deleted: 0
                    }
                }
            ]
        });
        resolve(getWarrInc);
    }

    // get all repairOrder jobs filter by start date, end date and status
    static getAllRepairOrderFlatRatesHours(startDate, endDate) {
        return this.sequelize.query(`SELECT sum(hours) as hours from repairOrderFlatRate 
         where repairOrderId in 
         (SELECT id FROM service_master.repairOrder where roCreationDate between ? and ?)`, {
            replacements: [startDate, endDate], type: this.sequelize.QueryTypes.SELECT
        })
    }
}
