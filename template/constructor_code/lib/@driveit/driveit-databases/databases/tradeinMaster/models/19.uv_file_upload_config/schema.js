const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        folder_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        maxlimit: {
            type: Sequelize.TINYINT,
        },
        minlimit: {
            type: Sequelize.TINYINT,
        },
        filesize: {
            type: Sequelize.INTEGER,
        },
        file_ext: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        file_ext_doc: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        seqNo: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        seqNoED: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isShowEdisposal: {
            type: Sequelize.TINYINT,
            allowNull: true,
            defaultValue: '0'
        },
        referenceTbl: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
    };
}