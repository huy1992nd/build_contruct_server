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
        countryId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fiscalYear: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        currencyId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        uomId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        costJan: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costFeb: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costMar: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costApr: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costMay: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costJun: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costJul: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costAug: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costSep: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costOct: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costNov: {
            type: Sequelize.FLOAT(6,2),
            // allowNull: false
        },
        costDec: {
            type: Sequelize.FLOAT(6, 2),
            // allowNull: false
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

                    const dataModel = require('.')
                    let self = this;
                    return dataModel.getOne({id: self.id}).then((record)=> {
                        if(!record) return next();
                        //get all code
                        return dataModel.getAll({
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