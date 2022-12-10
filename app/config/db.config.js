module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "junk1234",
    DB: "band_aid_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}