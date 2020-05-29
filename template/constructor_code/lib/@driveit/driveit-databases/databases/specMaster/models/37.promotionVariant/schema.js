const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        variantId: {
            type: Sequelize.UUID,
            references: {
                model: "variant", 
                key: "id", 
            }
        },
        promotionId: {
            type: Sequelize.UUID,
            references: {
                model: "promotion", 
                key: "id", 
            }
        },
    };
};
