const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const VehicleBookingTradeInDetailModel = require('../34.vehicleBookingTradeInDetail');
const BookingTypeModel = require('../03.bookingType');
const VehicleBookingRefundModel = require('../11.vehicleBookingRefund');
const VehicleBookingFreeGiftModel = require('../81.vehicleBookingFreeGift');
const accessoriesFitment = require('../36.accessoriesFitment');
const VehicleTransferModel = require('../47.vehicleTransfer');
const BookingFeeModel = require('../76.bookingFee');

const tableName = "vehicleBooking";
const modelName = "vehicleBooking";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const GeneralMaster = require('../../../generalMaster');
const CustomerMaster = require('../../../customerMaster');
const SpecMaster = require('../../../specMaster');
const Auth = require('../../../auth');

const LeadModel = require('../07.lead');
const LeadCustomerModel = require('../08.leadCustomer');
const listing = require('../../../../utils/listing');

const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;

const isNotDeleted = {
    deleted: { [Op.not]: true }
};

module.exports = class VehicleBooking extends ModelWithPublisher {

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

        this.myAssociation = this.belongsTo(models.VehicleBookingTradeInDetail, {
            foreignKey: 'vehicleBookingTradeInDetailId',
            targetKey: 'id'
        });

        this.myAssociation = this.belongsTo(models.BookingType, {
            foreignKey: 'bookingTypeId',
            targetKey: 'id'
        });

        this.myAssociation = this.hasMany(models.AccessoriesFitment, {
            foreignKey: 'vehicleBookingId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.AccessoriesFitmentDocument, {
            foreignKey: 'vehicleBookingId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.AccessoriesItem, {
            foreignKey: 'vehicleBookingId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.VehicleBookingRefund, {
            foreignKey: 'vehicleBookingId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.VehicleBookingFreeGift, {
            foreignKey: 'vehicleBookingId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.BookingFee, {
            foreignKey: 'bookingNo',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasOne(SpecMaster.VehicleUsage, {
            sourceKey: "vehicleUsageId",
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Color, {
            sourceKey: "colorId",
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Product, {
            sourceKey: "productId",
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Package, {
            sourceKey: "packageId",
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Make, {
            sourceKey: "makeId",
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Variant, {
            sourceKey: "variantId",
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Model, {
            sourceKey: "modelId",
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(GeneralMaster.WarrantyProfile, {
            sourceKey: "warrantyProfileId",
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(GeneralMaster.PaymentMethod, {
            sourceKey: "paymentTermsId",
            foreignKey: "id",
            as: 'paymentTerms'
        });
        this.myAssociation = this.hasOne(GeneralMaster.VendorBasic, {
            sourceKey: "financierId",
            foreignKey: "id",
            as: 'financier'
        });

        this.myAssociation = this.hasOne(CustomerMaster.Customer, {
            sourceKey: "customerId",
            foreignKey: "id"
        });

        this.myAssociation = this.hasOne(CustomerMaster.Branch, {
            foreignKey: "id",
            sourceKey: "branchId",
            as: "branch"
        });

        this.myAssociation = this.hasOne(CustomerMaster.Company, {
            foreignKey: "id",
            sourceKey: "companyId"
        });
        this.myAssociation = this.hasOne(CustomerMaster.StorageLocation, {
            foreignKey: "id",
            sourceKey: "storageLocationId"
        });

        this.myAssociation = this.hasOne(CustomerMaster.Branch, {
            foreignKey: "id",
            sourceKey: "vehicleCurrentLocationId",
            as: "vehicleCurrentLocation"
        });

        this.myAssociation = this.hasOne(Auth.Employees, {
            foreignKey: "id",
            sourceKey: "salesPersonId",
            as: "salesPerson",
        });

        // this.myAssociation = this.hasOne(Auth.InternalUsers, {
        //     foreignKey: "id",
        //     sourceKey: "salesPersonId",
        //     as: "salesPerson",
        // });

        this.myAssociation = this.hasOne(Auth.InternalUsers, {
            foreignKey: "id",
            sourceKey: "updatedBy",
            as: "updatedByInfo",
        });

        this.myAssociation = this.hasOne(Auth.InternalUsers, {
            foreignKey: "id",
            sourceKey: "createdBy",
            as: "createdByInfo",
        });
        /*  this.myAssociation = this.hasOne(models.Lead, {
             foreignKey: "id",
             sourceKey: "leadId",
             as: "lead",
         }); */

        this.myAssociation = this.belongsTo(models.Lead, {
            foreignKey: 'leadId',
            targetKey: 'id'
        });
        this.myAssociation = this.hasOne(SpecMaster.Vehicle, {
            sourceKey: "vehicleId",
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(models.VehicleTransfer, {
            sourceKey: "vehicleId",
            foreignKey: "vehicleId",
            as: "vehicleTransfer"
        });
    }

    //methods
    static getId(where) {
        let status = {};
        status['deleted'] = {
            [Op.not]: true
        };
        // return this.findOne({ /** this caused error..  */
        return this.findAll({
            limit: 1,
            where: {
                ...where,
                [Op.and]: status
            },
            include: [{
                model: VehicleBookingTradeInDetailModel
            },
            {
                model: BookingTypeModel
            },
            {
                model: VehicleBookingRefundModel
            },
            {
                model: VehicleBookingFreeGiftModel,
            }
            ],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attributes = null, pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        
        return this.findAndCountAll({
            where: {
                ...where,
                [Op.and]: listing.isNotDeleted
            },
            ...pagination,
            include: [{
                model: VehicleBookingTradeInDetailModel
            },
            {
                model: BookingTypeModel
            },
            {
                model: VehicleBookingRefundModel
            },
            {
                model: VehicleBookingFreeGiftModel
            }
            ],
            order: [orderBy]
        });
    }

    static getAllWithIncludes(whereObj, includes, pagination, orderBy, filterArr = []) {
        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    whereObj[k] = v;
                });
            });
        }

        return this.findAndCountAll({
            where: {
                ...whereObj,
                [Op.and]: listing.isNotDeleted
            },
            include: includes.concat([{
                model: VehicleBookingTradeInDetailModel
            },
            {
                model: BookingTypeModel
            },
            {
                model: VehicleBookingRefundModel
            },
            {
                model: VehicleBookingFreeGiftModel
            }
            ]),
            ...pagination,
            order: [orderBy]
        });
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
            include = [{
                model: VehicleBookingTradeInDetailModel
            },
            {
                model: BookingTypeModel
            },
            {
                model: VehicleBookingRefundModel
            },
            {
                model: VehicleBookingFreeGiftModel
            }
            ];
        }

        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
            distinct: true,
            ...pagination,
            order: [orderBy]
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
    }


    static searchAllV2(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
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

        const generalAttributes = ['id', 'code', 'name'];
        const colorAttributes = ['id', 'code', 'name', 'jpjColorId'];

        if (!skipInclude) {
            include = [
                {
                    model: VehicleBookingTradeInDetailModel,
                },
                {
                    model: BookingTypeModel,
                    attributes: [...generalAttributes]
                },
                {
                    model: VehicleBookingRefundModel,
                    separate: true,
                },
                {
                    model: LeadModel,
                    attributes: ['id', 'leadCustId'],
                    as: "lead",
                    include: [
                        {
                            model: LeadCustomerModel,
                            attributes: ['id', 'name', 'companyName']
                        }
                    ]
                },
                {
                    model: SpecMaster.VehicleUsage,
                    attributes: [...generalAttributes],
                },
                {
                    model: SpecMaster.Color,
                    attributes: [...colorAttributes],
                },
                {
                    model: SpecMaster.Product,
                    attributes: [...generalAttributes],
                },
                {
                    model: SpecMaster.Package,
                    attributes: [...generalAttributes],
                },
                {
                    model: SpecMaster.Make,
                    attributes: [...generalAttributes],
                },
                {
                    model: SpecMaster.Variant,
                    attributes: [...generalAttributes],
                },
                {
                    model: SpecMaster.Model,
                    attributes: [...generalAttributes],
                },
                {
                    model: GeneralMaster.WarrantyProfile,
                    attributes: [...generalAttributes],
                },
                {
                    model: CustomerMaster.Customer,
                    attributes: ['id', 'name', 'identityNo'],
                    include: [
                        {
                            model: GeneralMaster.Salutation,
                            attributes: [...generalAttributes],
                        },
                        {
                            model: GeneralMaster.Identity,
                            attributes: [...generalAttributes],
                        },
                        {
                            model: CustomerMaster.CustomerAccountGroup,
                            attributes: [...generalAttributes],
                        },
                        {
                            model: CustomerMaster.CustomerContact,
                            separate: true,
                        },
                        {
                            model: CustomerMaster.CustomerFinance,
                            separate: true,
                        },
                        {
                            model: CustomerMaster.CustomerDetails,
                            separate: true,
                            // attributes: ['id', 'email', 'gender', 'fax', 'mobile', 'telephone'],
                            include: [
                                {
                                    model: CustomerMaster.CustomerGroup,
                                    attributes: [...generalAttributes],
                                },
                                {
                                    model: GeneralMaster.PostCode,
                                    as: "cPostcode",
                                    attributes: ["id", "code"],
                                },
                                {
                                    model: GeneralMaster.PostCode,
                                    as: "mPostcode",
                                    attributes: ["id", "code"],
                                },
                                {
                                    model: GeneralMaster.State,
                                    as: "mState",
                                    attributes: [...generalAttributes],
                                },
                                {
                                    model: GeneralMaster.City,
                                    as: "mCity",
                                    attributes: [...generalAttributes],
                                },
                                {
                                    model: GeneralMaster.Country,
                                    as: "mCountry",
                                    attributes: [...generalAttributes],
                                }
                            ]
                        }]
                },
                {
                    model: CustomerMaster.Branch,
                    as: "branch",
                    attributes: [...generalAttributes],
                },
                {
                    model: CustomerMaster.StorageLocation,
                    as: "storageLocation",
                    attributes: ['id', 'branchId', 'storageId'],
                    include: [
                        {
                            model: CustomerMaster.Storage,
                            attributes: [...generalAttributes],
                        }
                    ]
                },
                {
                    model: CustomerMaster.Branch,
                    as: "vehicleCurrentLocation",
                    attributes: [...generalAttributes],
                },
                {
                    model: Auth.InternalUsers,
                    attributes: ['id', 'fullName'],
                    as: "salesPerson",
                },
                {
                    model: Auth.InternalUsers,
                    attributes: ['id', 'fullName'],
                    as: "updatedByInfo",
                },
                {
                    model: Auth.InternalUsers,
                    attributes: ['id', 'fullName'],
                    as: "createdByInfo",
                },
                {
                    model: accessoriesFitment,
                    separate: true,
                },
                {
                    model: VehicleBookingFreeGiftModel,
                    include: [
                        {
                            model: GeneralMaster.MaterialMaster
                        }
                    ],
                    separate: true,
                }
            ];
        }

        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
            distinct: true,
            subQuery: false,
            ...pagination,
            order: [[Sequelize.literal(orderBy.columnName), orderBy.direction]]
        };


        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
    }

    static getRecords3({
        pagination,
        where,
        orderBy,
        include,
    }) {

        const generalAttributes = ['id', 'code', 'name'];
        const colorAttributes = ['id', 'code', 'name', 'jpjColorId'];
        const generalExcluse = ['deleted', 'createdBy', 'updatedBy','createdAt', 'updatedAt'];

        const customInclude = [
            {
                model: VehicleBookingTradeInDetailModel,
                attributes: {
                    exclude: [...generalExcluse]
                }
            },
            {
                model: BookingTypeModel,
                attributes: [...generalAttributes]
            },
            {
                model: VehicleBookingRefundModel,
                attributes: {
                    exclude: [...generalExcluse]
                }
            },
            {
                model: LeadModel,
                attributes: ['id', 'leadCustId'],
                as: "lead",
                include: [
                    {
                        model: LeadCustomerModel,
                        attributes: ['id', 'name', 'companyName', 'mobileNumber', 'address1', 'address2', 'address3', 'postcodeId', 'cityId', 'stateId', 'countryId'],
                        include: [
                            {
                                model: GeneralMaster.PostCode,
                                attributes: ["id", "code"],
                            },
                            {
                                model: GeneralMaster.State,
                                attributes: [...generalAttributes],
                            },
                            {
                                model: GeneralMaster.City,
                                attributes: [...generalAttributes],
                            },
                            {
                                model: GeneralMaster.Country,
                                attributes: [...generalAttributes],
                            }
                        ]
                    }
                ]
            },
            {
                model: VehicleTransferModel,
                attributes: ["id", "vehicleId", "transferId", "doType", "bdoId", "deliveryDate"],
                as: "vehicleTransfer"
            },
            {
                model: SpecMaster.Vehicle,
                attributes: ["id", "exciseNo", "chassisNo", "engineNo", "regNo", "registrationDate"],
            },
            {
                model: SpecMaster.VehicleUsage,
                attributes: [...generalAttributes],
            },
            {
                model: SpecMaster.Color,
                attributes: [...colorAttributes],
            },
            {
                model: SpecMaster.Product,
                attributes: [...generalAttributes],
            },
            {
                model: SpecMaster.Package,
                attributes: [...generalAttributes],
            },
            {
                model: SpecMaster.Make,
                attributes: [...generalAttributes],
            },
            {
                model: SpecMaster.Variant,
                attributes: [...generalAttributes],
            },
            {
                model: SpecMaster.Model,
                attributes: [...generalAttributes],
            },
            {
                model: GeneralMaster.WarrantyProfile,
                attributes: [...generalAttributes],
            },
            {
                model: GeneralMaster.PaymentMethod,
                attributes: [...generalAttributes],
                as: 'paymentTerms'
            },
            {
                model: GeneralMaster.VendorBasic,
                // attributes: [...generalAttributes],
                attributes: {
                    exclude: [...generalExcluse]
                },
                as: 'financier',
                include: [
                    {
                        model: GeneralMaster.FinancierType,
                        attributes: [...generalAttributes]
                    },
                    { model: GeneralMaster.VendorCommunication,
                        attributes: {
                            exclude: [...generalExcluse]
                        } }
                ]
            },
            {
                model: CustomerMaster.Customer,
                attributes: ['id', 'name', 'identityNo'],
                include: [
                    {
                        model: GeneralMaster.Salutation,
                        attributes: [...generalAttributes],
                    },
                    {
                        model: GeneralMaster.Identity,
                        attributes: [...generalAttributes],
                    },
                    {
                        model: CustomerMaster.CustomerAccountGroup,
                        attributes: [...generalAttributes],
                    },
                    {
                        model: CustomerMaster.CustomerContact,
                        attributes: {
                            exclude: [...generalExcluse]
                        }
                    },
                    {
                        model: CustomerMaster.CustomerFinance,
                        attributes: ["id", "companyId", "customerGroupId", "paymentTermsId", "currencyId", "creditLimit", "blockOptionsIds", "taxClassId", "vatNumber", "paymentMethodId"],
                        include: [{
                            model: CustomerMaster.TaxClass,
                            attributes: [...generalAttributes],
                        },{
                            model: CustomerMaster.CustomerGroup,
                            attributes: [...generalAttributes],
                        }]
                    },
                    {
                        model: CustomerMaster.CustomerDetails,
                        // attributes: ['id', 'email', 'gender', 'fax', 'mobile', 'telephone'],
                        attributes: {
                            exclude: [...generalExcluse]
                        },
                        include: [
                            {
                                model: CustomerMaster.CustomerGroup,
                                attributes: [...generalAttributes],
                            },
                            {
                                model: GeneralMaster.PostCode,
                                as: "cPostcode",
                                attributes: ["id", "code"],
                            },
                            {
                                model: GeneralMaster.PostCode,
                                as: "mPostcode",
                                attributes: ["id", "code"],
                            },
                            {
                                model: GeneralMaster.State,
                                as: "mState",
                                attributes: [...generalAttributes],
                            },
                            {
                                model: GeneralMaster.City,
                                as: "mCity",
                                attributes: [...generalAttributes],
                            },
                            {
                                model: GeneralMaster.Country,
                                as: "mCountry",
                                attributes: [...generalAttributes],
                            }
                        ]
                    }]
            },
            {
                model: CustomerMaster.Branch,
                as: "branch",
                attributes: [...generalAttributes,
                    'address1',
                    'address2',
                    'address3',
                    'postcodeId',
                    'cityId',
                    'stateId',
                    'countryId',
                    'currencyId'],
                include: [
                    {
                        model: GeneralMaster.PostCode,
                        attributes: ["id", "code"],
                    },
                    {
                        model: GeneralMaster.City,
                        attributes: [...generalAttributes]
                    },
                    {
                        model: GeneralMaster.State,
                        attributes: [...generalAttributes]
                    },
                    {
                        model: GeneralMaster.Country,
                        attributes: [...generalAttributes]
                    },
                    {
                        model: GeneralMaster.Currency,
                        attributes: [...generalAttributes]
                    }
                ]
            },
            {
                model: CustomerMaster.Company,
                attributes: [...generalAttributes],
            },
            {
                model: CustomerMaster.StorageLocation,
                as: "storageLocation",
                attributes: ['id', 'branchId', 'storageId'],
                include: [
                    {
                        model: CustomerMaster.Storage,
                        attributes: [...generalAttributes],
                    }
                ]
            },
            {
                model: CustomerMaster.Branch,
                as: "vehicleCurrentLocation",
                attributes: [...generalAttributes],
            },
            // {
            //     model: Auth.InternalUsers,
            //     attributes: ['id', 'employeeId', 'fullName'],
            //     as: "salesPerson",
            // },
            {
                model: Auth.Employees,
                attributes: ['id', 'employeeId', 'fullName'],
                as: "salesPerson",
            },
            {
                model: Auth.InternalUsers,
                attributes: ['id', 'fullName'],
                as: "updatedByInfo",
            },
            {
                model: Auth.InternalUsers,
                attributes: ['id', 'fullName'],
                as: "createdByInfo",
            },
            {
                model: accessoriesFitment,
                attributes: {
                    exclude: [...generalExcluse]
                }
            },
            {
                model: VehicleBookingFreeGiftModel,
                include: [
                    {
                        model: GeneralMaster.MaterialMaster,
                        attributes: ['id', 'materialId', 'materialDescription']
                    }
                ],
            },
            {
                model: BookingFeeModel,
                attributes: {
                    exclude: [...generalExcluse]
                }
            },
        ];
        // const attributes = Object.keys(this.rawAttributes).filter((d) => d!== 'vehicleBookingId');
        return listing.getSearch({
            sequelizeModel: this,
            pagination,
            where,
            orderBy,
            // attributes,
            include: include || customInclude
        });
    }

    static searchAllNoCount(likeArr, attributes = null, skipInclude = false) {
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

        let include = [];
        if (!skipInclude) {
            include = [
                { model: VehicleBookingTradeInDetailModel },
                { model: BookingTypeModel },
                { model: VehicleBookingRefundModel }
            ];
        }

        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAll(searchAllObj);
    }

    static addNew(obj, transaction) {
        return this.create(
            obj, {
            returning: true,
            transaction: transaction
        });
    }

    static updateVehicleBooking(vehicleBooking, where, transaction = null) {
        if (transaction === null) {
            return this.update(vehicleBooking, {
                where,
            });
        } else {
            return this.update(
                vehicleBooking, {
                where,
                returning: true,
                transaction: transaction
            });
        }
    }

    // static matchVehicleBooking(vehicleBooking, where, transaction) {
    //     return this.update(
    //         vehicleBooking
    //         , {
    //         where: where,
    //         returning: true,
    //         transaction: transaction
    //     });
    // }

    // static allocateVehicleBooking(vehicleBooking, where, transaction) {
    //     return this.update(
    //         vehicleBooking
    //         , {
    //         where: where,
    //         returning: true
    //     });
    // }

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

}