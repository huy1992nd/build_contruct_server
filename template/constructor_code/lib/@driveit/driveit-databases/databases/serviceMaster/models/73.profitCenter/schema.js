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
        code: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
            validate: {
                NOT_UNIQUE: function (code, next) {
                    const ProfitCenter = require('.')
                    let self = this;
                    return ProfitCenter.getAll({
                        code
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
                },
                len: {
                    args: [1, 20],
                    msg: "Code length is not in this range"
                },
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        countryId: {
            type: Sequelize.STRING(36),
            allowNull: false,
        },
        companyId: {
            type: Sequelize.STRING(36),
            allowNull: false,
        },
        chartOfAccount: {
            type: Sequelize.STRING(40),
        },
        // profitCenterGroupId: {
        //     type: Sequelize.STRING(36),
        // },
        // profitCostCenterCategoryId: {
        //     type: Sequelize.STRING(36),
        // },
        currencyId: {
            type: Sequelize.STRING(36),
            allowNull: false,
        },
        address1: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address2: {
            type: Sequelize.STRING,
        },
        address3: {
            type: Sequelize.STRING,
        },
        mPostcodeId: {
            type: Sequelize.STRING(36),
        },
        cityId: {
            type: Sequelize.STRING(36),
        },
        stateId: {
            type: Sequelize.STRING(36),
        },
        employeeId: {
            type: Sequelize.STRING(36),
        },
        telephone: {
            type: Sequelize.STRING(50),
        },
        fax: {
            type: Sequelize.STRING(50),
        },
        email: {
            type: Sequelize.STRING(50),
        },

        bizstreamDimension:{
            type: Sequelize.STRING(15),
        },
        bizstreamDimensionName:{
            type: Sequelize.STRING(40),
        },

        tenantId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        tenantCompanyId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        tenantBranchId: {
            type: Sequelize.UUID,
            allowNull: true,
        },

        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING(2000),
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
    };
}