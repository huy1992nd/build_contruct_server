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
        customerId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        customerPhone: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        assignedSAId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vehicleId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        /*         vehicleRegNo: {
                    type: Sequelize.STRING,
                    allowNull: false,
                }, */
        estimatedHours:{
          type: Sequelize.STRING,
          allowNull: true
        },
        appointmentDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        appointmentTime: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        /*         type: {
                    type: Sequelize.STRING,
                    allowNull: false,

                },
                method: {
                    type: Sequelize.STRING,
                    allowNull: false,

                }, */
        vehicleRegNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        makeId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        modelId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        variantId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        colorId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        remarks: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        mileageCurrent: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        teleCode:{
            type: Sequelize.STRING,
        },
        areaCode:{
            type: Sequelize.STRING,
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        idNumber: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        complaint: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.appointmentStatus],
            defaultValue: StatusEnum.NEW,

        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        tenantId: {
            type: Sequelize.STRING,
            allowNull: false,
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