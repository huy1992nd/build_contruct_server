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
/*             unique: {
                code: 'DUPLICATE_EMAIL',
                msg: 'This email is already taken.',
                fields: ['email']
            }, */
            validate: {
                isEmail: true,
                DUPLICATE_EMAIL: function (deleted, next) {
                  
                    const Model = require('.')
                    return Model.getAll({email: this.email}).then((records)=> {
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
        },
        employeeId: {
            type: Sequelize.STRING,
            allowNull: true,
            // validate: {
            //     NOT_UNIQUE: function (employeeId, next) {

            //         const Index = require('.')
            //         let self = this;
            //         return Index.getAll({
            //             employeeId
            //             })
            //             .then(function (record) {
            //                 record.forEach((record) => {
            //                     if (record && !record.deleted && self.id != record.id) {
            //                         return next(errorDef.NOT_UNIQUE.message);
            //                     }
            //                 })
            //                 return next();
            //             })
            //             .catch(function (err) {
            //                 return next(err);
            //             });
            //     }
            // }
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
                    return Model.getAll({employeeId: this.employeeId, isEmployee: false}).then((records)=> {
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
            type: Sequelize.STRING(36),
            allowNull: true
        },
        isEmployee: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        countryId: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        companyId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        branchId: {
            type: Sequelize.STRING(36),
            allowNull: true
        }
    };
}