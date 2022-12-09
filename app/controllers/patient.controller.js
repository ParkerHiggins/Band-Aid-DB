const db = require("../models");
const Patient = db.patient;
const Op = db.Sequelize.Op;

// Create and Save a new Patient
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a new Patient
    const patient = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        race: req.body.race,
        condition_name: req.body.condition_name, 
        room_number: req.body.room_number
    };

    // Save Tutorial in the database
    Patient.create(patient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Patient."
            });
        });
};

// Retrieve all Patients from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Patient.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving patients."
            });
        });
};

// Find a single Patient with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Patient.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Patient with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Patient with id=" + id
            });
        });
};

// Update a Patient by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Patient.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Patient was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Patient with id=" + id
            });
        });
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Patient.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Patient was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Patient with id=" + id
            });
        });
};

// Delete all Patients from the database.
exports.deleteAll = (req, res) => {
    Patient.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Patients were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all patients."
            });
        });
};
