const {authJwt} = require("../middleware");
const providers = require("../controllers/provider.controller.js");

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

    // Create a new Provider
    app.post("/api/providers/", [authJwt.verifyToken], providers.create);
    // router.post("/", [authJwt.verifyToken], providers.create);

    // Retrieve all Providers
    app.get("/api/providers/", [authJwt.verifyToken], providers.findAll);
    // router.get("/", [authJwt.verifyToken], providers.findAll);

    // Retrieve a single Provider with id
    app.get("/api/providers/:id", [authJwt.verifyToken], providers.findOne);
    // router.get("/:id", [authJwt.verifyToken], providers.findOne);

    // Update a Provider with id
    app.put("/api/providers/:id", [authJwt.verifyToken], providers.update);
    // router.put("/:id", [authJwt.verifyToken], providers.update);

    // Delete a Provider with id
    app.delete("/api/providers/:id", [authJwt.verifyToken], providers.delete);
    // router.delete("/:id", [authJwt.verifyToken], providers.delete);

    // Delete all Providers
    app.delete("/api/providers/", [authJwt.verifyToken], providers.deleteAll);
    // router.delete("/", [authJwt.verifyToken], providers.deleteAll);

    // app.use('/api/providers', router);
};