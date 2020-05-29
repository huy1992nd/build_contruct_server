const Sequelize = require('sequelize');
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        deleted: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status]
        },
        inactivateReason: {
            type: Sequelize.STRING
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        inactivateReason: {
            type: Sequelize.STRING
        },
        refNo: {
            type: Sequelize.STRING
        },
        edDate: {
            type: Sequelize.DATEONLY
        },
        uvRouteId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        companyId: {
            type: Sequelize.STRING
        },
        companycode: {
            type: Sequelize.STRING
        },
        companyname: {
            type: Sequelize.STRING
        },
        regioncode: {
            type: Sequelize.STRING
        },
        regionname: {
            type: Sequelize.STRING
        },
        branchid: {
            type: Sequelize.STRING
        },
        branchcode: {
            type: Sequelize.STRING
        },
        branchname: {
            type: Sequelize.STRING
        },
        companyId: {
            type: Sequelize.STRING
        },
        companycode: {
            type: Sequelize.STRING
        },
        companyname: {
            type: Sequelize.STRING
        },
        bookingid: {
            type: Sequelize.STRING
        },
        bookingno: {
            type: Sequelize.STRING
        },
        bookingdate: {
            type: Sequelize.DATE
        },
        salespersoncode: {
            type: Sequelize.STRING
        },
        salespersonname: {
            type: Sequelize.STRING
        },
        invoiceid: {
            type: Sequelize.STRING
        },
        invoiceno: {
            type: Sequelize.STRING
        },
        invoicedate: {
            type: Sequelize.DATE
        },
        make: {
            type: Sequelize.STRING
        },
        modelgroup: {
            type: Sequelize.STRING
        },
        modelgroupcode: {
            type: Sequelize.STRING
        },
        modelcode: {
            type: Sequelize.STRING
        },
        modelname: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        modeldesc: {
            type: Sequelize.STRING
        },
        registrationno: {
            type: Sequelize.STRING
        },
        registrationdate: {
            type: Sequelize.STRING
        },
        yearRegistration: {
            type: Sequelize.SMALLINT,
            defaultValue: 0
        },
        hobdm: {
            type: Sequelize.DECIMAL(15, 2),
            defaultValue: 0
        },
        adm: {
            type: Sequelize.DECIMAL(15, 2),
            defaultValue: 0
        },
        cashInLieuAccessories: {
            type: Sequelize.DECIMAL(15, 2),
            defaultValue: 0
        },
        cashInLieuWarranty: {
            type: Sequelize.DECIMAL(15, 2),
            defaultValue: 0
        },
        cashInLieuMaintenance: {
            type: Sequelize.DECIMAL(15, 2),
            defaultValue: 0
        },
        cashInLieuTotal: {
            type: Sequelize.DECIMAL(15, 2),
            defaultValue: 0
        },
        totalNVDiscount: {
            type: Sequelize.DECIMAL(15, 2),
            defaultValue: 0
        },
        saSacrifice: {
            type: Sequelize.DECIMAL(15, 2),
            defaultValue: 0
        },
        surrenderDate: {
            type: Sequelize.DATE
        },
        surrenderBy: {
            type: Sequelize.STRING
        },
        surrenderfullname: {
            type: Sequelize.STRING
        },
        tradeinmodel: {
            type: Sequelize.STRING
        },
        tradeinregistrationno: {
            type: Sequelize.STRING
        },
        tradeinyearmade: {
            type: Sequelize.SMALLINT,
            defaultValue: 0
        },
        tradeinMilleage: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        overallCondId: {
            type: Sequelize.UUID
        },
        customerAskPrc: {
            type: Sequelize.DECIMAL(15, 2)
        },
        capInitial: {
            type: Sequelize.DECIMAL(15, 2)
        },
        excessiveovertrade: {
            type: Sequelize.DECIMAL(15, 2)
        },
        nettradeinvalue: {
            type: Sequelize.DECIMAL(15, 2)
        },
        estRepairCost: {
            type: Sequelize.DECIMAL(15, 2)
        },
        tradeinhpamount: {
            type: Sequelize.DECIMAL(15, 2)
        },
        tradeinhpfinancierbranchname: {
            type: Sequelize.STRING
        },
        tradeinhpduedate: {
            type: Sequelize.DATE
        },
        prevCycleId: {
            type: Sequelize.STRING
        },
        lastCycleId: {
            type: Sequelize.UUID
        },
        lastRouteId: {
            type: Sequelize.UUID
        },
        lastRouteIdPG: {
            type: Sequelize.STRING
        },
        lastRouteIdDP: {
            type: Sequelize.UUID
        },
        createdname: {
            type: Sequelize.STRING
        },
        updatedname: {
            type: Sequelize.STRING
        },
        echeckListId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        sumcomment: {
            type: Sequelize.STRING
        },
        discretmargin: {
            type: Sequelize.DECIMAL(15, 2)
        },
        discretmarginstate: {
            type: Sequelize.DECIMAL(15, 2)
        },
        discretmarginregional: {
            type: Sequelize.DECIMAL(15, 2)
        },
        discretmarginhod: {
            type: Sequelize.DECIMAL(15, 2)
        },
        discretmarginsac: {
            type: Sequelize.DECIMAL(15, 2)
        },
        approvedDate: {
            type: Sequelize.DATEONLY
        },
        tradeinmakeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tradeinmakecode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tradeinmakename: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tradeinmodelgroupid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tradeinmodelgroupcode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tradeinmodelgroupname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isCancelled: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
            defaultValue: 0
        },
        cancelledAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        cancelledBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cancelledfullname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cancelledRemark: {
            type: Sequelize.STRING,
            allowNull: true
        },
        prevUVRouteId: {
            type: Sequelize.STRING,
            allowNull: true
        }
    };
};