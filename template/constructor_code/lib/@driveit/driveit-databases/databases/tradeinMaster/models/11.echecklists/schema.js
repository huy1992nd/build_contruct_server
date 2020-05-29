const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status]
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ""
        },
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1,
            unique: true
        },
        refNo: {
            type: Sequelize.STRING
        },       
        uvPurposeId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        uvStatusId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        uvStatusCode: {
            type: Sequelize.STRING
        },
        ecDate:{
            type: Sequelize.DATEONLY,
        }, 
        companyId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        companycode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        companyname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        compregistrationno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        companyaddressid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        regioncode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        regionname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        branchid: {
            type: Sequelize.UUID,
            allowNull: true
        },
        branchcode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        branchname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        branchaddressid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vehicleId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        registrationno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        retentionno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        makeId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        makecode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        makename: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modelId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        modelgroupid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modelgroupcode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modelgroupname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modeldescription: {
            type: Sequelize.STRING,
            allowNull: true
        },
        colourdescription: {
            type: Sequelize.STRING,
            allowNull: true
        },
        variantId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        colorId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        transmissionTypeId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        transmissiontypecode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        transmissiontypename: {
            type: Sequelize.STRING,
            allowNull: true
        },
        registrationdate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        yearRegistration: {
            type: Sequelize.SMALLINT,
            allowNull: true
        },
        yearmake: {
            type: Sequelize.SMALLINT,
            allowNull: true
        },
        chassisno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        engineno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        assemblyTypeId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        assemblytypename: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mileage: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        mileageAvg: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        vehicleBookingId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingdate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        customerid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        custfullname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        custcategorycode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        custidno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        custmailingaddressid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        custhousetelno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        custmobiletelno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        salespersonid: {
            type: Sequelize.UUID,
            allowNull: true
        },
        salespersoncode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        salespersonname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvinvoiceid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvinvoiceno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvinvoicedate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        nvtradeinvalue: {
            type: Sequelize.DECIMAL(15,2),
            allowNull: true
        },
        nvproductid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvmakecode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvmakename: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvmodelgroupid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvmodelgroupcode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvmodelgroupname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvmodelid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvmodelcode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvmodelname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvmodeldesc: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvVariantId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nvVariantName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isThirdPartyVehicle: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        vehicleBookingTradeInDetailId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        thirdpartyfullname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        thirdpartyrelationship: {
            type: Sequelize.STRING,
            allowNull: true
        },
        thirdpartynewicno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        thirdpartyoldicno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        thirdpartycompregistrationno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        thirdpartyaddressid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        thirdpartycontactno1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        thirdpartycontactno2: {
            type: Sequelize.STRING,
            allowNull: true
        },
        thirdpartyreferenceno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        integrationSrc: {
            type: Sequelize.STRING,
            allowNull: true
        },
        customerAskPrc: {
            type: Sequelize.DECIMAL(15,2),
            allowNull: true
        },
        capInitial: {
            type: Sequelize.DECIMAL(15,2),
            allowNull: true
        },
        estRepairCost: {
            type: Sequelize.DECIMAL(15,2),
            allowNull: true
        },
        offerPrc: {
            type: Sequelize.DECIMAL(15,2),
            allowNull: true
        },
        surrenderDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        surrenderBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        surrenderfullname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastInspectionId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        overallCondId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        inspectionCount: {
            type: Sequelize.SMALLINT,
            allowNull: true
        },
        edisposalId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastOfferPrcAt: {
            type: Sequelize.DATE,
        },
        isCancelled: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
            defaultValue: 0
        },
        cancelledAt: {
            type: Sequelize.DATE,
        },
        cancelledBy:{
            type: Sequelize.STRING
        },
        cancelledfullname:{
            type: Sequelize.STRING
        },
        cancelledRemark: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updatedSrc:{
            type: Sequelize.STRING
        },
        ecRegno: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ecMakecode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ecMakename: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ecModelgroupcode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ecModelgroupname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ecYearmake: {
            type: Sequelize.SMALLINT,
            allowNull: true
        },
        remark: {
            type: Sequelize.STRING,
            allowNull: true
        },
        prevUVStatusId: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }
}