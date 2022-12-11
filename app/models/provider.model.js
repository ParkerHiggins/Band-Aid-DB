module.exports = (sequelize, Sequelize) => {
    const Provider = sequelize.define("providers", {
        name: {
            type: Sequelize.STRING,
            // primaryKey: true
        },
        coverage_offered: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.INTEGER
        }
    });
    return Provider;
};