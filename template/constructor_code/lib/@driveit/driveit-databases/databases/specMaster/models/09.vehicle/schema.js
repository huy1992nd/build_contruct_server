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
        engineNo: {
            type: Sequelize.STRING
        },
        regNo: {
            type: Sequelize.STRING
        },
        chassisNo: {
            type: Sequelize.STRING
        },
        lastMileage: {
            type: Sequelize.INTEGER
        },
        prevMileage: {
            type: Sequelize.INTEGER
        },
        lastEngineHour: {
            type: Sequelize.INTEGER
        },
        prevEngineHour: {
            type: Sequelize.INTEGER
        },
        accuMileage: {
            type: Sequelize.INTEGER
        },
        accuEngineHour: {
            type: Sequelize.INTEGER
        },
        billingAccuMileage: {
            type: Sequelize.INTEGER
        },
        billingAccuEngineHour: {
            type: Sequelize.INTEGER
        },
        principleModelId: {
            type: Sequelize.STRING
        },
        yearMake: {
            type: Sequelize.STRING
        },
        releaseDate: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        referenceDate: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        productId: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        packageId: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        exciseDuty: {
            type: Sequelize.INTEGER
        },
        exciseNo: {
            type: Sequelize.STRING,
            validate: { 
                len: {
                    args: [0, 15],
                    msg: "length is not in this range"
                }
            }
        },
        salesTax: {
            type: Sequelize.DECIMAL
        },
        indentNo: {
            type: Sequelize.STRING,
            validate: { 
                len: {
                    args: [0, 10],
                    msg: "length is not in this range"
                }
            }
        },
        plantModelCode: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: { 
                len: {
                    args: [0, 15],
                    msg: "length is not in this range"
                }
            }
        },
        vehicleStatus: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [StatusEnum.vehicleStatus]
        },
        streamSource: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [StatusEnum.streamSource]
        },

        remark: {
            type: Sequelize.STRING,
            validate: {
                len: {
                    args: [0, 100],
                    msg: "length is not in this range"
                }
            }
        },

        branchId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        companyId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        divisionId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        countryId: {
            type: Sequelize.STRING,
            //  allowNull: false
        },
        assemblyTypeId: {
            type: Sequelize.STRING,
            //  allowNull: false
        },
        salesBranchId: {
            type: Sequelize.STRING,
            //  allowNull: false
        },
        manufacturingDate: {
            type: Sequelize.STRING,
            //  allowNull: false         
        },
        vehicleLocationId: { // Branch ID
            type: Sequelize.STRING,
            //  allowNull: false       
        },
        vehicleStockId: { // Company ID
            type: Sequelize.STRING,
            //  allowNull: false    
        },
        storageLocationId: { // from customer-service
            type: Sequelize.STRING
        },
        optionalPackageIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        optionalItemIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        exciseTypeId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        vdcStatus: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.vdcStatus]
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        releaseDateTime: {
            type: Sequelize.DATE,
            allowNull: true
        },
        registrationDate: {
            type: Sequelize.DATE,
            allowNull: true
        },

        rfIdNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        rfIdRegisterDate: {
            type: Sequelize.DATE,
            allowNull: true
        },

        // for vehicle on transporting vehicle
        onTruckRegNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        
        assignDateTime: {
            type: Sequelize.DATE,
            allowNull: true
        },
        allocateDateTime: {
            type: Sequelize.DATE,
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
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        compositeKey: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    };
}