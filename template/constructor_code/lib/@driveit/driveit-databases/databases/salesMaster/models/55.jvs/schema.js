const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');
module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            // defaultValue: Sequelize.UUIDV1
        },
        companyId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        companyName: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        tenantId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        generatingBranchId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        generatingBranchName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        salesId: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: '00000000-0000-0000-0000-000000000000'
        },
        salesName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        salesCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        invoiceBranchId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        amount: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
        },
        entry: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        // refer vehiclebooking table
        vehicleInvoiceId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        invoiceNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        invoiceDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        packageId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // refer jvsGroup table
        jvsGroupId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        // refer jvsTypesControl
        jvsTypesControlId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        isManual: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.JVSTRANSACTIONTYPE.MANUAL,
            values: [StatusEnum.jvsTransactionType],
        },
        vendorId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        remarks: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Description length is not in this range"
                },
            }
        },

        payrollYear: {
            type: Sequelize.INTEGER(4),
            allowNull: true
        },
        payrollMonth: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        jvsCalendarPeriodId: {
            type: Sequelize.UUID,
            defaultValue: '00000000-0000-0000-0000-000000000000'
        },
        jvsCalendarId: {
            type: Sequelize.UUID,
            defaultValue: '00000000-0000-0000-0000-000000000000'
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.JVSSTATUS.APPROVED,
            values: [StatusEnum.jvsStatus],
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

                    const Function = require('.')
                    let self = this;
                    return Function.getOne({ id: self.id }).then((record) => {
                        if (!record) return next();
                        return Function.getAll({
                            id: record.id
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
        jvsDate: {
            type: Sequelize.STRING,
            allowNull: false
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