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
        saluationId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Name length is not in this range"
                }
            }
        },
        nickName: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Name length is not in this range"
                }
            }
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        gender: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        maritalStatus: {
            type: Sequelize.STRING,
            allowNull: true
        },
        identityType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        identityId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        companyName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        industryId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        occupationId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        income: {
            type: Sequelize.STRING,
            allowNull: true
        },



        opCode: {
            type: Sequelize.STRING,
            allowNull: true
        },

        hTelCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        oTelCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        faxCode: {
            type: Sequelize.STRING,
            allowNull: true
        },

        mobileNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        houseMobNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        officeNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        faxNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        postcodeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cityId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address2: {
            type: Sequelize.STRING,
            allowNull: true
        },
        stateId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        countryId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address3: {
            type: Sequelize.STRING,
            allowNull: true
        },
        companySize: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fleetSize: {
            type: Sequelize.STRING,
            allowNull: true
        },
        govtBodyRef: {
            type: Sequelize.STRING,
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
            // validate: {
            //     NOT_UNIQUE: function (deleted, next) {
            //         if (deleted) {
            //             return next();
            //         }

            //         const Model = require('.')
            //         return Model.getId({ id: this.id }).then((record) => {
            //             if (!record) return next();
            //             //get all code
            //             return Model.getAll({
            //                 code: record.code
            //             })
            //                 .then((res) => {
            //                     let recordArray = res.rows;
            //                     if (recordArray.length > 0) {
            //                         recordArray.forEach((record) => {
            //                             if (record && !record.deleted && this.id != record.id) {
            //                                 return next(errorDef.NOT_UNIQUE.message);
            //                             }
            //                         })
            //                     }
            //                     return next();
            //                 })
            //                 .catch((err) => {
            //                     return next(err);
            //                 });
            //         })

            //     }
            // }
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
        },
        mareaOperatorCode:{
            type: Sequelize.STRING,
            allowNull: true
        },
        fareaOperatorCode:{
            type: Sequelize.STRING,
            allowNull: true
        },
        tareaOperatorCode:{
            type: Sequelize.STRING,
            allowNull: true
        },
    };
}