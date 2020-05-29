const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        bookingId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        vehicleId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            defaultValue: StatusEnum.EXCISEPAYMENTSTATUS.ALLOCATED,
            values: [StatusEnum.excisePaymentStatus],
        },
        fileName: {
            type: Sequelize.STRING(2000),
            allowNull: true
        },
        fileUrl: {
            type: Sequelize.STRING(2000),
            allowNull: true
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        remark: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        uploadBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // uploadDate: {
        //     type: Sequelize.DATE,
        //     allowNull: true
        // },
        uploadFileDate: {
            type: Sequelize.STRING(2000),
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
        customerIdentityNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        exciseNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        engineNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        releaseDate: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        role: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bankReceiptDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        submissionDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        responseDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        receivedDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        receiptNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        statusDetail: {
            type: Sequelize.STRING,
            allowNull: true
        },
        exciseMonthYear: {
            type: Sequelize.STRING,
            allowNull: true
        },
        exciseDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        customReferenceNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        exciseDuty: {
            type: Sequelize.DECIMAL(15,2),
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    };
}