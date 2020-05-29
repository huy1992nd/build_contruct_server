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
            
        },
        prefix: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        startNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            // validate: {
            //     INVALID_PARAMETER: function (code, next) {

            //         let self = this;
                    
            //         if(self.currentNumber && self.currentNumber < self.startNumber){
            //             return next(errorDef.INVALID_PARAMETER.message);
            //         }

            //         if(self.startNumber >= self.endNumber){
            //             return next(errorDef.INVALID_PARAMETER.message);
            //         }

            //         return next();
            //     }
            // }
        },
        endNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        currentNumber: { //this cannot be bigger than endNumber
            type: Sequelize.STRING,
            allowNull: true,
            // validate: {
            //     END_NUMBER_EXCEEDED: function (code, next) {

            //         const Model = require('.')
            //         let self = this;
            //         const where = {
            //             id: self.id
            //         };

            //         return Model.getOne(where)
            //             .then(function (record) {

            //                 record.currentNumber = self.currentNumber?self.currentNumber:(record.currentNumber?record.currentNumber:record.startNumber);
            //                 if (record.currentNumber > record.endNumber) {
            //                     return next(errorDef.END_NUMBER_EXCEEDED.message);
            //                 }
            //                 return next();
            //             })
            //             .catch(function (err) {
            //                 return next(err);
            //             });


            //     }
            // }
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
                    if (deleted) {
                        return next();
                    }

                    const Model = require('.')
                    let self = this;
                    return Model.getOne({
                        id: self.id
                    }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return Model.getAll({
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