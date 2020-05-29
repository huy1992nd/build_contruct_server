const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
  return {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1
    },
    invoiceNo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    invoiceType: {
      type: Sequelize.ENUM,
      values: [StatusEnum.contractInvoiceType]
    },
    invoiceDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    billingType: {
      type: Sequelize.ENUM,
      values: [StatusEnum.contractInvoiceBillingType]
    },
    billingDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    billingId: {
      type: Sequelize.STRING
    },
    attentionTo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    department: {
      type: Sequelize.STRING,
      allowNull: false
    },
    source: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Contract'
    },

    tenantId: {
      type: Sequelize.UUID,
      allowNull: true
    },
    companyId: {
      type: Sequelize.UUID,
      allowNull: true
    },
    branchId: {
      type: Sequelize.UUID,
      allowNull: true
    },

    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      defaultValue: StatusEnum.UNPAID,
      values: [StatusEnum.contractInvoiceStatus],
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
    },
    billTo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    billToName: {
      type: Sequelize.STRING,
      allowNull: true
    },
  };
}