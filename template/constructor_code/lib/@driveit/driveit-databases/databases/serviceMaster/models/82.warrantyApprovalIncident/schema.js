const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        warrantyApprovalId: {
            type: Sequelize.UUID
        },
        warrantyClaimStatusId: {
            type: Sequelize.UUID
        },
        warrantyProfileId: {
            type: Sequelize.UUID
        },
        warrantyClaimTypeId: {
            type: Sequelize.UUID
        },
        warrantyCategoryId: {
            type: Sequelize.UUID
        },
        warrantyClaimCategoryId: {
            type: Sequelize.UUID
        },
        symptomCategoryId: {
            type: Sequelize.UUID
        },
        symptomCodeId: {
            type: Sequelize.UUID
        },
        troubleCodeId: {
            type: Sequelize.UUID
        },
        warrantyClassCodeId: {
            type: Sequelize.UUID
        },
        warrantySymptomCategoryId: {
            type: Sequelize.UUID
        },
        sourceofProblemId: {
            type: Sequelize.UUID
        },
        pNCCodeId: {
            type: Sequelize.UUID
        },
        defectMaterialId: {
            type: Sequelize.UUID
        },
        defectMaterialName: {
            type: Sequelize.STRING
        },
        warrantyIncidentNo: {
            type: Sequelize.STRING
        },
        warrantyClaimFormNo: {
            type: Sequelize.STRING
        },
        warrantyAppovalNumber: {
            type: Sequelize.STRING
        },
        mileage: {
            type: Sequelize.STRING
        },
        typeWithTech: {
            type: Sequelize.STRING
        },
        problem: {
            type: Sequelize.STRING
        },
        cause: {
            type: Sequelize.STRING
        },
        rectification: {
            type: Sequelize.STRING
        },
        remarksNSDOfficer: {
            type: Sequelize.STRING
        },
        totalLabour: {
            type: Sequelize.DECIMAL(15, 2)
        },
        totalPart: {
            type: Sequelize.DECIMAL(15, 2)
        },
        taxAmount: {
            type: Sequelize.DECIMAL(15, 2)
        },
        totalAmount: {
            type: Sequelize.DECIMAL(15, 2)
        },
        partsPurchaseInvoiceNo: {
            type: Sequelize.STRING
        },
        warrantyExpiredDate: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: 'New',
            values: [StatusEnum.recallStatuses],
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.UUID,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.UUID,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fileName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fileUrl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        uploadBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        uploadDate: {
            type: Sequelize.STRING,
            allowNull: true
        }
    };
}