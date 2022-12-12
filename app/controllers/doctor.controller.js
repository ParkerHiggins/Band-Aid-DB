const db = require("../models");
const sequelize = require("sequelize");
const {Transaction} = require("sequelize");
const Doctor = db.doctor;
const Op = db.Sequelize.Op;

// Changes for git demo

// Create and Save a new Doctor
exports.create = (req, res) => {
   // const transactionInstance = db.sequelize.transaction();
   // transactionInstance.isolationLevel = Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
        // Validate request
        if (!req.body.name) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        // Create a Doctor
        const doctor = {
            name: req.body.name,
            age: req.body.age,
            specialty: req.body.specialty
        };
        // Save Tutorial in the database
        Doctor.create(doctor)
            .then(data => {
                res.send(data);
                // transactionInstance.commit()
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Doctor."
                });
            });

};

// Retrieve all Doctors from the database.
exports.findAll = (req, res) => {
    const transactionInstance = db.sequelize.transaction();
    transactionInstance.isolationLevel = Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    try {
        const name = req.query.name;
        var condition = name ? {name: {[Op.like]: `%${name}%`}} : null;

        Doctor.findAll({where: condition})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving doctors."
                });
            });
    }
    catch (error) {
        transactionInstance.rollback()
    }
};

// Find a single Doctor with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Doctor.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Doctor with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Doctor with id=" + id
            });
        });
};

// Update a Doctor by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Doctor.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Doctor was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Doctor with id=${id}. Maybe Doctor was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Doctor with id=" + id
            });
        });
};

// Delete a Doctor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Doctor.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Doctor was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Doctor with id=${id}. Maybe Doctor was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Doctor with id=" + id
            });
        });
};

// Delete all Doctors from the database.
exports.deleteAll = (req, res) => {
    Doctor.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Doctors were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all doctors."
            });
        });
};
