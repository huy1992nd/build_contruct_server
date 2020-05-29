const Sequelize = require("sequelize");
const schema = require("./schema");

const tableName = "navisionCustomerHistory";
const modelName = "navisionCustomerHistory";
const Op = Sequelize.Op;
const Utils = require("../../../../utils/database.utils");

module.exports = class NavisionCustomerHistory extends Sequelize.Model {
  static init(sequelize, DataTypes, databaseName) {
    return super.init(schema(DataTypes), {
      tableName,
      modelName,
      schema: databaseName,
      sequelize,
    });
  }

  //associations
  static associate(models) { }

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

  static searchAll(
    likeArr = [],
    attributes = null,
    pagination,
    orderBy,
    filterArr = [],
    skipInclude = false
  ) {
    let prepQry = [];
    let where = {};
    if (likeArr.length > 0) {
      _.forEach(likeArr, (likeArrItem) => {
        let qry = {};
        qry[likeArrItem.colId] = { [Op.like]: likeArrItem.text };
        prepQry.push(qry);
      });
      where = { [Op.or]: prepQry };
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
          [Op.not]: true,
        },
      },
      include,
      ...pagination,
      order: [orderBy],
    };
    if (attributes !== null && !_.isEmpty(attributes)) {
      searchAllObj["attributes"] = attributes;
    }

    return this.findAndCountAll(searchAllObj);
  }

  static addRecord(record, transaction = null) {
    return this.create(
      record,
      {
        returning: true,
      },
      transaction
    );
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
};
