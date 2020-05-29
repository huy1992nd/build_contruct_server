const Sequelize = require("sequelize");
const UsedVehicleBookingEnum = require('../enums/UsedVehicleBookingStatus');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        eDisposalId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        paymentTerms: {
            type: Sequelize.STRING,
            allowNull: true
        },
        disposalChannel: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [UsedVehicleBookingEnum.disposalManner]
        },
        buyerOrderDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        buyerOrderNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        carCollectionDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        futurePrice: {
            type: Sequelize.STRING,
            allowNull: true
        },
        auctionPrice: {
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
        branchName: {
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
            type: Sequelize.STRING,
            allowNull: true
        },
        interestRate: {
            type: Sequelize.DOUBLE(4, 2),
            allowNull: true
        },
        loanAmount: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        noOfDays: {
            type: Sequelize.STRING,
            allowNull: true
        },
        hpHandlingFee: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        insureSettlement: {
            type: Sequelize.STRING,
            allowNull: true
        },
        insurerPremium: {
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
        customerId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingStatus: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [UsedVehicleBookingEnum.statuses]
        },
        sellingPrice: {
            type: Sequelize.STRING,
            allowNull: true
        },
        inspectionFee: {
            type: Sequelize.STRING,
            allowNull: true
        },
        handlingFee: {
            type: Sequelize.STRING,
            allowNull: true
        },
        numberPlateFee: {
            type: Sequelize.STRING,
            allowNull: true
        },
        roadTaxYear: {
            type: Sequelize.STRING,
            allowNull: true
        },
        roadTaxAmount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ownershipTranferFee: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ownershipClaimFee: {
            type: Sequelize.STRING,
            allowNull: true
        },
        totalSellingPrice: {
            type: Sequelize.STRING,
            allowNull: true
        },
        downpaymentInclusiveAmount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        hpLoanAmount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        balancePayable: {
            type: Sequelize.STRING,
            allowNull: true
        },
        usedVehicleBookingNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        customerIdentityNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },

        tenantId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vehicleId: {
            type: Sequelize.CHAR(36),
            allowNull: true
        },
        vehicleRegNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        makeName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modelName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        variantName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        invoiceNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        invoiceDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        odoNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        odoDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        odoAttachment: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
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