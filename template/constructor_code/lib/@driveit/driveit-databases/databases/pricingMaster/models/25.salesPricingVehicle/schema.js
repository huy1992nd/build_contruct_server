
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
        // packageId:{
        //     type: Sequelize.STRING(255),
        //     allowNull: true,
        //     field: 'packageId',
        // },
        // materialCode:{
        //     type: Sequelize.STRING(255),
        //     allowNull: true,
        //     field: 'materialCode',
        // },
        value:{
            type: Sequelize.FLOAT(10,2),
            allowNull: true,
            field: 'value',
        },
        type: {
            type: Sequelize.ENUM("metallic","nonmetallic"),
            allowNull: true,
            field: 'type',
            defaultValue: null
        },
        usageType: {
            type: Sequelize.ENUM("private","foreigner","company",'commercial'),
            allowNull: true,
            field: 'usageType',
            defaultValue: null
        },
        status: {
            type: Sequelize.ENUM("enabled","disabled","pending"),
            allowNull: false,
            field: 'status',
            defaultValue: "enabled"
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
