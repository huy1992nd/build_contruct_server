const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

const STATUS = {
    NEW: "New",
    APPROVED: "Approved",
    PENDING: "Pending",
    RETURN: "Returned",
    REJECT: "Rejected",
    CLOSED: "Closed",
    CANCELLED: "Cancelled"
};

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        branchId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        branchCode: {
            type: Sequelize.STRING
        },
        branchName: {
            type: Sequelize.STRING
        },
        vehicleBookingId: {
            type: Sequelize.STRING
        },
        vehicleRegNo: {
            type: Sequelize.STRING
        },
        modelId: {
            type: Sequelize.STRING
        },
        vehicleChassisNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vehicleRegDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        customerId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        makeId: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM,
            values: StatusEnum.WARRANTY_APPROVAL_STATUS,
            allowNull: false,
            defaultValue: STATUS.NEW
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    };
}