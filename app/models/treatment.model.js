module.exports = (sequelize, Sequelize) => {
    const Treatment = sequelize.define("treatments", {
        name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        duration: {
            type: Sequelize.STRING
        },
        cost: {
            type: Sequelize.INTEGER
        }
    });
    return Treatment;
};