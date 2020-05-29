const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "marginLimitTableListValue";
const modelName = "marginLimitTableListValue";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
// const MarginLimitDealerValue = require('../../database/db').MarginLimitDealerValues;
// const MarginLimitDealerGroup = require('../../database/db').MarginLimitDealerGroup;
// const MarginLimitRegistrationRegion = require('../../database/db').MarginLimitRegistrationRegion;


// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class MarginLimitTableListValue extends Sequelize.Model {
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
        //   this.myAssociation = this.belongsTo(models.DiscretionaryMarginLimit, { foreignKey: 'discreationaryMarginLimitID', targetKey: 'id' });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            // include: [{
            //     model: OrderSetup,
            // }],
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            // include: [{
            //     model: OrderSetup,
            // }],
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null, skipInclude = false) {
        let include;
        if (!skipInclude) {
            // include = [{
            //     model: OrderSetup,
            // }];
        }
        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
            ...pagination,
            order: [orderBy],
        }, transaction);
    }

    static getRecordsNoInclude(pagination, orderBy, where, transaction = null) {
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

    static addNew(record, transaction = null) {
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
                ...whereObj
            },
            include: includes,
            ...pagination,
            order: [orderBy]
        });
    }

    // static deleteHard(where) {
    //     
    //         return this.destroy({
    //             where: where
    //         });
    //     });
    // }

}