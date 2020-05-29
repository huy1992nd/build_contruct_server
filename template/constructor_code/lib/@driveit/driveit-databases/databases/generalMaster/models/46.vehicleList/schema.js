const Sequelize = require("sequelize");
const StatusEnum = require('../enums/vehicleStatus');
const errorDef = require('../../../../utils/error.codes');

const VoucherStatus = {
    SUCCESS: 'success',
    PENDING: 'pending'
};

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
            //allowNull:false
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: false,
            //defaultValue: Sequelize.UUIDV1
        },
        generatedDateTime: {
            type: Sequelize.STRING,
            //allowNull:false
        },
        uploadedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: VoucherStatus.PENDING,
            values: [VoucherStatus.SUCCESS, VoucherStatus.PENDING],
        },
        vouchers: {
            type: Sequelize.STRING
        },
        // createdBy: {
        //     type: Sequelize.STRING,
        //     allowNull: false
        // },
        // updatedBy: {
        //     type: Sequelize.STRING,
        //     allowNull: false
        // },
        deleted: {
            type: Sequelize.BOOLEAN
        }

    }
}