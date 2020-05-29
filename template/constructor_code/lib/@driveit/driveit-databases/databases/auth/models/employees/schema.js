const Sequelize = require("sequelize");
const UserEnum = require("../enums/User");
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        employeeId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        role: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: UserEnum.VIEWER,
            values: [UserEnum.roles],
        },
        serviceStartDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        serviceEndDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        isJvsActivation: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: UserEnum.PENDING,
            values: [UserEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                NOT_UNIQUE: function (deleted, next) {
                    if(deleted){
                        return next();
                    }

                    const Model = require('.')
                    if (this.branchId) {
                    return Model.getAll({employeeId: this.employeeId, branchId: this.branchId}).then((records)=> {
                        if(!records) return next();

                        records.forEach((record) => {
                            if(record.deleted == false){
                                return next(errorDef.NOT_UNIQUE.message);
                            }
                        })

                        return next();
                    })
                } else {
                    return Model.getAll({employeeId: this.employeeId}).then((records)=> {
                        if(!records) return next();

                        records.forEach((record) => {
                            if(record.deleted == false){
                                return next(errorDef.NOT_UNIQUE.message);
                            }
                        })

                        return next();
                    })
                }
                   
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
        vendorId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        isEmployee: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        countryId: {
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
        internalUserId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        employeePositionId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        employeeTypeId: {
            type: Sequelize.UUID,
            allowNull: true
        }
    };
}