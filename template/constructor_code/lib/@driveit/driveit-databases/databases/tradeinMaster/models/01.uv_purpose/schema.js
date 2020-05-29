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
            validate: {
                len: {
                    args: [1, 20],
                    msg: "Code length is not in this range"
               },
            }
        },
        name: {
            type: Sequelize.STRING,
            // unique: true,
        },
        isEnabled: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
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

                    const purposeModel = require('./index')
                    return purposeModel.getId({id: this.id}).then((record)=> {
                        if(!record) return next();
                        //get all code
                        return purposeModel.getAll({
                            code: record.code
                            })
                            .then((res) => {
                                let recordArray = res.rows;
                                if(recordArray.length > 0) {
                                    recordArray.forEach((record) => {
                                        if (record && !record.deleted && this.id != record.id) {
                                            return next(errorDef.NOT_UNIQUE.message);
                                        }
                                    })
                                }
                                return next();
                            })
                            .catch((err) => {
                                return next(err);
                            });
                    })
                   
                }
            }
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // unique: true,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
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