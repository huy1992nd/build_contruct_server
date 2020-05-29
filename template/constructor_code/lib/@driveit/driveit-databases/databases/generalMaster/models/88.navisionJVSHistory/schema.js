const Sequelize = require('sequelize');
const StatusEnum = require('../enums/Status');

module.exports = () => {
  return {
    recordId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    seqNo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    recordId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    seqNo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    companyCode: {
      type: Sequelize.STRING(20),
      defaultValue: 'TCEC',
    },
    dataType: {
      type: Sequelize.STRING(1),
    },
    documentType: {
      type: Sequelize.STRING(30),
    },
    documentRef: {
      type: Sequelize.STRING(5),
      defaultValue: StatusEnum.JVS,
      allowNull: false,
    },
    documentNo: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    externalDocumentNo: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    documentDate: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    customerCode: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    bizstreamDimension: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'NV',
    },
    costCenter: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genPropPostingGroup: {
      type: Sequelize.STRING(10),
    },
    modelCode: {
      type: Sequelize.STRING(20),
    },
    accessoryCode: {
      type: Sequelize.STRING(20),
    },
    chassisNo: {
      type: Sequelize.STRING(20),
    },
    registrationNo: {
      type: Sequelize.STRING(20),
    },
    userFieldText1: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    userFieldText2: {
      type: Sequelize.STRING(50),
    },
    customerName: {
      type: Sequelize.STRING(50),
    },
    applyToDocumentType: {
      type: Sequelize.STRING(50),
    },
    applyToDocumentNo: {
      type: Sequelize.STRING(50),
    },
    chequeNo: {
      type: Sequelize.STRING(20),
    },
    payeeName: {
      type: Sequelize.STRING(50),
    },
    paymentMethod: {
      type: Sequelize.STRING(20),
    },
    userFieldText3: {
      type: Sequelize.STRING(50),
    },
    userFieldDate1: {
      type: Sequelize.STRING(50),
    },
    userFieldText4: {
      type: Sequelize.STRING(50),
    },
    makeCode: {
      type: Sequelize.STRING(20),
    },
    gstBusPostingGroup: {
      type: Sequelize.STRING(10),
    },
    gstPropPostingGroup: {
      type: Sequelize.STRING(10),
    },
    taxCode: {
      type: Sequelize.STRING(10),
    },
    gstRate: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    gstAmount: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    gstBaseAmount: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    gstCalcType: {
      type: Sequelize.STRING(10),
    },
    supplierName: {
      type: Sequelize.STRING(100),
    },
    invoiceNo: {
      type: Sequelize.STRING(100),
    },
    supplierBRNNo: {
      type: Sequelize.STRING(30),
    },
    branchId: {
      type: Sequelize.STRING,
      allowNull: true,
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
  };
};
