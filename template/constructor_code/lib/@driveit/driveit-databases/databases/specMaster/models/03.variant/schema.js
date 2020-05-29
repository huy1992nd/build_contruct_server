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
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Name length is not in this range"
               },
            }
        },
        doors: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // engineTypeId: {
        //     type: Sequelize.STRING,
        //     allowNull: true
        // },
        engineCapacity: {
            type: Sequelize.STRING,
            allowNull: false
        },
        carryingCapacity: {
            type: Sequelize.STRING
        },
        wheelDriveId: {
            type: Sequelize.STRING,
            allowNull: false
        },

        principleModelCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        plantCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        
        serviceModelCode: {
            type: Sequelize.STRING
        },
        engineCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // bookingAvailability: {
        //     type: Sequelize.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false,
        // },
        jpgModel: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jpgCompanyId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        exciseDutyBranchId: {
            type: Sequelize.STRING
        },
        exciseFreeDutyBranchId: {
            type: Sequelize.STRING
        },
        originalStatusId: {
            type: Sequelize.STRING
        },
        cc: {
            type: Sequelize.STRING,
            allowNull: true
        },
        seatingCapacity: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        wheelBase: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modelYear: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        
        vtaSerialNo:{
            type: Sequelize.STRING
        },

        vtaApprovalDate: {
            type:Sequelize.STRING
        },
        targetEffectiveStartDate: {
            type:Sequelize.STRING,
            allowNull: true
        },
        targetEffectiveEndDate: {
            type:Sequelize.STRING
        },
        productItemIds: {
            type: Sequelize.TEXT
        },
        warrantyItemIds: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status]
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

                    const variantModel = require('./index')
                    return variantModel.getId({id: this.id}).then((record)=> {
                        if(!record) return next();
                        //get all code
                        return variantModel.getAll({
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