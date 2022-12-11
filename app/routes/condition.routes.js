const {authJwt} = require("../middleware");
const conditions = require("../controllers/condition.controller.js");

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

    // Create a new Condition
    app.post("/api/conditions/", [authJwt.verifyToken], conditions.create);
    // router.post("/", [authJwt.verifyToken], conditions.create);

    // Retrieve all Conditions
    app.get("/api/conditions/", [authJwt.verifyToken], conditions.findAll);
    // router.get("/", [authJwt.verifyToken], conditions.findAll);

    // Retrieve a single Condition with id
    app.get("/api/conditions/:id", [authJwt.verifyToken], conditions.findOne);
    // router.get("/:id", [authJwt.verifyToken], conditions.findOne);

    // Update a Condition with id
    app.put("/api/conditions/:id", [authJwt.verifyToken], conditions.update);
    // router.put("/:id", [authJwt.verifyToken], conditions.update);

    // Delete a Condition with id
    app.delete("/api/conditions/:id", [authJwt.verifyToken], conditions.delete);
    // router.delete("/:id", [authJwt.verifyToken], conditions.delete);

    // Delete all Conditions
    app.delete("/api/conditions/", [authJwt.verifyToken], conditions.deleteAll);
    // router.delete("/", [authJwt.verifyToken], conditions.deleteAll);

    // app.use('/api/conditions', router);
};