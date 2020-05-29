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
        countryCode:{
            type:Sequelize.STRING(3),
            allowNull: false
        },
        orderNo: {
            type:Sequelize.STRING(21),
            allowNull: false
        },
        type: {
            type:Sequelize.STRING(3),
            allowNull: true
        },
        symptomCode: {
            type:Sequelize.STRING(3),
            allowNull: true
        },
        remark:{
            type:Sequelize.STRING(255),
            allowNull: true
        },
        cbj:{
            type:Sequelize.BOOLEAN,
            allowNull: true
        },
        relatedJob:{
            type:Sequelize.STRING(255),
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
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    };
}