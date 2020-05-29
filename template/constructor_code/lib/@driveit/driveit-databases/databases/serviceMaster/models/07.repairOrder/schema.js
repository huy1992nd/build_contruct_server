const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        refNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        repairOrderDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        repairOrderTime: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        arrivalTime: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        customerTypeId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        currencyId: {
            type: Sequelize.STRING,
        },
        assignedSAId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        companyId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        // vehicle details
        vehicleRegNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        /*          appointmentsId: {
                     type: Sequelize.STRING,
                    allowNull: true,
                 }, */
        vehicleId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        makeId: {
            type: Sequelize.STRING,
        },
        modelId: {
            type: Sequelize.STRING,
        },
        variantId: {
            type: Sequelize.STRING,
        },
        vehicleChassisNo: {
            type: Sequelize.STRING,
        },
        vehicleEngineNo: {
            type: Sequelize.STRING,
        },
        mileageLast: {
            type: Sequelize.STRING,
        },
        mileageCurrent: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vehiclePurchaseDate: {
            type: Sequelize.STRING,
        },
        vehicleWarrantyExpiredDate: {
            type: Sequelize.STRING,
        },
        // product
        productId: {
            type: Sequelize.STRING,
        },
        // customer details
        customerId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        customerAccountGroupId: {
            type: Sequelize.STRING,
        },
        customerName: {
            type: Sequelize.STRING,
        },
        customerTel: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        customerAddress: {
            type: Sequelize.STRING,
        },
        contactName: {
            type: Sequelize.STRING,
        },
        contactTel: {
            type: Sequelize.STRING,
        },
        contactRelationship: {
            type: Sequelize.STRING,
        },
        contactPersonId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        contactIdentityType: {
            type: Sequelize.STRING,
        },
        contactIdentityNo: {
            type: Sequelize.STRING,
        },
        niscareType: {
            type: Sequelize.STRING,
        },
        niscareExpiryDate: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.appointmentStatus],
            defaultValue: StatusEnum.NEW,

        },
        proStatus: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.proStatus],
            defaultValue: StatusEnum.NEW,

        },
        roStatus: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.roStatusNew],
            defaultValue: StatusEnum.NEW,

        },
        roCreationDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        roPrintDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        roReleasedDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        sameAsCustomer: {
            type: Sequelize.BOOLEAN
        },
        proNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        remarks: {
            type: Sequelize.STRING
        },
        waitingStatus: {
            type: Sequelize.STRING,
        },
        hasCarWash: {
            type: Sequelize.BOOLEAN
        },
        carWashAmount: {
            type: Sequelize.FLOAT(10, 2)
        },
        clockInAction: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.carWashActions],
            defaultValue: 'waiting',
        },
        clockInDateTime: {
            type: Sequelize.DATE,
            allowNull: true
        },
        isAfterQc_Passed: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        currentBayLocationId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        }
    };
}