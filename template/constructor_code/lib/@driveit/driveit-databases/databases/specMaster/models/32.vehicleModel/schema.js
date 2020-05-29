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
        principleModelCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        plantCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        serviceModelCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        engineCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bodyTypeId: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        vehicleTypeId: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        // fuelTypeId: {
        //     type: Sequelize.STRING(36),
        //     allowNull: true
        // },
        engineTypeId: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        transmissionTypeId: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        vehicleUsageId: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        assemblyTypeId: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        doors: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        // engTypeId: {
        //     type: Sequelize.STRING,
        //     allowNull: true
        // },
        engineCapacity: {
            type: Sequelize.STRING,
            allowNull: true
        },
        wheelDriveId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        wheelBase: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cc: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jpgModel: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jpgCompanyId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        exciseDutyBranchId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        exciseFreeDutyBranchId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        originalStatusId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vtaSerialNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vtaApprovalDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        colorIds: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        seatingCapacity: {
            type: Sequelize.STRING,
            allowNull: true
        },
        standardPackageIds: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        jpjBodyTypeId: {
            type: Sequelize.STRING,
            allowNull: true
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

                    const modelModel = require('./index')
                    return modelModel.getId({id: this.id}).then((record)=> {
                        if(!record) return next();
                        //get all code
                        return modelModel.getAll({
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
            allowNull: true
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vehicleId: {
            type: Sequelize.UUID,
            references: {
                model: "vehicle", 
                key: "id", 
            }
        },
        makeId: {
            type: Sequelize.UUID,
            references: {
                model: "make", 
                key: "id", 
            }
        },
        modelId: {
            type: Sequelize.UUID,
            references: {
                model: "model", 
                key: "id", 
            }
        },
        variantId: {
            type: Sequelize.UUID,
            references: {
                model: "variant", 
                key: "id", 
            }
        },
        productId: {
            type: Sequelize.UUID,
            references: {
                model: "product", 
                key: "id", 
            }
        },
    };
}