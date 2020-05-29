const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        PaymentID: { type: Sequelize.STRING(36), allowNull: false },
        InvoiceID: { type: Sequelize.STRING(36), allowNull: true },
        RepairOrderID: { type: Sequelize.STRING(36), allowNull: true },
        PaymentModeCode: { type: Sequelize.STRING(36), allowNull: true },
        Or_id: { type: Sequelize.STRING(36), allowNull: false },
        OR_no: { type: Sequelize.STRING(36), allowNull: false },
        OR_date: { type: Sequelize.DATE, allowNull: true },
        OR_totalamount: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
        OR_remark: { type: Sequelize.STRING(100), allowNull: true },
        OR_payeecode: { type: Sequelize.STRING(30), allowNull: true },
        OR_payeename: { type: Sequelize.STRING(100), allowNull: true },
        OR_address1: { type: Sequelize.STRING(50), allowNull: true },
        OR_address2: { type: Sequelize.STRING(50), allowNull: true },
        OR_address3: { type: Sequelize.STRING(50), allowNull: true },
        OR_postcode: { type: Sequelize.STRING(50), allowNull: true },
        OR_statecode: { type: Sequelize.STRING(50), allowNull: true },
        OR_countrycode: { type: Sequelize.STRING(50), allowNull: true },
        OR_branchcode: { type: Sequelize.STRING(50), allowNull: true },
        OR_reference1: { type: Sequelize.STRING(50), allowNull: true },
        OR_reference2: { type: Sequelize.STRING(50), allowNull: true },
        OR_reference3: { type: Sequelize.STRING(50), allowNull: true },
        OR_accountno: { type: Sequelize.STRING(20), allowNull: true },
        OR_accdesc: { type: Sequelize.STRING(30), allowNull: true },
        OR_createdby: { type: Sequelize.STRING(100), allowNull: true },
        OR_createddatetime: { type: Sequelize.DATE, allowNull: true },
        ORitem_itemindex: { type: Sequelize.INTEGER(4), allowNull: true },
        ORitem_typecode: { type: Sequelize.STRING(30), allowNull: true },
        ORitem_amount: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
        Oritemdetail_refcode: { type: Sequelize.STRING(15), allowNull: true },
        Oritemdetail_value: { type: Sequelize.STRING(50), allowNull: true },
        dnid: { type: Sequelize.STRING(36), allowNull: true },
        dnno: { type: Sequelize.STRING(36), allowNull: true },
        dndate: { type: Sequelize.DATE, allowNull: true },
        isPosted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        // createdby: { type: Sequelize.STRING(50), allowNull: false },
        createdBy: { type: Sequelize.STRING(50), allowNull: false },
        // modifiedby: { type: Sequelize.STRING(50), allowNull: true },
        updatedBy: { type: Sequelize.STRING(50), allowNull: true },
    };
}