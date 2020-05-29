const Sequelize = require("sequelize");

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        edisposalId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cycleNo: {
            type: Sequelize.SMALLINT(6),
            allowNull: false
        },
        nettradeinvalue: {
            type: Sequelize.DECIMAL(9, 2)
        },
        lastPriceGuideId: {
            type: Sequelize.STRING
        },
        lastProposalId: {
            type: Sequelize.STRING
        },
        deleted: {
            type: Sequelize.TINYINT,
            allowNull: false
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