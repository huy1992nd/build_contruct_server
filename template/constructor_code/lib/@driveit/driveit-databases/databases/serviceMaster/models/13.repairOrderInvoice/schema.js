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
        invoiceNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        invoiceType: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.roInvoiceTypes]
        },
        invoiceDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        repairOrderDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        pdfPath: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        billTo: {
            type: Sequelize.STRING,
        },
        billToName: {
            type: Sequelize.STRING,
        },
        billingId: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ROINVOICE_KEYS.FINAL,
            values: [StatusEnum.roInvoiceStatus],
        },
        source: {
            type: Sequelize.STRING
        },

        tenantId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        companyId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        branchId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        cancelReason:{
           type:Sequelize.STRING,
        },

        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                NOT_UNIQUE: function (deleted, next) {
                    if (deleted) {
                        return next();
                    }

                    const Education = require('.')
                    let self = this;
                    return Education.getOne({ id: self.id }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return Education.getAll({
                            code: record.code
                        })
                            .then(function (record) {
                                record.forEach((record) => {
                                    if (record && !record.deleted && self.id != record.id) {
                                        return next(errorDef.NOT_UNIQUE.message);
                                    }
                                })
                                return next();
                            })
                            .catch(function (err) {
                                return next(err);
                            });
                    })
                }
            }
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