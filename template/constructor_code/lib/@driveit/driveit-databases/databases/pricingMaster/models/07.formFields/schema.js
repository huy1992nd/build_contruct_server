
const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            field: 'id',
            defaultValue: Sequelize.UUIDV1
        },
        fieldName: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'fieldName'
        },
        displayName: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'displayName'
        },
        isParent:{
            type: Sequelize.STRING,
            allowNull: true,
            field: 'isParent',
            defaultValue: 0
        },
        isHeader:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            field: 'isHeader',
            defaultValue: 1
        },
        isSubHeader:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            field: 'isSubHeader',
            defaultValue: 1
        },
        onSideBar:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            field: 'onSideBar',
            defaultValue: 1
        },
        hasRules:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            field: 'hasRules',
            defaultValue: 0
        },
        hasDateRange:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            field: 'hasDateRange',
            defaultValue: 0
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'createdAt'
        },
        updateBy: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'updateBy'
        },
        updateAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'updateAt'
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'createdBy'
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
    }
};
