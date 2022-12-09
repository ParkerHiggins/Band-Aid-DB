const { sequelize } = require("../models");
const db = require("../models");
const User = db.user;

const doctorController = require("../controllers/doctor.controller");
const {authJwt} = require("../middleware");
// app.get(
//     "/api/test/user",
//     [authJwt.verifyToken],
//     controller.userBoard
// );

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};