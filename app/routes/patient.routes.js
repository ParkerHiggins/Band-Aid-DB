const {authJwt} = require("../middleware");
const patients = require("../controllers/patient.controller.js");

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

    // Create a new Patient
    app.post("/api/patients/", [authJwt.verifyToken], patients.create);

    // Retrieve all Patients
    app.get("/api/patients/", [authJwt.verifyToken], patients.findAll);

    // Retrieve a single Patient with id
    app.get("/api/patients/:id", [authJwt.verifyToken], patients.findOne);

    // Update a Patient with id
    app.put("/api/patients/:id", [authJwt.verifyToken], patients.update);

    // Delete a Patient with id
    app.delete("/api/patients/:id", [authJwt.verifyToken], patients.delete);

    // Delete all Patients
    app.delete("/api/patients/", [authJwt.verifyToken], patients.deleteAll);
};