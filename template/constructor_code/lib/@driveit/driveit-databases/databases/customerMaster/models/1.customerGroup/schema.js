const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1,
            field: 'id'
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'code',
            validate: {
                NOT_UNIQUE: function (code, next) {
                    const Model = require('.')
                    return Model.getAll({
                            code
                        })
                        .then((res) => {
                            let recordArray = res.rows;
                            if (recordArray.length > 0) {
                                recordArray.forEach((record) => {
                                    if (record && !record.deleted && this.id != record.id) {
                                        return next(errorDef.NOT_UNIQUE.message);
                                    }
                                })
                            }
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                }
            },
            len: {
                args: [1, 20],
                msg: "Code length is not in this range"
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'name',
            // unique: true,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
            field: 'status',
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
                    return Model.getId({
                        id: this.id
                    }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return Model.getAll({
                                code: record.code
                            })
                            .then((res) => {
                                let recordArray = res.rows;
                                if (recordArray.length > 0) {
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
        countryId: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'countryId'
        },
        inactivateReason: {
            type: Sequelize.STRING,
            field: 'inactivateReason'
            // allowNull: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'createdBy'
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'updatedBy'
        }
    };
}