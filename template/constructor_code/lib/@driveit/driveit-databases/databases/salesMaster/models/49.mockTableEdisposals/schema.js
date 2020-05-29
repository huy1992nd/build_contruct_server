const Sequelize = require("sequelize");
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        edisposalNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        edisposalDate: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        uvRegistrationNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        chassisNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        engineNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        make: {
            type: Sequelize.STRING,
            allowNull: true
        },
        model: {
            type: Sequelize.STRING,
            defaultValue: false
        },
        variant: {
            type: Sequelize.STRING,
            allowNull: true
        },
        color: {
            type: Sequelize.STRING,
            allowNull: true
        },
        year: {
            type: Sequelize.STRING,
            allowNull: true
        },
        newVehicleBookingNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        newVehicleBookingDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        newVehicleInvoiceNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        newVehicleInvoiceDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        salesPersonName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        salesPersonEmployeeNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        uvdApprovedPrice: {
            type: Sequelize.STRING,
            allowNull: true
        },
        retailApprovedPrice: {
            type: Sequelize.STRING,
            allowNull: true
        },
        auctionApprovedPrice: {
            type: Sequelize.STRING,
            allowNull: true
        },
        futuresApprovedPrice: {
            type: Sequelize.STRING,
            allowNull: true
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