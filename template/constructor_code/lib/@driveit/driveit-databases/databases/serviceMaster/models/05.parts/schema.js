const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');
// `chargeTypeName: (2) ["External", undefined]
// partAmount: "asd"
// partChargeType: "4526d3e0-9d39-11e9-a805-353a6c7bbabf"
// partDiscountAmount: "asd"
// partDiscountPercent: "asdasdasd"
// partFlatRate: "0b06f7d0-9d3e-11e9-a805-353a6c7bbabf"
// partFlatRateName: (5) [undefined, "Periodical Maintenance", undefined, undefined, undefined]
// partGroup: "asd"
// partTaxAmount: "asdasd"
// partTotal: "asd"
// quantity: "asd"
// type: "parts"`
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
 
                    const Function = require('.')
                    let self = this;
                    return Function.getAll({
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
            allowNull: false
        },
        amount: {
            type: Sequelize.DECIMAL(15,6),
            allowNull: true
        },

/*         partGroup: {
            type: Sequelize.STRING,
            allowNull: true
        }, */
        uomId:{
            type: Sequelize.STRING,
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