const {authJwt} = require("../middleware");
const treatments = require("../controllers/treatment.controller.js");

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

    // Create a new Treatment
    app.post("/api/treatments/", [authJwt.verifyToken], treatments.create);
    // router.post("/", [authJwt.verifyToken], treatments.create);

    // Retrieve all Treatments
    app.get("/api/treatments/", [authJwt.verifyToken], treatments.findAll);
    // router.get("/", [authJwt.verifyToken], treatments.findAll);

    // Retrieve a single Treatment with id
    app.get("/api/treatments/:id", [authJwt.verifyToken], treatments.findOne);
    // router.get("/:id", [authJwt.verifyToken], treatments.findOne);

    // Update a Treatment with id
    app.put("/api/treatments/:id", [authJwt.verifyToken], treatments.update);
    // router.put("/:id", [authJwt.verifyToken], treatments.update);

    // Delete a Treatment with id
    app.delete("/api/treatments/:id", [authJwt.verifyToken], treatments.delete);
    // router.delete("/:id", [authJwt.verifyToken], treatments.delete);

    // Delete all Treatments
    app.delete("/api/treatments/", [authJwt.verifyToken], treatments.deleteAll);
    // router.delete("/", [authJwt.verifyToken], treatments.deleteAll);

    // app.use('/api/treatments', router);
};