module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patients", {
        name: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        gender: {
            type: Sequelize.STRING
        },
        race: {
            type: Sequelize.STRING
        },
        condition_name: {
            type: Sequelize.STRING
        },
        room_number: {
            type: Sequelize.INTEGER
        }
    });
    return Patient;
};