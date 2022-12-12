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
db.provider = require("../models/provider.model.js")(sequelize, Sequelize);
db.treatment = require("../models/treatment.model.js")(sequelize, Sequelize);
db.condition = require("../models/condition.model.js")(sequelize, Sequelize);

// TODO: Create connection (TEST)
db.patient.belongsToMany(db.condition, {
    through: "patient_condition",
    foreignKey: "patient_id",
    otherKey: "condition_id"
});
db.condition.belongsToMany(db.patient, {
    through: "patient_condition",
    foreignKey: "condition_id",
    otherKey: "patient_id"
});
// todo: not sure if this is correct, may have to check names behavior in ins_treat
// TODO: Create connection (TEST)
db.provider.belongsToMany(db.treatment, {
    through: "provider_treatment",
    foreignKey: "provider_id",
    otherKey: "treatment_id"
});
db.treatment.belongsToMany(db.provider, {
    through: "provider_treatment",
    foreignKey: "treatment_id",
    otherKey: "provider_id"
});
// This relationship connection works
db.condition.belongsToMany(db.treatment, {
    through: "condition_treatment",
    foreignKey: "condition_id",
    otherKey: "treatment_id",
});
db.treatment.belongsToMany(db.condition, {
    through: "condition_treatment",
    foreignKey: "treatment_id",
    otherKey: "condition_id",
});

// TODO: Create connection (TEST)
db.provider.hasMany(db.patient, {
    as: "patients"
});
db.patient.belongsTo(db.provider, {
    foreignKey: "providerId",
    as: "providers"
});
// TODO: Create connection
db.doctor.hasMany(db.patient, {
    as: "patients"
});
db.patient.belongsTo(db.doctor, {
    as: "doctors",
    foreignKey: "doctorId",
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

//const trx = sequelize.transaction();

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

    db.treatment.bulkCreate([
        {
            name: "Hydration",
            duration: "Everyday",
            cost: 0
        },
        {
            name: "Antiviral Drugs",
            duration: "1-2 weeks",
            cost: 70
        },
        {
            name: "Antibiotics",
            duration: "2-3 weeks",
            cost: 20
        }
    ])

})

/*function trans(callback, done) {
    sequelize.transaction(function (t) {
        function commit(callback) {
            t.commit().done(function (err) {
                console.log('commited')
                if (callback)
                    callback(err)
            })
        }

        function rollback(rollbackErr, callback) {
            t.rollback().done(function (err) {
                if (callback)
                    callback(err || rollbackErr)
            })
        }

        t.done(function () {
            if (done) done()
        })

        callback(commit, rollback, t)
    })
}*/