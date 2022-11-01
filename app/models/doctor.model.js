module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define("doctors", {
        name: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        specialty: {
            type: Sequelize.STRING
        }
    });
    return Doctor;
};