const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "PreRepairOrder";
const modelName = "PreRepairOrder";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const PreRepairOrderFlatRateModel = require('../88.preRepairOrderFlatRate');
const PreRepairOrderPackagesModel = require('../90.preRepairOrderPackages');
const ServicePackageModel = require('../38.servicePackage');

module.exports = class PreRepairOrder extends Sequelize.Model {
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
        // this.myAssociation = this.belongsTo(models.RepairOrderType, {
        //     foreignKey: 'repairOrderTypeId',
        // });
        // this.myAssociation = this.belongsTo(models.Appointments, {
        //     foreignKey: 'appointmentsId'
        // });

        // this.myAssociation = this.hasMany(models.PreRepairOrderParts, {
        //     foreignKey: 'preRepairOrderId',
        //     sourceKey: 'id'
        // }, {
        //     onDelete: 'CASCADE'
        // });
        // this.myAssociation = this.hasMany(models.PreRepairOrderFlatRate, {
        //     foreignKey: 'preRepairOrderId',
        //     sourceKey: 'id'
        // }, {
        //     onDelete: 'CASCADE'
        // });
        // this.myAssociation = this.hasMany(models.PreRepairOrderPackages, {
        //     foreignKey: 'preRepairOrderId',
        //     sourceKey: 'id'
        // }, {
        //     onDelete: 'CASCADE'
        // });

        // this.myAssociation = this.hasOne(models.RepairOrderInvoice, {
        //     foreignKey: 'repairOrderId'
        // });

        // this.myAssociation = this.hasMany(models.Packages, {
        //     foreignKey: 'repairOrderId',
        //     sourceKey: 'id'
        // }, {
        //     onDelete: 'CASCADE'
        // });
        // this.myAssociation = this.hasOne(models.RepairOrderInsurance, {
        //     foreignKey: 'repairOrderId',
        //     sourceKey: 'id'
        // }, {
        //     onDelete: 'CASCADE'
        // });
        // this.myAssociation = this.hasMany(models.UploadAttachment, {
        //     foreignKey: 'repairOrderId'
        // });
        // this.myAssociation = this.hasMany(models.PurchaseOrder, {
        //     foreignKey: 'roId'
        // });
        // this.myAssociation = this.hasMany(models.WarrantyIncident, {
        //     foreignKey: 'repairOrderId'
        // });
        // this.myAssociation = this.hasMany(models.QualityCheck, {
        //     foreignKey: 'repairOrderId',
        //     sourceKey:'id'
        // });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

    static getOneWithInclude(where, transaction = null) {
        return this.findOne({
            where,
            include: [
                { model: PreRepairOrderFlatRateModel }
            ]
        }, transaction);
    }

    static getAllData(where, attributes = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
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
                { model: PreRepairOrderFlatRateModel }
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
        }, transaction);
    }

    /******************************************************************************/
    static updateRecordByAppointmentId(record, where, transaction = null) {

        return this.update(record, {
            where,
            isNewRecord: false,
        }, transaction);;
    }

    /**
     * Get data for Listing Screen
     */
    static getDataForListingScreen(where, pagination, orderBy) {
        return new Promise(async (resolve, reject) => {
            const count = await this.count({
                where: {
                    'deleted': 0,
                    'proNumber': {
                        [Op.ne]: null
                    }
                }
            });
            /*           //            prerepairorder.repairordertypeid, 
                      
                      // LEFT JOIN service_master.repairOrderType AS repairOrderType 
                      // ON repairOrderType.id = prerepairorder.repairordertypeid 
                      
                      // repairOrderType.code AS repairOrderTypeCode, 
                      // repairOrderType.NAME AS repairOrderTypeName,  */

            // repairOrderType.chargetype AS roTypeChargeType, 

            this.sequelize.query(`
            SELECT preRepairOrder.id, 
            preRepairOrder.refno AS refNo,
            preRepairOrder.roPrintDate,
            preRepairOrder.proNumber, 
            preRepairOrder.proStatus, 
            preRepairOrder.status, 
            appointmentsId, 
            appointmentTypeId,
            preRepairOrder.repairOrderTypeId,  
            preRepairOrder.mileageLast, 
            preRepairOrder.mileageCurrent, 
            preRepairOrder.vehicleId, 
            preRepairOrder.makeId, 
            preRepairOrder.modelId, 
            preRepairOrder.variantId, 
            preRepairOrder.createdAt, 
            preRepairOrder.updatedAt, 
            preRepairOrder.updatedBy, 
            preRepairOrder.createdBy, 
            preRepairOrder.currencyId, 
            preRepairOrder.remarks, 
            preRepairOrder.roReleasedDate, 
            preRepairOrder.arrivalTime, 
            preRepairOrder.customerTypeId, 
            preRepairOrder.assignedSAId, 
            iUsers.fullname AS saFullName, 
            iUsers.employeeid AS saEmployeeID, 
     
            repairOrderDate, 
            repairOrderTime, 
            preRepairOrder.vehicleRegNo, 
            model.NAME AS modelName, 
            preRepairOrder.customerId, 
            preRepairOrder.contactRelationship, 
            Concat(customer_master.customer.NAME, ' - ', customer_master.customer.identityno) AS customerNameIdno, 
            customeraccountgroup.id AS customerAccGroupId, 
            customeraccountgroup.NAME AS customerAccGroupName, 
            customer_master.customer.NAME AS customerName, 
            customer_master.customer.identityNo, 
            preRepairOrder.branchId, 
            Concat(customer_master.branch.code, ' - ', customer_master.branch.NAME) AS branchCodeName, 
            customer_master.branch.code AS branchCode, 
            customer_master.branch.NAME AS branchName, 
            customer_master.branch.countryId, 
            iUsers.fullname AS asName, 
            roStatus, 
            vehicle.chassisNo, 
            vehicle.chassisNo AS vehicleChassisNo, 
            vehicle.engineNo AS vehicleEngineNo, 
            Date_format(vehicle.registrationdate, "%d-%m-%y") AS vehicleRegistrationDate, 
            appointments.refNo AS appointmentsRefNo, 
            Date_format(appointments.appointmentdate, "%d-%m-%y") AS appointmentDate, 
            appointments.appointmentTime, 
            appointments.estimatedHours, 
            appointments.appointmentMethodId, 
            appointmentType.NAME AS appointmentTypeName, 
            preRepairOrder.waitingStatus, 
            variant.code AS variantCode, 
            variant.serviceModelCode, 
            variant.bodyTypeId, 
            variant.engineCode, 
            repairOrderType.code AS repairOrderTypeCode, 
            repairOrderType.NAME AS repairOrderTypeName, 
            appointmentMethod.NAME AS appointmentMethodName, 
            customerdetails.telephone AS customerTel, 
            customerdetails.mobile AS customerMobile, 
            customercontact.NAME AS contactName, 
            customercontact.telephone AS contactPersonTelephone, 
            customercontact.mobile AS contactPersonMobile, 
            preRepairOrder.contactPersonId, 
            customercontact.email AS contactPersonEmail, 
            customercontact.relationshipId, 
            roUser.fullname AS roUserfullName 
     FROM   service_master.PreRepairOrder AS preRepairOrder 


            LEFT JOIN spec_master.vehicle AS vehicle 
                   ON spec_master.vehicle.id = preRepairOrder.vehicleid
            LEFT JOIN service_master.repairOrderType AS repairOrderType 
                   ON repairOrderType.id = preRepairOrder.repairOrderTypeId 
            LEFT JOIN spec_master.variant AS variant 
                   ON spec_master.variant.id = preRepairOrder.variantid 
            LEFT JOIN spec_master.model AS model 
                   ON spec_master.model.id = spec_master.vehicle.modelid 
            LEFT JOIN customer_master.branch AS branch 
                   ON customer_master.branch.id = preRepairOrder.branchid 
            LEFT JOIN customer_master.customer AS customer 
                   ON customer_master.customer.id = preRepairOrder.customerid 
            LEFT JOIN customer_master.customerContact AS customercontact 
                   ON customercontact.id = preRepairOrder.contactpersonid 
            LEFT JOIN customer_master.customerDetails AS customerdetails 
                   ON customerdetails.customerid = preRepairOrder.customerid 
            LEFT JOIN customer_master.customerAccountGroup AS customeraccountgroup 
                   ON customeraccountgroup.id = customer.customeraccountgroupid 
            LEFT JOIN auth.internal_users AS iUsers 
                   ON iUsers.id = preRepairOrder.assignedsaid 
            LEFT JOIN auth.internal_users AS roUser 
                   ON roUser.id = preRepairOrder.createdby 
            LEFT JOIN service_master.appointments AS appointments 
                   ON appointments.id = preRepairOrder.appointmentsId 
            LEFT JOIN service_master.appointmentType AS appointmentType 
                   ON appointmentType.id = appointments.appointmentTypeId 
            LEFT JOIN service_master.appointmentMethod AS appointmentMethod 
                   ON appointmentMethod.id = appointments.appointmentMethodId 
            WHERE ${where}
            ORDER BY preRepairOrder.${orderBy[0]} ${orderBy[1]}
            LIMIT ?,?
            `, { replacements: [pagination.offset, pagination.limit], type: this.sequelize.QueryTypes.SELECT })
                .then(async dbRes => {
                    const finalResponse = await Promise.all(dbRes.map(async x => {
                        x.preRepairOrderFlatRates = await this.sequelize.query(`SELECT preRepairOrderFlatRate.id,preRepairOrderFlatRate.billTo,preRepairOrderFlatRate.hours, preRepairOrderFlatRate.isSplit, (CASE WHEN (preRepairOrderFlatRate.recommendation = 1) THEN 'true' ELSE 'false' END) AS recommendation,
                    FORMAT(preRepairOrderFlatRate.discountAmount,2) AS discountAmount,FORMAT(preRepairOrderFlatRate.discountPercent,2) AS discountPercent, 
                    FORMAT(preRepairOrderFlatRate.taxAmount,2) AS taxAmount,FORMAT(preRepairOrderFlatRate.unitAmount,2) AS unitAmount, 
                    FORMAT(preRepairOrderFlatRate.amount,2) AS amount,preRepairOrderFlatRate.billToName, 
                    FORMAT(preRepairOrderFlatRate.totalAmount,2) AS totalAmount,preRepairOrderFlatRate.reassignedTechnicianId, 
                    preRepairOrderFlatRate.vendorId,preRepairOrderFlatRate.reassignedTechnicianName, 
                    preRepairOrderFlatRate.chargeType,preRepairOrderFlatRate.resolvedStatus, 
                    preRepairOrderFlatRate.remark,preRepairOrderFlatRate.warrantyIncidentId,preRepairOrderFlatRate.status,preRepairOrderFlatRate.bayMasterId,preRepairOrderFlatRate.jobsId, 
                    preRepairOrderFlatRate.jobClassId,preRepairOrderFlatRate.jobTypeId,preRepairOrderFlatRate.servicePackageId, 
                    job.id AS jobId,job.code AS jobCode,job.name AS jobName,
                    job.materialId AS jobMaterialId,job.poGeneration AS jobPoGeneration,job.jobGroupId AS jobJobGroupId, 
                    job.jobClassId AS jobJobClassId,job.jobTypeId AS jobJobTypeId,job.jobCatalogId AS jobJobCatalogId, 
                    job.servicePackageId AS jobServicePackageId,jobClass.id AS jobClassId,jobClass.code AS jobClassCode, 
                    jobClass.name AS jobClassName,jobClass.qcbyforeman AS jobClassQcbyforeman,jobType.id AS jobTypeId, 
                    jobType.code AS jobTypeCode,jobType.name AS jobTypeName,materialMasterBasicinfo.materialDescription AS materialDescription, materialMasterBasicinfo.materialId AS materialCode,servicePackage.code AS servicePackageCode, servicePackage.name AS servicePackageName,servicePackage.validFrom AS servicePackageValidFrom,
                    servicePackage.validTo AS servicePackageValidTo

                    FROM preRepairOrderFlatRate AS preRepairOrderFlatRate 
                    LEFT JOIN servicePackage AS servicePackage ON servicePackage.id = preRepairOrderFlatRate.servicePackageId
                    INNER JOIN jobs AS job ON preRepairOrderFlatRate.jobsId = job.id AND job.deleted = 0 
                    INNER JOIN jobClass AS jobClass ON preRepairOrderFlatRate.jobClassId = jobClass.id AND jobClass.deleted = 0 
                    INNER JOIN jobType AS jobType ON preRepairOrderFlatRate.jobTypeId = jobType.id AND jobType.deleted = 0
                    LEFT JOIN general_master.materialMasterBasicinfo AS materialMasterBasicinfo ON materialMasterBasicinfo.id = job.materialId 
                    WHERE preRepairOrderFlatRate.preRepairOrderId = ? 
                    AND preRepairOrderFlatRate.deleted = 0
                    `, {
                            replacements: [x.id], type: this.sequelize.QueryTypes.SELECT
                        });
                        x.preRepairOrderParts = await this.sequelize.query(`SELECT preRepairOrderParts.id, preRepairOrderParts.workshopStocks,FORMAT(preRepairOrderParts.quantity,0) AS quantity,preRepairOrderParts.billTo,FORMAT(preRepairOrderParts.discountAmount,2) AS discountAmount,
                    FORMAT(preRepairOrderParts.discountPercent,0) AS discountPercent,FORMAT(preRepairOrderParts.taxAmount,2) AS taxAmount,FORMAT(preRepairOrderParts.totalAmount,2) AS totalAmount,FORMAT(preRepairOrderParts.unitAmount,0) AS unitAmount,
                    preRepairOrderParts.materialMasterId,preRepairOrderParts.materialId,preRepairOrderParts.uomId,FORMAT(preRepairOrderParts.amount,2) AS amount,preRepairOrderParts.billToName,
                    preRepairOrderParts.chargeType,preRepairOrderParts.currencyId,preRepairOrderParts.resolvedStatus,preRepairOrderParts.warrantyIncidentId,preRepairOrderParts.status,preRepairOrderParts.preRepairOrderId,preRepairOrderParts.jobsId,preRepairOrderParts.servicePackageId,
                    job.id AS jobId, job.code AS jobCode, job.name AS jobName,uom.code AS uomCode,servicePackage.code AS servicePackageCode, servicePackage.name AS servicePackageName,servicePackage.validFrom AS servicePackageValidFrom,
                    servicePackage.validTo AS servicePackageValidTo,materialMasterBasicinfo.materialId AS partCode,materialMasterBasicinfo.materialDescription AS partName,materialGroupCode.code AS partGroupCode,materialGroupCode.name AS partGroupName
                    
                    FROM service_master.preRepairOrderParts AS preRepairOrderParts 
                    LEFT JOIN general_master.materialMasterBasicinfo ON materialMasterBasicinfo.id = preRepairOrderParts.materialMasterId
                    LEFT JOIN general_master.materialGroupCode AS materialGroupCode ON materialGroupCode.id = materialMasterBasicinfo.materialGroupId
                    LEFT JOIN servicePackage AS servicePackage ON servicePackage.id = preRepairOrderParts.servicePackageId
                    LEFT JOIN service_master.jobs AS job ON preRepairOrderParts.jobsId = job.id AND job.deleted = 0 
                    LEFT JOIN general_master.uom AS uom ON preRepairOrderParts.uomId = uom.id AND uom.deleted = 0
                    WHERE preRepairOrderParts.preRepairOrderId = ? AND 
                    preRepairOrderParts.deleted = 0`, {
                            replacements: [x.id], type: this.sequelize.QueryTypes.SELECT
                        });
                        x.preRepairOrderPackages = await PreRepairOrderPackagesModel.findAll({
                            attributes: ['id', 'chargeType', 'quantity', 'billTo', 'billToName',
                                [this.sequelize.fn('FORMAT', this.sequelize.col('taxAmount'), '2'), 'taxAmount'],
                                [this.sequelize.fn('FORMAT', this.sequelize.col('totalAmount'), '2'), 'totalAmount'],
                                'status', 'servicePackageId'],
                            where: {
                                preRepairOrderId: x.id,
                                deleted: 0
                            },
                            include: [
                                {
                                    model: ServicePackageModel,
                                    attributes: ['id', 'code', 'name', 'companyId', 'branchId', 'makeId', 'businessStreamId', 'packageTypeId', 'externalKey', 'mileageFrom', 'mileageTo', 'validFrom', 'validTo', 'currencyId', 'changable', 'expressService', 'priceBy',
                                        [this.sequelize.fn('FORMAT', this.sequelize.col('totalLabour'), '0'), 'totalLabour'],
                                        [this.sequelize.fn('FORMAT', this.sequelize.col('totalParts'), '0'), 'totalParts'],
                                        [this.sequelize.fn('FORMAT', this.sequelize.col('totalSublet'), '0'), 'totalSublet'],
                                        [this.sequelize.fn('FORMAT', this.sequelize.col('serviceTax'), '2'), 'serviceTax'],
                                        [this.sequelize.fn('FORMAT', this.sequelize.col('netPrice'), '2'), 'netPrice'],
                                        'status'],
                                    where: {
                                        deleted: 0
                                    }
                                }
                            ]
                        });

                        // x.warrantyIncidents = await this.sequelize.query(`SELECT warrantyIncident.id,warrantyIncident.warrantyIncidentNo,warrantyClaimFormNo,warrantyClaimStatusId,warrantyProfileId, 
                        // DATE_FORMAT(warrantyExpiredDate, '%d-%m-%Y') AS warrantyExpiredDate,warrantyClaimTypeId,warrantyCategoryId,
                        // warrantyClaimCategoryId,warrantyAppovalNumber,defectMaterialId,symptomCategoryId,symptomCodeId, 
                        // troubleCodeId,warrantyClassCodeId,sourceofProblemId,pNCCodeId,problem,cause,rectification, 
                        // remarksNSDOfficer, FORMAT(totalLabour, '0') AS totalLabour, FORMAT(totalPart, '0') AS totalPart, 
                        // FORMAT(taxAmount, '2') AS taxAmount, FORMAT(totalAmount, '2') AS totalAmount,warrantyIncident.status AS warrantyIncidentStatus, 
                        // partsPurchaseInvoiceNo,warrantySymptomCategoryId, warrantyCategory.name AS warrantyCategoryName,warrantyCategory.code AS warrantyCategoryCode,
                        // warrantyClaimType.name AS warrantyClaimTypeName,warrantyClaimType.code AS warrantyClaimTypeCode,
                        // warrantyClaimCategory.name AS warrantyClaimCategoryName,warrantyClaimCategory.code AS warrantyClaimCategoryCode,warrantyIncident.createdBy,internal_users.fullName AS createdByName,warrantyIncident.createdAt
                        // FROM warrantyIncident AS warrantyIncident 
                        // LEFT JOIN general_master.warrantyCategory AS warrantyCategory ON warrantyCategory.id = warrantyIncident.warrantyCategoryId
                        // LEFT JOIN service_master.warrantyClaimType AS warrantyClaimType ON warrantyClaimType.id = warrantyIncident.warrantyClaimTypeId
                        // LEFT JOIN service_master.warrantyClaimCategory AS warrantyClaimCategory ON warrantyClaimCategory.id = warrantyIncident.warrantyClaimCategoryId
                        // LEFT JOIN auth.internal_users AS internal_users ON internal_users.id = warrantyIncident.createdBy 
                        // WHERE service_master.warrantyIncident.deleted = 0 AND 
                        // warrantyIncident.repairOrderId = ?`,{ 
                        //     replacements: [x.id], type: sequelize.QueryTypes.SELECT 
                        // });

                        // x.repairOrderInsurance = await RepairOrderInsurance.findOne({
                        //     where:{
                        //         deleted:0,
                        //         repairOrderId:x.id,
                        //     },
                        //     attributes:['id', 'companyCode', 'companyName', 'approvalNumber', 
                        //     [sequelize.fn('DATE_FORMAT', sequelize.col('vehicleAccidentDate'), "%d-%m-%Y"), 'vehicleAccidentDate'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('approvalAmount'), '2'), 'approvalAmount'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('totalLabour'), '0'), 'totalLabour'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('totalPart'), '0'), 'totalPart'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('tax'), '2'), 'tax'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('processingFees'), '2'), 'processingFees'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('towingCharges'), '2'), 'towingCharges'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('totalAmount'), '2'), 'totalAmount'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('payableAmount'), '2'), 'payableAmount'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('underinsuredAmount'), '2'), 'underinsuredAmount'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('underinsuredAmountWaiver'), '2'), 'underinsuredAmountWaiver'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('bettermentAmount'), '2'), 'bettermentAmount'],
                        //     [sequelize.fn('FORMAT', sequelize.col('bettermentAmountWaiver'), '2'), 'bettermentAmountWaiver'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('accessAmountWaiver'), '2'), 'accessAmountWaiver'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('accessAmount'), '2'), 'accessAmount'], 
                        //     [sequelize.fn('FORMAT', sequelize.col('customerPayableTax'), '2'), 'customerPayableTax'], 
                        //     'introducerCode', 'introducerId', 'introducerName', 'introducerContactNumber', 'introducerCommission', 'status','accessAmountWaiver','bettermentAmountWaiver','underinsuredAmountWaiver']
                        // });

                        // x.uploadAttachments = await UploadAttachment.findAll({
                        //     where:{
                        //         deleted:0,
                        //         repairOrderId:x.id,
                        //     },
                        //     attributes:['id', 'fileName', 'fileURL']
                        // });

                        // x.purchaseOrders = await PurchaseOrder.findAll({
                        //     where:{
                        //         deleted:0,
                        //         roId:x.id,
                        //     },
                        //     attributes:['id',
                        //     [sequelize.fn('DATE_FORMAT', sequelize.col('poDate'), "%d-%m-%Y"), 'poDate'],
                        //     'poType','poNumber','status','vendorBasicId','vendorName','supplierAddress','supplierPhone','companyId','billingAddress','billingPhone','roNumber',
                        //     [sequelize.fn('DATE_FORMAT', sequelize.col('roDate'), "%d-%m-%Y"), 'roDate'],
                        //     'customerName','roId'],
                        //     include:[
                        //         {
                        //             model:POitems,
                        //             where:{
                        //                 deleted:0
                        //             },
                        //             attributes:['id','code','description','quantity','unitCost','unitSellingPrice','totalSellingPrice','totalCost','supplierInvoiceNo',
                        //             [sequelize.fn('DATE_FORMAT', sequelize.col('supplierInvoiceDate'), "%d-%m-%Y"), 'supplierInvoiceDate'],
                        //             'supplierInvoiceUpdate',
                        //             'deliveryOrderNo','deliveryTo','deliveryAddress','itemCategory','relatedJobs','status','remark','purchaseOrderId']
                        //         }
                        //     ]
                        // })

                        return x;
                    }));
                    resolve({
                        count: count,
                        rows: finalResponse
                    })
                }).catch(err => reject(err));
        })
    }

    // LEFT JOIN service_master.preRepairOrderType AS preRepairOrderType ON service_master.preRepairOrderType.id = preRepairOrder.preRepairOrderTypeId
    static getProData(appointmentsId) {
        return new Promise(async (resolve, reject) => {
            this.sequelize.query(`
            SELECT preRepairOrder.id, 
            preRepairOrder.refno AS vehicleRegNo, 
            preRepairOrder.roPrintDate,
            preRepairOrder.proNumber, 
            preRepairOrder.proStatus, 
            preRepairOrder.status, 
            appointmentsId, 
            appointmentTypeId,
            preRepairOrder.repairOrderTypeId,  
            preRepairOrder.mileageLast, 
            preRepairOrder.mileageCurrent, 
            preRepairOrder.vehicleId, 
            preRepairOrder.makeId, 
            preRepairOrder.modelId, 
            preRepairOrder.variantId, 
            preRepairOrder.createdAt, 
            preRepairOrder.updatedAt, 
            preRepairOrder.updatedBy, 
            preRepairOrder.createdBy, 
            preRepairOrder.currencyId, 
            preRepairOrder.remarks, 
            preRepairOrder.roReleasedDate, 
            preRepairOrder.arrivalTime, 
            preRepairOrder.customerTypeId, 
            preRepairOrder.assignedSAId, 
            iUsers.fullname AS saFullName, 
            iUsers.employeeid AS saEmployeeID, 
     
            repairOrderDate, 
            repairOrderTime, 
            preRepairOrder.vehicleRegNo, 
            model.NAME AS modelName, 
            preRepairOrder.customerId, 
            preRepairOrder.contactRelationship, 
            Concat(customer_master.customer.NAME, ' - ', customer_master.customer.identityno) AS customerNameIdno, 
            customeraccountgroup.id AS customerAccGroupId, 
            customeraccountgroup.NAME AS customerAccGroupName, 
            customer_master.customer.NAME AS customerName, 
            customer_master.customer.identityNo, 
            preRepairOrder.branchId, 
            Concat(customer_master.branch.code, ' - ', customer_master.branch.NAME) AS branchCodeName, 
            customer_master.branch.code AS branchCode, 
            customer_master.branch.NAME AS branchName, 
            customer_master.branch.countryId, 
            iUsers.fullname AS asName, 
            roStatus, 
            vehicle.chassisNo, 
            vehicle.chassisNo AS vehicleChassisNo, 
            vehicle.engineNo AS vehicleEngineNo, 
            Date_format(vehicle.registrationdate, "%d-%m-%y") AS vehicleRegistrationDate, 
            appointments.refNo AS appointmentsRefNo, 
            Date_format(appointments.appointmentdate, "%d-%m-%y") AS appointmentDate, 
            appointments.appointmentTime, 
            appointments.estimatedHours, 
            appointments.appointmentMethodId, 
            appointmentType.NAME AS appointmentTypeName, 
            preRepairOrder.waitingStatus, 
            variant.code AS variantCode, 
            variant.serviceModelCode, 
            variant.bodyTypeId, 
            variant.engineCode, 
            repairOrderType.code AS repairOrderTypeCode, 
            repairOrderType.NAME AS repairOrderTypeName, 
            appointmentMethod.NAME AS appointmentMethodName, 
            customerdetails.telephone AS customerTel, 
            customerdetails.mobile AS customerMobile, 
            customercontact.NAME AS contactName, 
            customercontact.telephone AS contactPersonTelephone, 
            customercontact.mobile AS contactPersonMobile, 
            preRepairOrder.contactPersonId, 
            customercontact.email AS contactPersonEmail, 
            customercontact.relationshipId, 
            roUser.fullname AS roUserfullName 
     FROM   service_master.PreRepairOrder AS preRepairOrder 

            LEFT JOIN spec_master.vehicle AS vehicle 
                   ON spec_master.vehicle.id = preRepairOrder.vehicleid
            LEFT JOIN service_master.repairOrderType AS repairOrderType 
                   ON repairOrderType.id = preRepairOrder.repairOrderTypeId 
            LEFT JOIN spec_master.variant AS variant 
                   ON spec_master.variant.id = preRepairOrder.variantid 
            LEFT JOIN spec_master.model AS model 
                   ON spec_master.model.id = spec_master.vehicle.modelid 
            LEFT JOIN customer_master.branch AS branch 
                   ON customer_master.branch.id = preRepairOrder.branchid 
            LEFT JOIN customer_master.customer AS customer 
                   ON customer_master.customer.id = preRepairOrder.customerid 
            LEFT JOIN customer_master.customerContact AS customercontact 
                   ON customercontact.id = preRepairOrder.contactpersonid 
            LEFT JOIN customer_master.customerDetails AS customerdetails 
                   ON customerdetails.customerid = preRepairOrder.customerid 
            LEFT JOIN customer_master.customerAccountGroup AS customeraccountgroup 
                   ON customeraccountgroup.id = customer.customeraccountgroupid 
            LEFT JOIN auth.internal_users AS iUsers 
                   ON iUsers.id = preRepairOrder.assignedsaid 
            LEFT JOIN auth.internal_users AS roUser 
                   ON roUser.id = preRepairOrder.createdby 
            LEFT JOIN service_master.appointments AS appointments 
                   ON appointments.id = preRepairOrder.appointmentsId 
            LEFT JOIN service_master.appointmentType AS appointmentType 
                   ON appointmentType.id = appointments.appointmentTypeId 
            LEFT JOIN service_master.appointmentMethod AS appointmentMethod 
                   ON appointmentMethod.id = appointments.appointmentMethodId 
            WHERE preRepairOrder.appointmentsId = ?
             `, { replacements: [appointmentsId], type: this.sequelize.QueryTypes.SELECT })
                .then((rows) => {
                    resolve(rows)
                }).catch(err => reject(err));
        })
    }
}