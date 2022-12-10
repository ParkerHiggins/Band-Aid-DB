const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.patient = require("../models/patient.model.js")(sequelize, Sequelize);
db.doctor = require("../models/doctor.model.js")(sequelize, Sequelize);
db.insurance_provider = require("../models/insurance_provider.model.js")(sequelize, Sequelize);
db.treatment = require("../models/treatment.model.js")(sequelize, Sequelize);
db.condition = require("../models/condition.model.js")(sequelize, Sequelize);


//db.condition.create({condition_name: "Cold", symptoms: "Sneezing", treatment_name: "Hydration"});

db.patient.belongsToMany(db.condition, {
    through: "patient_condition",
    foreignKey: "patient_id",
    otherKey: "condition_name"
});
db.condition.belongsToMany(db.patient, {
    through: "patient_condition",
    foreignKey: "condition_name",
    otherKey: "patient_id"
});
// todo: not sure if this is correct, may have to check names behavior in ins_treat
db.insurance_provider.belongsToMany(db.treatment, {
    through: "insurance_treatment",
    foreignKey: "provider_name",
    otherKey: "treatment_name"
});
db.treatment.belongsToMany(db.insurance_provider, {
    through: "insurance_treatment",
    foreignKey: "treatment_name",
    otherKey: "provider_name"
});
db.condition.hasMany(db.treatment, {});
db.treatment.belongsTo(db.condition, {
    foreignKey: "condition_name",
});
db.insurance_provider.hasMany(db.patient, {});
db.patient.belongsTo(db.insurance_provider, {
    foreignKey: {
        name: "provider_name"
    }
    // foreignKey: "provider_name",
});
db.doctor.hasMany(db.patient, {});
db.patient.belongsTo(db.doctor, {
    foreignKey: "doctor_id",
});



db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;

sequelize.sync({force:true}).then(function() {
    db.condition.bulkCreate([
        {
        condition_name: "Cold",
        symptoms: "Sneezing, Coughing, Runny Nose",
        treatment_name: "Hydration"
        },
        {
        condition_name: "Flu",
        symptoms: "Fever",
        treatment_name: "Antiviral Drugs"
        },
        {
        condition_name: "Pneumonia",
        symptoms: "Difficulty Breathing, Fever, Sweating",
        treatment_name: "Antibiotics"
        }
    ])
})

sequelize.sync({force:true}).then(function() {
    db.treatment.bulkCreate([
        {
            name: "Hydration",
            duration: "Everyday",
            cost: 0
        },
        {
            condition_name: "Antiviral Drugs",
            duration: "1-2 weeks",
            cost: 70
        },
        {
            condition_name: "Antibiotics",
            duration: "2-3 weeks",
            cost: 20
        }
    ])
})

