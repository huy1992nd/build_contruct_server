const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "vehicle";
const modelName = "vehicle";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const ModelModel = require('../02.model');
const VariantModel = require('../03.variant');
const ColorModel = require('../11.color');
const MakeModel = require('../01.make');
const VehicleBusinessTypeModel = require('../19.vehicleBusinessType');
const VehicleMovementModel = require('../23.vehicleMovement');
const VehicleSalesServiceHistoryModel = require('../25.vehicleSalesServiceHistory');
const VehicleRegistrationModel = require('../26.vehicleRegistration');
const VehicleKeyModel = require('../28.vehicleKey');
const OICRectificationModel = require('../31.oicRectification');
const ContractorDetailes = require('../33.contractorDetailes');
const CustomerVehicleRelationModel = require('../14.customerVehicleRelation');

const CustomerMaster = require('../../../customerMaster');
const generalMaster = require('../../../generalMaster');
var _ = require('lodash');

// const VehicleWarrantyCategory = require('../../../generalMaster/models/72.vehicleWarrantyCategory');


const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Vehicle extends ModelWithPublisher {

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
        this.myAssociation = this.belongsTo(models.Make, {
            foreignKey: 'makeId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Model, {
            foreignKey: 'modelId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Variant, {
            foreignKey: 'variantId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Color, {
            foreignKey: 'colorId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.ColorType, {
            foreignKey: 'colorTypeId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.VehicleBusinessType, {
            foreignKey: 'vehicleBusinessTypeId',
            targetKey: 'id'
        });
        this.myAssociation = this.hasMany(models.VehicleMovement, {
            foreignKey: 'vehicleId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.VehicleSalesServiceHistory, {
            foreignKey: 'vehicleId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.VehicleRegistration, {
            foreignKey: 'vehicleId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.VehicleKey, {
            foreignKey: 'vehicleId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.OICRectification, {
            foreignKey: 'vehicleId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.ContractorDetailes, {
            foreignKey: 'vehicleId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.CustomerVehicleRelation, {
            foreignKey: 'vehicleId'
        });


        // required for appointment warranty Date
        if (!_.isEmpty(generalMaster)) {
            this.myAssociation = this.hasMany(generalMaster.VehicleWarrantyCategory, {
                foreignKey: 'vehicleId',
                sourceKey: "id",
            });
        }
        // this.myAssociation = this.hasMany(generalMaster.VehicleWarrantyCategory, {
        //     foreignKey: 'vehicleId',
        //     sourceKey: 'id'
        // });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where,
            include: [
                { model: VehicleSalesServiceHistoryModel },
                { model: VehicleRegistrationModel },
                { model: VehicleKeyModel },
                { model: OICRectificationModel },
                { model: ContractorDetailes },
                {
                    model: CustomerVehicleRelationModel,
                    attributes:['id', 'customerId', 'action', 'status'],
                    include: !_.isEmpty(CustomerMaster) ? {
                        model: CustomerMaster.Customer,
                        attributes:['id', 'name', 'identityId', 'identityNo'],
                        as: 'customer'
                    }: []
                }
            ],
        }, transaction);
    }

    static getOneWithoutInclude(where, transaction = null) {
        return this.findOne({
            where,
            // include: [
            //     { model: VehicleSalesServiceHistoryModel },
            //     { model: VehicleRegistrationModel },
            //     { model: VehicleKeyModel },
            //     { model: OICRectificationModel },
            //     { model: ContractorDetailes },
            // ],
        }, transaction);
    }

    static getId(where) {
        let status = {};
        status['deleted'] = {
            [Op.not]: true
        };
        return this.findOne({
            where: {
                ...where,
                [Op.and]: status
            },
            // attributes: ["id"],
            include: [
                { model: VehicleSalesServiceHistoryModel },
                { model: VehicleRegistrationModel },
                { model: VehicleKeyModel },
                { model: OICRectificationModel },
                { model: ContractorDetailes },
                {
                    model: CustomerVehicleRelationModel,
                    attributes:['id', 'customerId', 'action', 'status'],
                    include: !_.isEmpty(CustomerMaster) ? {
                        model: CustomerMaster.Customer,
                        attributes:['id', 'name', 'identityId', 'identityNo'],
                        as: 'customer'
                    }: []
                }
            ],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attribute = [], pagination = { limit: null, offset: 0 }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            include: [
                { model: VehicleSalesServiceHistoryModel },
                { model: VehicleRegistrationModel },
                { model: VehicleKeyModel },
                { model: OICRectificationModel },
                { model: ContractorDetailes },
                {
                    model: CustomerVehicleRelationModel,
                    attributes:['id', 'customerId', 'action', 'status'],
                    include: !_.isEmpty(CustomerMaster) ? {
                        model: CustomerMaster.Customer,
                        attributes:['id', 'name', 'identityId', 'identityNo'],
                        as: 'customer'
                    }: []
                }
            ]
        });
    }
    static getAllV2(where, attribute = [], pagination = { limit: null, offset: 0 }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            include: [
                { model: VehicleSalesServiceHistoryModel },
                { model: MakeModel },
                { model: ModelModel },
                { model: VariantModel },
            ]
        });
    }
    static getAllNotInclude(where, orderBy = ["createdAt", "DESC"]) {
        return this.findAll({
            where,
            attributes: ['id', 'regNo', 'chassisNo', 'variantId', 'colorId', 'exciseTypeId', 'optionalPackageIds', 'vehicleStockId',
            'optionalItemIds', 'packageId', 'productId'],
            order: [orderBy],
        });
    }
    static getAllByFilter(attributes = [], pagination = { limit: null, offset: 0 }, orderBy = ["createdAt", "DESC"], filterArr = []) {
        let where = {};
        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            attributes,
            include: [
                {
                    model: MakeModel
                },
                {
                    model: ModelModel
                },
                {
                    model: VariantModel
                },
                {
                    model: ColorModel
                }
            ]
        });
    }

    static getAllWithIncludes(whereObj, pagination, orderBy, filterArr = [], vehicleCondition = {}, skipAdditionalInclude = false) {
        let arrFilter = Utils.filterGenerator(filterArr);

        // handle search filter for vehicle-release module
        let vehicleMovementKey = ['batchNoFrom', 'batchNoTo'];
        let vehicleMovementWhere = {};
        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    if (vehicleMovementKey.includes(k)) {
                        v = v[Op.in];
                        if (k === 'batchNoFrom') {
                            vehicleMovementWhere['batchNo'] =
                                { ...vehicleMovementWhere['batchNo'], [Op.gte]: Number(v) };
                        }
                        if (k === 'batchNoTo') {
                            vehicleMovementWhere['batchNo'] =
                                { ...vehicleMovementWhere['batchNo'], [Op.lte]: Number(v) };
                        }
                    } else {
                        whereObj[k] = v;
                    }
                });
            });
        }

        let include = [
            // object
            {
                model: MakeModel,
                where: (!_.isEmpty(vehicleCondition) && vehicleCondition.whereMake) ? { ...vehicleCondition.whereMake } : null
            },
            {
                model: ModelModel,
                where: (!_.isEmpty(vehicleCondition) && vehicleCondition.whereModel) ? { ...vehicleCondition.whereModel } : null
            },
            {
                model: VariantModel,
                where: (!_.isEmpty(vehicleCondition) && vehicleCondition.whereVariant) ? { ...vehicleCondition.whereVariant } : null
            },
            {
                model: ColorModel,
                where: (!_.isEmpty(vehicleCondition) && vehicleCondition.whereColor) ? { ...vehicleCondition.whereColor } : null
            },
            {
                model: VehicleBusinessTypeModel
            },

            // arrays
            {
                model: VehicleMovementModel,
                where: !_.isEmpty(vehicleMovementWhere) ? { ...vehicleMovementWhere } : null
            },
            
            /** dont uncomment model OICRectificationModel and ContractorDetailes,
             * it causes unable to update or add vehicles in vehicle-master Elastic */
            // {
            //     model: OICRectificationModel
            // },
            // {
            //     model: ContractorDetailes
            // },
            {
                model: CustomerVehicleRelationModel,
                attributes:['id', 'customerId', 'action', 'status'],
                include: {
                    model: CustomerMaster.Customer,
                    attributes:['id', 'name', 'identityId', 'identityNo'],
                    as: 'customer'
                }
            }
        ];
        if (!skipAdditionalInclude) {
            include.push({ model: VehicleSalesServiceHistoryModel });
            include.push({ model: VehicleRegistrationModel });
            include.push({ model: VehicleKeyModel });
        }
        
        return this.findAndCountAll({
            where: {
                ...whereObj,
            },
            include,
            // distinct: true,
            ...pagination,
            order: [orderBy],
        });
    }

    static getCount(pagination, where, filterArr = []) {

        let arrFilter = Utils.filterGenerator(filterArr);
        
        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        return this.count({
            where,
            ...pagination,
        });
    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false, customInclude = []) {
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

        let include;
        if (customInclude && _.size(customInclude) > 0) {
            include = customInclude;
        } else {
            include = [
                { model: ModelModel },
                { model: VariantModel },
                { model: ColorModel },
                { model: MakeModel },
                { model: VehicleBusinessTypeModel },
                { model: OICRectificationModel },
                {
                    model: CustomerVehicleRelationModel,
                    attributes:['id', 'customerId', 'action', 'status'],
                    include: !_.isEmpty(CustomerMaster) ? {
                        model: CustomerMaster.Customer,
                        attributes:['id', 'name', 'identityId', 'identityNo'],
                        as: 'customer'
                    }: []
                }
            ];
            if (!skipInclude) {
                include.push({ model: VehicleSalesServiceHistoryModel });
                include.push({ model: VehicleRegistrationModel });
                include.push({ model: VehicleKeyModel });
                include.push({ model: ContractorDetailes });
            }
        }

        
        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                },
            },
            include,
            ...pagination,
            order: [orderBy],
            distinct: true
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
    }

    static searchAllNoCount(likeArr, attributes = []) {
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
        };

        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            attributes
        });
    }

    static addNew(obj, transaction) {
        
            return this.create(
                obj, {
                returning: true,
                transaction: transaction
            });
        
    }

    static updateVehicle(model, where) {
        
            return this.update(model, {
                where: where
            });
        
    }
    static updateRecord(record, where, transaction = null) {
        
            return this.update(record, {
                where,
                isNewRecord: false
            }, transaction);
        
    }

    static bulkUpdate(vehicle, where, transaction) {
        
            return this.update(
                vehicle
                , {
                    where: where,
                    returning: true,
                    transaction: transaction
                });
       
    }

    static deleteHard(where) {
        
            return this.destroy({
                where: where
            });
        
    }
    static deleteSoft(where, who) {
        
            return this.update({
                deleted: true,
                updatedBy: who
            }, {
                where: where
            });
        
    }

    static lookupVehicle(where, pagination) {

        return this.findAndCountAll({
            where,
            ...pagination,
            include: [
                { model: MakeModel },
                { model: ModelModel },
                { model: VariantModel },
                {
                    model: CustomerVehicleRelationModel,
                    include: [
                        {
                            model: CustomerMaster.CustomerDetails,
                            on: Sequelize.literal(
                                "`customerVehicleRelations`.`customerId` = `customerVehicleRelations->customerDetail`.`id` "
                            ),
                            include: [
                                {
                                    model: CustomerMaster.CustomerGroup,
                                    on: Sequelize.literal(
                                        "`customerVehicleRelations->customerDetail->customerGroup`.`id` = `customerVehicleRelations->customerDetail`.`id` "
                                    )
                                }
                            ]
                        },
                        {
                            model: CustomerMaster.CustomerContact,
                            on: Sequelize.literal(
                                "`customerVehicleRelations`.`customerId` = `customerVehicleRelations->customerDetail`.`id` "
                            )
                        }
                    ]
                }
            ]
        })
    }
}