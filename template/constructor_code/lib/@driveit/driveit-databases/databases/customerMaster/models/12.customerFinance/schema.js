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
        // customerDetailsId: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        // },
        customerId: {
            type: Sequelize.STRING,
            allowNull: false,
            // validate: {
            //     NOT_UNIQUE: function (customerId, next) {
            //         const Model = require('.')
            //         return Model.getAll({
            //             customerId
            //             })
            //             .then((res) => {
            //                 let recordArray = res.rows;
            //                 if(recordArray.length > 0) {
            //                     recordArray.forEach((record) => {
            //                         if (record && !record.deleted && this.tenantId == record.tenantId) {
            //                             return next(errorDef.NOT_UNIQUE.message);
            //                         }
            //                     })
            //                 }
            //                 return next();
            //             })
            //             .catch(function (err) {
            //                 return next(err);
            //             });
            //     }
            // }
        },
        tenantId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        customerGroupId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        paymentTermsId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        currencyId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        creditLimit: {
            type: Sequelize.STRING,
            allowNull: true
        },
        blockOptionsIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        taxClassId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        vatNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        /** ******************************** Standard Fields */
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        paymentMethodId: {
            type: Sequelize.STRING,
            allowNull: true
        },
    };
}