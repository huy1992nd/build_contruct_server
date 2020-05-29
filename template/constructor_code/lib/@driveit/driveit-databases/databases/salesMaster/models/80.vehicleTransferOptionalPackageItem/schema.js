const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        vehicleTransferId: {
            type: Sequelize.CHAR(36),
            allowNull: false,
            references: { model: 'vehicleTransfer', key: 'id'},
        },
        optionalPackageId: {
            type: Sequelize.STRING(36),
            allowNull: false,
        },
        optionalPackageCode: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        optionalPackageName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        accessories: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        isSelected: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
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

                    const Function = require('.')
                    let self = this;
                    return Function.getOne({id: self.id}).then((record)=> {
                        if(!record) return next();
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
    };
}