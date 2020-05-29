const Sequelize = require("sequelize");
const Op = Sequelize.Op
const schema = require('./schema');
var _ = require('lodash');

const tableName = "excisePayment";
const modelName = "excisePayment";
const VehicleBookingModel = require('../01.vehicleBooking');
const Make = require('../../../specMaster/models/01.make');
const VariantModel = require('../../../specMaster/models/03.variant');
const ColorModel = require('../../../specMaster/models/11.color');
const ModelModel = require('../../../specMaster/models/02.model');
const BranchModel = require('../../../customerMaster/models/18.branch');
const CompanyModel = require('../../../customerMaster/models/7.company');
const VehicleBookingTradeInDetailModel = require('../34.vehicleBookingTradeInDetail');
// const BookingTypeModel = require('../03.bookingType');
// const VehicleBookingRefundModel = require('../11.vehicleBookingRefund');

const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class ExcisePayment extends ModelWithPublisher {
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
        this.myAssociation = this.belongsTo(models.VehicleBooking, { foreignKey: 'bookingId' });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            }
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            }
        }, transaction);
    }

    static getAllWithCount(where, pagination = { limit: null, offset: 0 }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            ...pagination,
            order: [orderBy]
        });
    }

    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            ...pagination,
            order: [orderBy],
        }, transaction);
    }

    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);

    }

    static updateRecord(record, where, transaction = null) {
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

    static getExcisePayment(pagination, orderBy, where, transaction = null) {
        const generalAttributes = ['id', 'code', 'name'];
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            include: [{
                model: VehicleBookingModel,
                include: [
                    { model: VehicleBookingTradeInDetailModel },
                    // { model: BookingTypeModel },
                    // { model: VehicleBookingRefundModel },
                    {
                        model: Make,
                        on: Sequelize.literal(
                            "`vehicleBooking`.`makeId` = `vehicleBooking->make`.`id` "
                        ),
                        attributes: [...generalAttributes]
                    },
                    {
                        model: VariantModel,
                        on: Sequelize.literal(
                            "`vehicleBooking`.`variantId` = `vehicleBooking->variant`.`id` "
                        ),
                        attributes: [...generalAttributes, 'engineCapacity']
                    },
                    {
                        model: BranchModel,
                        on: Sequelize.literal(
                            "`vehicleBooking`.`branchId` = `vehicleBooking->branch`.`id` "
                        ),
                        attributes: [...generalAttributes],
                        as: "branch",
                        include: [
                            { 
                                model: CompanyModel,
                                as: 'company',
                                attributes: [...generalAttributes, 'companyRegistrationNo']
                            }
                        ]
                    },
                    {
                        model: ModelModel,
                        on: Sequelize.literal(
                            "`vehicleBooking`.`modelId` = `vehicleBooking->model`.`id` "
                        ),
                        attributes: [...generalAttributes]
                    },
                    {
                        model: ColorModel,
                        on: Sequelize.literal(
                            "`vehicleBooking`.`colorId` = `vehicleBooking->color`.`id` "
                        ),
                        attributes: [...generalAttributes]
                    }
                ]
            }],
            distinct: true,
            col: 'id'
        }, transaction);
    }

    static hasRecord() {
        return this.findAll({
            limit: 1
        });
    }

}