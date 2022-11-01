module.exports = (sequelize, Sequelize) => {
    const Insurance_Provider = sequelize.define("insurance_providers", {
        name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        coverage_offered: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.INTEGER
        }
    });
    return Insurance_Provider;
};