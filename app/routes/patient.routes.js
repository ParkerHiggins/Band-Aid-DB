module.exports = app => {
    const patients = require("../controllers/patient.controller.js");

    var router = require("express").Router();

    // todo: ensure proper headers for authentication later

    // Create a new Patient
    router.post("/", patients.create);

    // Retrieve all Patients
    router.get("/", patients.findAll);

    // Retrieve a single Patient with id
    router.get("/:id", patients.findOne);

    // Update a Patient with id
    router.put("/:id", patients.update);

    // Delete a Patient with id
    router.delete("/:id", patients.delete);

    // Delete all Patients
    router.delete("/", patients.deleteAll);

    app.use('/api/patients', router);
};