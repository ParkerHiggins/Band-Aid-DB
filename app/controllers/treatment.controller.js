const db = require("../models");
const Treatment = db.treatment;
const Op = db.Sequelize.Op;

// Create and Save a new Treatment
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Treatment
    const treatment = {
        name: req.body.name,
        duration: req.body.duration,
        cost: req.body.cost
    };

    // Save Treatment in the database
    Treatment.create(treatment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Treatment."
            });
        });
};

// Retrieve all Treatments from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Treatment.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving treatments."
            });
        });
};

// Find a single Treatment with an id
exports.findOne = (req, res) => {
    console.log("treatment - findOne:");
    console.log(req.params.id);

    const id = req.params.id;

    Treatment.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Treatment with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Treatment with id=" + id
            });
        });
};

// Update a Treatment by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Treatment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Treatment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Treatment with id=${id}. Maybe Treatment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Treatment with id=" + id
            });
        });
};

// Delete a Treatment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Treatment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Treatment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Treatment with id=${id}. Maybe Treatment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Treatment with id=" + id
            });
        });
};

// Delete all Treatments from the database.
exports.deleteAll = (req, res) => {
    Treatment.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Treatments were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all treatments."
            });
        });
};
