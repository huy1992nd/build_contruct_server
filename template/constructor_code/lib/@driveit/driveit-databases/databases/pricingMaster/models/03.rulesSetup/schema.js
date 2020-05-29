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
        // isParentRule: {
        //     type: Sequelize.STRING(1),
        //     allowNull: true,
        // },
        // parentRuleID: {
        //     type: Sequelize.STRING,
        //     allowNull: true,
        // },
        displayField: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mapFieldName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.BOOLEAN,
            values: [StatusEnum.type],
        },
        selectionReference: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        minFigure: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        maxFigure: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        selectionList: {
            type: Sequelize.STRING,
            allowNull: true,
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
                        //get all type
                        return dataModel.getAll({
                            type: record.type
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