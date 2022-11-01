module.exports = (sequelize, Sequelize) => {
    const Condition = sequelize.define("conditions", {
        condition_name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        symptoms: {
            type: Sequelize.STRING
        },
        treatment_name: {
            type: Sequelize.STRING
        }
    });
    return Condition;
};