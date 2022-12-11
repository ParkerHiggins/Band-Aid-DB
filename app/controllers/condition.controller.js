const db = require("../models");
const condition_treatment = require("./condition.controller");
const Condition = db.condition;
const Treatment = db.treatment;
const Op = db.Sequelize.Op;

// Create and Save a new Condition
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.condition_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const treatmentId = req.body.treatmentId;

    // Create a Condition
    const condition = {
        condition_name: req.body.condition_name,
        symptoms: req.body.symptoms,
        treatment_name: req.body.treatment_name
    };

    // Save Condition in the database
    Condition.create(condition)
        .then(data => {
            const conditionId = data.id;
            condition_treatment.addTreatment(conditionId, treatmentId);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Condition."
            });
        });
};

exports.addTreatment = async (conditionId, treatmentId) => {
    console.log("conditionId:");
    console.log(conditionId);
    return await Condition.findByPk(conditionId)
        .then((condition) => {
            if (!condition) {
                console.log("Condition not found!");
                return null;
            }
            return Treatment.findByPk(treatmentId).then((treatment) => {
                if (!treatment) {
                    console.log("Treatment not found!");
                    return null;
                }

                condition.addTreatment(treatment);
                console.log(`>> added Treatment id=${treatment.id} to Condition id=${condition.id}`);
                return condition;
            });
        })
        .catch((err) => {
            console.log(">> Error while adding Treatment to Condition: ", err);
        });
};

// Retrieve all Conditions from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Condition.findAll({
        where: condition,
        include: [
            {
                model: Treatment,
                as: "treatments",
                attributes: ["id", "name", "duration", "cost"],
                through: {
                    attributes: [],
                }
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving conditions."
            });
        });
};

// Find a single Condition with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Condition.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Condition with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Condition with id=" + id
            });
        });
};

// Update a Condition by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Condition.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Condition was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Condition with id=${id}. Maybe Condition was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Condition with id=" + id
            });
        });
};

// Delete a Condition with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Condition.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Condition was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Condition with id=${id}. Maybe Condition was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Condition with id=" + id
            });
        });
};

// Delete all Conditions from the database.
exports.deleteAll = (req, res) => {
    Condition.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Conditions were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all conditions."
            });
        });
};
