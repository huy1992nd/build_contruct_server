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
        warrantyIncidentNo: {
            type: Sequelize.STRING,
        },
        warrantyClaimFormNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        warrantyClaimStatusId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        warrantyProfileId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        warrantyExpiredDate: {
            type: Sequelize.DATE,
            // allowNull: false
        },
        warrantyClaimTypeId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        warrantyClaimCategoryId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        warrantyAppovalNumber: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        defectMaterialId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        symptomCategoryId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        symptomCodeId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        troubleCodeId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        warrantyClassCodeId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        sourceofProblemId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        pNCCodeId: {
            type: Sequelize.UUID,
            // allowNull: false
        },
        problem: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        cause: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        rectification: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        remarksNSDOfficer: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        totalLabour: {
            type: Sequelize.DECIMAL(15, 6),
            // allowNull: false
        },
        totalPart: {
            type: Sequelize.DECIMAL(15, 6),
            // allowNull: false
        },
        taxAmount: {
            type: Sequelize.DECIMAL(15, 6),
            // allowNull: false
        },
        totalAmount: {
            type: Sequelize.DECIMAL(15, 6),
            // allowNull: false
        },
        partsPurchaseInvoiceNo: {
            type: Sequelize.DECIMAL(15, 6),
        },
        warrantySymptomCategoryId: {
            type: Sequelize.STRING,
        },
        currency: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'MYR'
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            defaultValue: 'New',
            values: [StatusEnum.recallStatuses],
        },
        // inactivateReason: {
        //     type: Sequelize.STRING,
        //     allowNull: true
        // },
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
                        //get all code
                        return Function.getAll({
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
        },
        fileName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fileUrl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        uploadBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        uploadDate: {
            type: Sequelize.STRING,
            allowNull: true
        }
    };
}