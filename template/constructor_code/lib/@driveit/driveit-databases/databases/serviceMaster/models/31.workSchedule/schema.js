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
        employeeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        monIsMandatory: { type: Sequelize.BOOLEAN, defaultValue: false },
        monWorkFrom: { type: Sequelize.TIME },
        monWorkTo: { type: Sequelize.TIME },
        monBreakFrom: { type: Sequelize.TIME },
        monBreakTo: { type: Sequelize.TIME },
        tueIsMandatory: { type: Sequelize.BOOLEAN, defaultValue: false },
        tueWorkFrom: { type: Sequelize.TIME },
        tueWorkTo: { type: Sequelize.TIME },
        tueBreakFrom: { type: Sequelize.TIME },
        tueBreakTo: { type: Sequelize.TIME },
        wedIsMandatory: { type: Sequelize.BOOLEAN, defaultValue: false },
        wedWorkFrom: { type: Sequelize.TIME },
        wedWorkTo: { type: Sequelize.TIME },
        wedBreakFrom: { type: Sequelize.TIME },
        wedBreakTo: { type: Sequelize.TIME },
        thuIsMandatory: { type: Sequelize.BOOLEAN, defaultValue: false },
        thuWorkFrom: { type: Sequelize.TIME },
        thuWorkTo: { type: Sequelize.TIME },
        thuBreakFrom: { type: Sequelize.TIME },
        thuBreakTo: { type: Sequelize.TIME },
        friIsMandatory: { type: Sequelize.BOOLEAN, defaultValue: false },
        friWorkFrom: { type: Sequelize.TIME },
        friWorkTo: { type: Sequelize.TIME },
        friBreakFrom: { type: Sequelize.TIME },
        friBreakTo: { type: Sequelize.TIME },
        satIsMandatory: { type: Sequelize.BOOLEAN, defaultValue: false },
        satWorkFrom: { type: Sequelize.TIME },
        satWorkTo: { type: Sequelize.TIME },
        satBreakFrom: { type: Sequelize.TIME },
        satBreakTo: { type: Sequelize.TIME },
        sunIsMandatory: { type: Sequelize.BOOLEAN, defaultValue: false },
        sunWorkFrom: { type: Sequelize.TIME },
        sunWorkTo: { type: Sequelize.TIME },
        sunBreakFrom: { type: Sequelize.TIME },
        sunBreakTo: { type: Sequelize.TIME },
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

                    const dataModel = require('.')
                    let self = this;
                    return dataModel.getOne({ id: self.id }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return dataModel.getAll({
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