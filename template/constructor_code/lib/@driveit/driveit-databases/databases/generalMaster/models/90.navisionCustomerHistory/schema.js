const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status')

module.exports = () => {
  return {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    dataType: {
      type: Sequelize.STRING(10),
    },
    action: {
      type: Sequelize.STRING(10),
    },
    companyCode: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "TCEC",
    },
    no: {
      type: Sequelize.STRING(20),
    },
    name: {
      type: Sequelize.STRING(50),
    },
    name2: {
      type: Sequelize.STRING(50),
    },
    address: {
      type: Sequelize.STRING(50),
    },
    address2: {
      type: Sequelize.STRING(50),
    },
    address3: {
      type: Sequelize.STRING(50),
    },
    address4: {
      type: Sequelize.STRING(50),
    },
    postCode: {
      type: Sequelize.STRING(20),
    },
    countryCode: {
      type: Sequelize.STRING(10),
    },
    contact: {
      type: Sequelize.STRING(50),
    },
    phoneNo: {
      type: Sequelize.STRING(30),
    },
    faxNo: {
      type: Sequelize.STRING(30),
    },
    email: {
      type: Sequelize.STRING(80),
    },
    registrationNo: {
      type: Sequelize.STRING(20),
    },
    cusVenPostingGroup: {
      type: Sequelize.STRING(10),
    },
    businessPostingGroup: {
      type: Sequelize.STRING(10),
    },
    paymentTermCode: {
      type: Sequelize.STRING(10),
    },
    paymentMethodCode: {
      type: Sequelize.STRING(10),
    },
    gstRegistrationNo: {
      type: Sequelize.STRING(20),
    },
    gstBusinessPostingGroup: {
      type: Sequelize.STRING(10),
    },
    gstStatusLastCheckedDate: {
      type: Sequelize.DATE,
    },
    syncStatus: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: [StatusEnum.syncStatus],
      defaultValue: StatusEnum.FAILED,
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    updatedBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  };
};
