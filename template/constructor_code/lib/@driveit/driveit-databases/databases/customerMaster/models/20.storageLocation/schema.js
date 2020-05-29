const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        branchId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        storageId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        followMainAddress: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        zone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        regionId: {
            type: Sequelize.STRING,
            allowNull: false
        },

        telId: {        // areaOperatorCode
            type: Sequelize.UUID,
            allowNull: true
        },
        telephone: {
            type: Sequelize.STRING,
            //allowNull: false
        },
        faxId: {        // areaOperatorCode
            type: Sequelize.UUID,
            allowNull: true
        },
        fax: {
            type: Sequelize.STRING,
            //allowNull: false
        },
        contactId: {        // areaOperatorCode
            type: Sequelize.UUID,
            allowNull: true
        },
        primaryContact: {
            type: Sequelize.STRING,
            //allowNull: false
        },

        area: {
            type: Sequelize.STRING,
            //allowNull: false
        },
        shipToAddress1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shipToAddress2: {
            type: Sequelize.STRING,
            //allowNull: false
        },
        shipToAddress3: {
            type: Sequelize.STRING,
            //allowNull: false
        },
        postcodeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cityId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stateId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        countryId: {
            type: Sequelize.STRING,
            allowNull: false
        },

        rfIdPoleNo: {
            type: Sequelize.STRING,
            allowNull: true
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status]
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
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
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