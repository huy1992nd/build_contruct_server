const Sequelize = require("sequelize");
const StatusEnum = require("../enums/Status");
const errorDef = require("../../../../utils/error.codes");

module.exports = () => {
  return {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: true
    },

    code: {
      type: Sequelize.STRING,
      allowNull: false,
      // unique: true, // to allow update based on status 'deleted',
      validate: {
        len: {
          args: [1, 20],
          msg: "Code length is not in this range",
        },
      },
    },


    reasonDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    module: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    submodule: {
      type: Sequelize.STRING,
      allowNull: false,
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
      validate: {
        NOT_UNIQUE: function (deleted, next) {
          if (deleted) {
            return next();
          }

          const Model = require("./index");
          return Model.getId({
            id: this.id,
          }).then((record) => {
            if (!record) return next();
            //get all code
            return Model.getAll({
              code: record.code,
            })
              .then((res) => {
                let recordArray = res.rows;
                if (recordArray.length > 0) {
                  recordArray.forEach((record) => {
                    if (record && !record.deleted && this.id != record.id) {
                      return next(errorDef.NOT_UNIQUE.message);
                    }
                  });
                }
                return next();
              })
              .catch((err) => {
                return next(err);
              });
          });
        },
      },
    },

    inactivateReason: {
      type: Sequelize.STRING,
    },
    
    createdBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    updatedBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };
};