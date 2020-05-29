const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
  return {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1
    },
    jvsCalendarId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    monthIndex: {
      type: Sequelize.INTEGER(2),
      allowNull: false
    },
    monthName: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    monthPayroll: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    branchCutoffDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    financeCutoffDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    isPrinted: {
      type: Sequelize.BOOLEAN
    },
    printDate: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      defaultValue: StatusEnum.JVSTRANSACTIONSTATUS.INACTIVE,
      values: [StatusEnum.JvsTransactionStatus],
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