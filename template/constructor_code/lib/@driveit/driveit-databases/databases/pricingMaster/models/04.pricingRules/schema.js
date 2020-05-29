
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
        parentPricingRuleId: {
            type: Sequelize.STRING(1),
            allowNull: true,
        },
        // groupId: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //     field: 'groupId'
        // },
        type: {
            type: Sequelize.ENUM('boolean', 'number', 'text'),
            allowNull: true,
            field: 'type'
        },
        // ruleSetupId: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //     field: 'ruleSetupId',
        //     // references: {
        //     //     model: 'rules',
        //     //     key: 'id'
        //     // },
        //     // field: 'ruleSetupId'
        // },
        mapFieldName: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'mapFieldName'
        },
        conditions: {
            type: Sequelize.ENUM('eq', 'gt', 'lt', 'gte', 'lte'),
            allowNull: true,
            field: 'conditions'
        },
        conditionValue: {
            type: Sequelize.STRING(45),
            allowNull: true,
            field: 'conditionValue'
        },
        value: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            field: 'value'
        },
        operator: {
            type: Sequelize.ENUM('add', 'minus'),
            allowNull: true,
            field: 'operator'
        },
        displayTableName: {
            type: Sequelize.INTEGER(4),
            allowNull: true,
            field: 'displayTableName'
        },
        valueType: {
            type: Sequelize.ENUM('percentage', 'figure'),
            allowNull: true,
            field: 'valueType'
        },
        required: {
            type: Sequelize.INTEGER(4),
            allowNull: true,
            defaultValue: '0',
            field: 'required'
        },
        startTime: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'startTime'
        },
        endTime: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'endTime'
        },
        sequence:{
            type: Sequelize.INTEGER(11),
            allowNull: true,
            field: 'sequence'
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
