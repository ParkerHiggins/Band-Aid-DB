const {authJwt} = require("../middleware");
const doctors = require("../controllers/doctor.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
// module.exports = app => {

    // var router = require("express").Router();

    // todo: ensure proper headers for authentication later

    // Create a new Doctor
    app.post("/api/doctors/", [authJwt.verifyToken], doctors.create);
    // router.post("/", [authJwt.verifyToken], doctors.create);

    // Retrieve all Doctors
    app.get("/api/doctors/", [authJwt.verifyToken], doctors.findAll);
    // router.get("/", [authJwt.verifyToken], doctors.findAll);

    // Retrieve a single Doctor with id
    app.get("/api/doctors/:id", [authJwt.verifyToken], doctors.findOne);
    // router.get("/:id", [authJwt.verifyToken], doctors.findOne);

    // Update a Doctor with id
    app.put("/api/doctors/:id", [authJwt.verifyToken], doctors.update);
    // router.put("/:id", [authJwt.verifyToken], doctors.update);

    // Delete a Doctor with id
    app.delete("/api/doctors/:id", [authJwt.verifyToken], doctors.delete);
    // router.delete("/:id", [authJwt.verifyToken], doctors.delete);

    // Delete all Doctors
    app.delete("/api/doctors/", [authJwt.verifyToken], doctors.deleteAll);
    // router.delete("/", [authJwt.verifyToken], doctors.deleteAll);

    // app.use('/api/doctors', router);
};