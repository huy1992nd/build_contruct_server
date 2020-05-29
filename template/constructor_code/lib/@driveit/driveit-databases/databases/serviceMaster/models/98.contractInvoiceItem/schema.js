const Sequelize = require("sequelize");

module.exports = () => {
  return {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1
    },
    regNo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastBillingAccumulatedMileage: {
      type: Sequelize.INTEGER,
    },
    currentAccumulatedMileage: {
      type: Sequelize.INTEGER,
    },
    billingMileage: {
      type: Sequelize.INTEGER,
    },
    labourAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    partsAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    totalBeforeTaxAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    labourTaxAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    partsTaxAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    netAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    isMileageInvolved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
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