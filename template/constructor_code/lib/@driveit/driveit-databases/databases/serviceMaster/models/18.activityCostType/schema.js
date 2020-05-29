/*jshint esversion: 6 */

const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        // required fields
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

                    const Education = require('.');
                    let self = this;
                    return Education.getAll({
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
        
        countryId: {
            // primaryKey: true,     
            type: Sequelize.STRING,
            allowNull: false,
            // validate: {
            //     len: {
            //         args: [1, 2],
            //         msg: "Country length is not in this range"
            //     },
            // }
        },

        // activityCostType: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //     validate: {
        //         len: {
        //             args: [1, 10],
        //             msg: "Activity Cost Type length is not in this range"
        //         },
        //     }
        // },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 40],
                    msg: "Description length is not in this range"
                },
            }
        },

        uomId: {
            type: Sequelize.STRING,
            allowNull: false,
            // validate: {
            //     len: {
            //         args: [1, 10],
            //         msg: "UoM length is not in this range"
            //     }
            // }
        },

        // Defaults fields
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },

        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
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

                    const Education = require('.');
                    let self = this;
                    return Education.getOne({
                        id: self.id
                    }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return Education.getAll({
                                code: record.code
                            })
                            .then(function (record) {
                                record.forEach((record) => {
                                    if (record && !record.deleted && self.id != record.id) {
                                        return next(errorDef.NOT_UNIQUE.message);
                                    }
                                });
                                return next();
                            })
                            .catch(function (err) {
                                return next(err);
                            });
                    });

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
};