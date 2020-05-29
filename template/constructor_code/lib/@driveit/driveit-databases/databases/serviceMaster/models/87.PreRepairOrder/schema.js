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
            allowNull: true,
        },
        proNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        appointmentsId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'appointments',
                key: 'id'
            },
        },
        repairOrderTypeId: {
            type: Sequelize.UUID,
            references: {
                model: 'repairOrderType',
                key: 'id'
            },
        },
        repairOrderDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        repairOrderTime: {
            type: Sequelize.TIME,
            allowNull: true,
        },
        arrivalTime: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        customerTypeId: {
            type: Sequelize.STRING,
            allowNull: true,
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
        // vehicle details
        vehicleRegNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vehicleId: {
            type: Sequelize.STRING,
            allowNull: true,
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
            allowNull: true,
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
            allowNull: true,
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
        contactPersonId:{
            type: Sequelize.STRING,
            allowNull:true
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
            values: [StatusEnum.roStatus],
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
        remarks: {
            type: Sequelize.STRING
        },
        waitingStatus: {
            type: Sequelize.STRING,
            allowNull: true,
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
            allowNull: false
        }
    };
}