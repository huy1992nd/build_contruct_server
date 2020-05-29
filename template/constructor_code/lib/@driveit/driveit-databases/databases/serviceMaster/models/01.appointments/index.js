const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const AppointmentType = require('../02.appointmentType');
const AppointmentMethod = require('../03.appointmentMethod');

const tableName = "appointments";
const modelName = "appointments";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const authMaster = require('../../../auth');
const specMaster = require('../../../specMaster');
const customerMaster = require('../../../customerMaster');
const listing = require('../../../../utils/listing');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Appointments extends Sequelize.Model {

    //schema
    static init(sequelize, DataTypes, databaseName) {
        return super.init(schema(DataTypes), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }

    //associations
    static associate(models) {
        this.myAssociation = this.belongsTo(models.AppointmentType, {
            foreignKey: 'appointmentTypeId'
        });
        this.myAssociation = this.belongsTo(models.AppointmentMethod, {
            foreignKey: 'appointmentMethodId'
        });
        if (!_.isEmpty(authMaster)) {
            this.myAssociation = this.hasOne(authMaster.Tenants, {
                sourceKey: "tenantId",
                foreignKey: 'id',
            });
            this.myAssociation = this.hasOne(authMaster.Employees, {
                sourceKey: "assignedSAId",
                foreignKey: 'id',
                as: "employeeInform"
            });
            this.myAssociation = this.hasOne(authMaster.InternalUsers, {
                sourceKey: "assignedSAId",
                foreignKey: 'id',
                as: "assignedSA"
            });
            this.myAssociation = this.hasOne(authMaster.InternalUsers, {
                sourceKey: "updatedBy",
                foreignKey: 'id',
                as: 'updatedByInfo'
            });
            this.myAssociation = this.hasOne(authMaster.InternalUsers, {
                sourceKey: "createdBy",
                foreignKey: 'id',
                as: 'createdByInfo'
            });
        }

        if (!_.isEmpty(specMaster)) {
            this.myAssociation = this.hasOne(specMaster.Make, {
                sourceKey: "makeId",
                foreignKey: 'id',
            });
            this.myAssociation = this.hasOne(specMaster.Model, {
                sourceKey: "modelId",
                foreignKey: 'id',
            });
            this.myAssociation = this.hasOne(specMaster.Variant, {
                sourceKey: "variantId",
                foreignKey: 'id',
            });
            this.myAssociation = this.hasOne(specMaster.Color, {
                sourceKey: "colorId",
                foreignKey: 'id',
            });
            this.myAssociation = this.hasOne(specMaster.Vehicle, {
                sourceKey: "vehicleId",
                foreignKey: 'id',
            });
        }

        if (!_.isEmpty(customerMaster)) {
            this.myAssociation = this.hasOne(customerMaster.Branch, {
                sourceKey: "branchId",
                foreignKey: 'id',
            });

            this.myAssociation = this.hasOne(customerMaster.Customer, {
                sourceKey: "customerId",
                foreignKey: 'id',
            });
        }




    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where
        }, transaction);
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            include: [{
                    model: AppointmentType
                },
                {
                    model: AppointmentMethod
                }
            ],
        }, transaction);
    }

    static getRecords2({
        pagination = {},
        orderBy = [],
        where = {},
        transaction = null,
    }) {
        const commonAttr = ['id', 'code', 'name'];

        return this.findAndCountAll({
            where,
            ...pagination,
            order: [
                [orderBy.columnName.replace(/\[0\]/g, ''), orderBy.direction]
            ],
            include: [{
                    model: customerMaster.Customer,
                    include: [{
                            model: customerMaster.CustomerAccountGroup,
                            attributes: commonAttr,
                        },
                        {
                            model: customerMaster.CustomerDetails,
                            include: [{
                                model: customerMaster.CustomerContact,
                            }, ],

                        },
                    ]
                },
                {
                    model: authMaster.InternalUsers,
                    as: 'assignedSA'
                },
                {
                    model: customerMaster.Branch,
                },
                {
                    model: specMaster.Vehicle,
                    include: [{
                            model: specMaster.Make,
                            attributes: commonAttr,
                        },
                        {
                            model: specMaster.Model,
                            attributes: commonAttr,
                        },
                        {
                            model: specMaster.Variant,
                            attributes: [...commonAttr, 'serviceModelCode'],
                        },
                        {
                            model: specMaster.Color,
                            attributes: commonAttr,
                        },
                    ]
                },
                {
                    model: authMaster.Tenants,
                },
                {
                    model: authMaster.InternalUsers,
                    as: 'updatedByInfo'
                },
                {
                    model: authMaster.InternalUsers,
                    as: 'createdByInfo'
                },
                {
                    model: AppointmentType,
                    attributes: commonAttr,
                },
                {
                    model: AppointmentMethod,
                    attributes: commonAttr,
                },
            ],
            subQuery: false,
        }, transaction);
    }

    static getRecords3({
        pagination,
        orderBy,
        where,
        include,
    }) {
        
        const commonAttr = ['id', 'code', 'name'];
        const customInclude = [{
                model: customerMaster.Customer,
                include: [{
                        model: customerMaster.CustomerAccountGroup,
                        attributes: commonAttr,
                    },
                    {
                        model: customerMaster.CustomerDetails,
                        include: [{
                            model: customerMaster.CustomerContact,
                        }, ],

                    },
                ]
            },
            {
                model: authMaster.InternalUsers,
                as: 'assignedSA'
            },
            {
                model: authMaster.Employees,
                as: 'employeeInform'
            },
            {
                model: customerMaster.Branch,
            },
            {
                model: specMaster.Make,
                attributes: commonAttr,
            },
            {
                model: specMaster.Model,
                attributes: commonAttr,
            },
            {
                model: specMaster.Variant,
                attributes: [...commonAttr, 'serviceModelCode'],
            },
            {
                model: specMaster.Color,
                attributes: commonAttr,
            },
            {
                model: specMaster.Vehicle,
                include: [{
                        model: specMaster.Make,
                        attributes: commonAttr,
                    },
                    {
                        model: specMaster.Model,
                        attributes: commonAttr,
                    },
                    {
                        model: specMaster.Variant,
                        attributes: [...commonAttr, 'serviceModelCode'],
                    },
                    {
                        model: specMaster.Color,
                        attributes: commonAttr,
                    },
                ]
            },
            {
                model: authMaster.Tenants,
            },
            {
                model: authMaster.InternalUsers,
                as: 'updatedByInfo'
            },
            {
                model: authMaster.InternalUsers,
                as: 'createdByInfo'
            },
            {
                model: AppointmentType,
                attributes: commonAttr,
            },
            {
                model: AppointmentMethod,
                attributes: commonAttr,
            },
        ];
        return listing.getSearch({
            distinct: true,
            sequelizeModel: this,
            pagination,
            orderBy,
            where,
            include: customInclude
        });
    }

    static addRecord(record, transaction = null) {

        return this.create(record, {
            returning: true
        }, transaction);

    }

    static getVehicleData(record) {
        return new Promise((resolve, reject) => {
            this.sequelize.query(`SELECT * FROM spec_master.vehicle where regNo = ? and deleted = 0`, {
                replacements: [record.vehicleRegNo],
                type: this.sequelize.QueryTypes.SELECT
            }).then(rows => {
                resolve(rows);
            }).catch(err => reject(err));
        })
    }

    static updateRecord(record, where, transaction = null) {

        // return  this.build(all, {isNewRecord: false}).save();
        return this.update(record, {
            where,
            isNewRecord: false
        }, transaction);

    }

    static deleteRecord(where, transaction = null) {

        return this.destroy({
            where: where
        }, transaction);

    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {
                    [Op.like]: likeArrItem.text
                };
                prepQry.push(qry);
            });
            where = {
                [Op.or]: prepQry
            };
        }

        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        let include = [];
        if (!skipInclude) {
            include = [];
        }

        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
            ...pagination,
            order: [orderBy]
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
    }


}