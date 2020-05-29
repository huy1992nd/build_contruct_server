const Sequelize = require("sequelize");
const StatusEnum = require('../enums/ENikStatus');
const errorDef = require('../../../../utils/error.codes');
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                NOT_UNIQUE: function (chassisNo, next) {
 
                    const Function = require('.')
                    let self = this;
                    return Function.getAll({
                        chassisNo
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
        engineNo: {
            type: Sequelize.STRING,
            allowNull: true
        },

        yearMade: {
            type: Sequelize.STRING,
            allowNull: true
        },

        makeId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        bodyTypeId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.status]
        },

        submissionDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        
        sentDate: {
            type: Sequelize.STRING,
            allowNull: true
        },

        responseDate: {
            type: Sequelize.STRING,
            allowNull: true
        },

        responseDetails: {
            type: Sequelize.STRING,
            allowNull: true
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