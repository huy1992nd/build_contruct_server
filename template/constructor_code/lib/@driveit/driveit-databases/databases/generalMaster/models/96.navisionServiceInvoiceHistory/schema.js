const Sequelize = require("sequelize");
const StatusEnum = require("../enums/Status");

module.exports = () => {
  return {
    seqNo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
    },
    companyCode: {
      type: Sequelize.STRING(20),
      defaultValue: '',
    },
    dataType: {
      type: Sequelize.STRING(1),
    },
    documentType: {
      type: Sequelize.STRING(30),
      defaultValue: 'Invoice',
    },
    documentRef: {
      type: Sequelize.STRING(10),
      defaultValue: 'ROINV',
      allowNull: false,
    },
    documentNo: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    externalDocumentNo: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    documentDate: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    customerCode: {
      type: Sequelize.STRING(20),
      defaultValue: '',
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(80),
      defaultValue: '',
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.00,
      allowNull: false,
    },
    bizstreamDimension: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'WS',
    },
    costCenter: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    genProdPostingGroup: {
      type: Sequelize.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    modelCode: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    accessoryCode: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    chassisNo: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    registrationNo: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    userFieldText1: {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    userFieldText2: {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'SPC Cash Sales'
    },
    customerName: {
      type: Sequelize.STRING(50),
      defaultValue: '',
      allowNull: false
    },
    applyToDocumentType: {
      type: Sequelize.STRING(50), defaultValue: '',
    },
    applyToDocumentNo: {
      type: Sequelize.STRING(50), defaultValue: '',
    },
    chequeNo: {
      type: Sequelize.STRING(50), defaultValue: '',
    },
    payeeName: {
      type: Sequelize.STRING(50), defaultValue: '',
    },
    paymentMethod: {
      type: Sequelize.STRING(20), defaultValue: '',
    },
    userFieldText3: {
      type: Sequelize.STRING(50), defaultValue: '',
    },
    userFieldDate1: { // date
      type: Sequelize.STRING(10), defaultValue: '',
    },
    userFieldText4: {
      type: Sequelize.STRING(50), defaultValue: '',
    },
    makeCode: {
      type: Sequelize.STRING(20),
      defaultValue: '',
      allowNull: false
    },
    gstBusPostingGroup: {
      type: Sequelize.STRING(10), defaultValue: 'FUL',
    },
    gstProdPostingGroup: {
      type: Sequelize.STRING(10), defaultValue: '',
    },
    taxCode: {
      type: Sequelize.STRING(10), defaultValue: '',
    },
    gstRate: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    gstAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    gstBaseAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    gstCalcType: {
      type: Sequelize.STRING(10), defaultValue: '',
    },
    supplierName: {
      type: Sequelize.STRING(100), defaultValue: ''
    },
    invoiceNo: {
      type: Sequelize.STRING(100), defaultValue: ''
    },
    supplierBRNNo: {
      type: Sequelize.STRING(30), defaultValue: ''
    },
    reservedField2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reservedField3: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reservedField4: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reservedField5: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reservedField6: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reservedField7: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reservedField8: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reservedField9: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reservedField10: {
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
