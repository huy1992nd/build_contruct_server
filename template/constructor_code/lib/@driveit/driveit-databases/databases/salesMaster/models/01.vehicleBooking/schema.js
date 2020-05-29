const Sequelize = require("sequelize");
const BookingStatusEnum = require('../enums/BookingStatus');
const AflStatusEnum = require('../enums/AflStatus');
const errorDef = require('../../../../utils/error.codes');
const StatusEnum = require('../enums/Status');
module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        bookingDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
        accessoriesFitmentStatus: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [AflStatusEnum.status]
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: BookingStatusEnum.NEW,
            values: [BookingStatusEnum.status]
        },
        statusProgress: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        buyerOrderDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        buyerOrderNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        purchaseOrderNo: {
            type: Sequelize.STRING,
            allowNull: true
        },

        exciseExempted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        salesTaxExempted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        registrationRegionId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        initialExtendedWarranty: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        // allocationDate: {
        //     type: Sequelize.STRING,
        //     allowNull: true
        // },
        louOfUndertaking: {
            type: Sequelize.STRING,
            allowNull: true
        },
        louDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        
        customerId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        holdBooking:{
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        allocatedDate:{
            type: Sequelize.DATE
        },
        // specialProgram: {
        //     type: Sequelize.STRING,
        //     allowNull: true
        // },
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
        vehicleId: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true // to support hasone with sourcekey. ref https://stackoverflow.com/a/60254410/1716806
        },
        makeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modelId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        variantId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        colorId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vehicleUsageId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        packageId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        
        paymentTermsId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        noOfDays: {
            type: Sequelize.STRING,
            allowNull: true
        },
        financierId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        aStateId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        aBranchId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        financierAddr: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        loanTenure: {
            type: Sequelize.DOUBLE(4, 1),
            allowNull: true
        },
        interestRate: {
            type: Sequelize.DOUBLE(4, 2),
            allowNull: true
        },
        loanAmount: {
            type: Sequelize.DECIMAL(13,2),
            allowNull: true
        },
        hpHandlingFee: {
            type: Sequelize.TEXT,
            allowNull: true
        },

        storageLocationId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        yearMake: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        enableAutoUnholdBooking: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        matching: {
            type: Sequelize.STRING,
            allowNull: true
        },
        invoiceNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        invoiceDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        odoNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        odoDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        odoAttachment: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mep: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // priceBreakDown: {
        //     type: Sequelize.DOUBLE,
        //     allowNull: true
        // },
        spos: {
            type: Sequelize.STRING,
            allowNull: true
        },
        salesPersonId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        leadId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        
        registrationNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        registrationDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        exchangeNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        roadTaxStartDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vehicleCurrentLocationId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        warrantyStickerDate:{
            type: Sequelize.STRING,
            allowNull: true
        },
        warrantyProfileId:{
            type: Sequelize.STRING,
            allowNull: true
        },


        insureSettlement: {
            type: Sequelize.STRING,
            allowNull: true
        },
        insurerOption: {
            type: Sequelize.STRING,
            allowNull: true
        },
        insurerId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        insurerReasonId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        otherInsurer: {
            type: Sequelize.STRING,
            allowNull: true
        },
        otherInsurerReason: {
            type: Sequelize.STRING,
            allowNull: true
        },

        optionalPackageIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        optionalItemIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        supplyItemIds: {
            type: Sequelize.STRING,
            allowNull: true
        },

        bookingNoFrom: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingNoTo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cancelReason: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        //temp
        refundAttachment: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
            // validate: {
            //     NOT_UNIQUE: function (deleted, next) {
            //         if (deleted) {
            //             return next();
            //         }
            
            //         const Model = require('.')
            //         let self = this;
            //         return Model.getOne({
            //             id: self.id
            //         }).then((record) => {
            //             if (!record) return next();
            
            //             return Model.getAll({
            //                     bookingNo: record.bookingNo
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