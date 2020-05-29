const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

const PaymentStatus = {
    OPEN: 'open',
    CLOSED: 'closed'
};

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        customerId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        paymentDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        paymentType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        currencyId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        paymentAmount: {
            type: Sequelize.STRING,
            allowNull: false
        },
        remainingAmount: {
            type: Sequelize.STRING,
            allowNull: false
        },
        referenceNo: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: PaymentStatus.OPEN,
            values: [PaymentStatus.OPEN, PaymentStatus.CLOSED],

        },
        module: {
            type: Sequelize.STRING,
            allowNull: false
        },
        orderNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deleted: {
            type: Sequelize.BOOLEAN
        }

    }
}