const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: { // get from id services
            type: Sequelize.STRING,
            primaryKey: true
        },
        documentNo: {
            type: Sequelize.STRING,
            allowNull:true
        },
        documentDate: {
            type: Sequelize.DATE,
            allowNull:true
        },
        effectiveDate: {
            type: Sequelize.DATE,
            allowNull:true
        },
        expiryDate: {
            type: Sequelize.DATE,
            allowNull:true
        },
        customerId: {
            type: Sequelize.STRING,
            allowNull:true
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull:true
        },
        commitmentInterval: {
            type: Sequelize.STRING,
            allowNull:true
        },
        billingAddress: {
            type: Sequelize.STRING,
            allowNull:true
        },
        leasingBillId:{
            type: Sequelize.STRING,
            allowNull:true
        },
        leasingBillCode:{
            type: Sequelize.STRING,
            allowNull:true
        },
        internalBillingId: {
            type: Sequelize.STRING,
            allowNull:true
        },
        internalBillingCode: {
            type: Sequelize.STRING,
            allowNull:true
        },
        contractBranchId: {
            type: Sequelize.STRING,
            allowNull:true
        },
        contractBranchCode: {
            type: Sequelize.STRING,
            allowNull:true
        },
        uomId: {
            type: Sequelize.STRING,
            allowNull:true
        },
        currencyId: {
            type: Sequelize.STRING,
            allowNull:true
        },
        labourTaxRate: {
            type: Sequelize.STRING,
            allowNull:true
        },
        partsTaxRates: {
            type: Sequelize.STRING,
            allowNull:true
        },
        taxIncluded: {
            type: Sequelize.STRING,
            allowNull:true
        },
        labour: {
            type: Sequelize.STRING,
            allowNull:true
        },
        parts: {
            type: Sequelize.STRING,
            allowNull:true
        },
        sublet: {
            type: Sequelize.STRING,
            allowNull:true
        },
        lubricants: {
            type: Sequelize.STRING,
            allowNull:true
        },
        breakdown: {
            type: Sequelize.STRING,
            allowNull:true
        },
        remarks: {
            type: Sequelize.STRING,
            allowNull:true
        },

        tenantId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        companyId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        branchId: {
            type: Sequelize.UUID,
            allowNull: true
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            // validate: {
            //     NOT_UNIQUE: function (deleted, next) {
            //         if(deleted){
            //             return next();
            //         }

            //         const Education = require('.')
            //         let self = this;
            //         return Education.getOne({id: self.id}).then((record)=> {
            //             if(!record) return next();
            //             //get all code
            //             return Education.getAll({
            //                 code: record.code
            //                 })
            //                 .then(function (record) {
            //                     record.forEach((record) => {
            //                         if (record && !record.deleted && self.id != record.id) {
            //                             return next(errorDef.NOT_UNIQUE.message);
            //                         }
            //                     })
            //                     return next();
            //                 })
            //                 .catch(function (err) {
            //                     return next(err);
            //                 });
            //         })
                   
            //     }
            // }
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        }
    };
}