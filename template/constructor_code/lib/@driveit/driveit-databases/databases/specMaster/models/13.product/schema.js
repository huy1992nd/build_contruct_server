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
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 20],
                    msg: "Code length is not in this range"
               },
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Name length is not in this range"
               },
            }
        },
        description: {
            type: Sequelize.STRING 
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
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

                    const productModel = require('./index')
                    return productModel.getId({id: this.id}).then((record)=> {
                        if(!record) return next();
                        //get all code
                        return productModel.getAll({
                            code: record.code
                            })
                            .then((res) => {
                                let recordArray = res.rows;
                                if(recordArray.length > 0) {
                                    recordArray.forEach((record) => {
                                        if (record && !record.deleted && this.id != record.id) {
                                            return next(errorDef.NOT_UNIQUE.message);
                                        }
                                    })
                                }
                                return next();
                            })
                            .catch((err) => {
                                return next(err);
                            });
                    })
                   
                }
            }
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        foreCastEffectiveStartDate: {
            type: Sequelize.STRING
        },
        foreCastEffectiveEndDate: {
            type: Sequelize.STRING
        },
        orderingEffectiveStartDate: {
            type: Sequelize.STRING
        },
        orderingEffectiveEndDate: {
            type: Sequelize.STRING
        },
        bookingEffectiveStartDate: {
            type: Sequelize.STRING
        },
        bookingEffectiveEndDate: {
            type: Sequelize.STRING
        },
        // branchId: {
        //     type: Sequelize.STRING
        // },
        plantCode: {
            type: Sequelize.STRING
        },
        jpjBodyTypeId: {
            type: Sequelize.STRING
        },
        jpjModel: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vtaSerialNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vtaApprovalDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        seatingCapacity: {
            type: Sequelize.INTEGER
        },
        carryCapacity: {
            type: Sequelize.INTEGER
        },
        bookingTypeId: {
            type: Sequelize.STRING
        },
        colorIds: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        standardPackageIds: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        optionalPackageIds: {
            type: Sequelize.TEXT,
            allowNull: true
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