module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Corvinus12",
    DB: "band_aid_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}