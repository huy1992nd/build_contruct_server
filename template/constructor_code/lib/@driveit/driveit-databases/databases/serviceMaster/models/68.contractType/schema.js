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
                NOT_UNIQUE: function (code, next) {
 
                    const ContractType = require('.')
                    let self = this;
                    return ContractType.getAll({
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
            allowNull: false,
            // unique: true,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Name length is not in this range"
               },
            }
        },
        labourPercentage:{
            type: Sequelize.STRING,
            allowNull: true
        },
        partsPercentage:{
            type: Sequelize.STRING,
            allowNull: true
        },
        labourTaxRate:{
            type: Sequelize.STRING,
            allowNull: true
        },
        partsTaxRate:{
            type: Sequelize.STRING,
            allowNull: true
        },
        labourRoCoverage:{
            type: Sequelize.STRING,
            allowNull: true
        },
        partsRoCoverage:{
            type: Sequelize.STRING,
            allowNull: true
        },
        availableFields:{
            type: Sequelize.TEXT,
            allowNull: true
        },

        tenantId:{
            type: Sequelize.UUID,
            allowNull: true
        },
        companyId:{
            type: Sequelize.UUID,
            allowNull: true
        },
        branchId:{
            type: Sequelize.UUID,
            allowNull: true
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
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

                    const Education = require('.')
                    let self = this;
                    return Education.getOne({id: self.id}).then((record)=> {
                        if(!record) return next();
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