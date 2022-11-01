module.exports = app => {
    const doctors = require("../controllers/doctor.controller.js");

    var router = require("express").Router();

    // todo: ensure proper headers for authentication later

    // Create a new Doctor
    router.post("/", doctors.create);

    // Retrieve all Doctors
    router.get("/", doctors.findAll);

    // Retrieve a single Doctor with id
    router.get("/:id", doctors.findOne);

    // Update a Doctor with id
    router.put("/:id", doctors.update);

    // Delete a Doctor with id
    router.delete("/:id", doctors.delete);

    // Delete all Doctors
    router.delete("/", doctors.deleteAll);

    app.use('/api/doctors', router);
};