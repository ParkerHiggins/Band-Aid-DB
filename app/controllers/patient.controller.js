const db = require("../models");
const patient_condition = require("./patient.controller");
const {Transaction} = require("sequelize");
const Patient = db.patient;
const Condition = db.condition;
const Provider = db.provider;
const Doctor = db.doctor;
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

    const conditionId = req.body.conditionId;
    const providerId = req.body.providerId;
    const doctorId = req.body.doctorId;

    // Create a new Patient
    const patient = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        race: req.body.race,
        condition_name: req.body.condition_name, 
        room_number: req.body.room_number,
        provider_name: req.body.provider_name,
        providerId: providerId,
        doctor_name: req.body.doctor_name,
        doctorId: doctorId
    };

    // Save Patient in the database
    Patient.create(patient)
        .then(data => {
            const patientId = data.id;
            patient_condition.addCondition(patientId, conditionId);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Patient."
            });
        });
};

exports.addCondition = async (patientId, conditionId) => {
    console.log("patientId:");
    console.log(patientId);
    return await Patient.findByPk(patientId)
        .then((patient) => {
            if (!patient) {
                console.log("Patient not found!");
                return null;
            }
            return Condition.findByPk(conditionId).then((condition) => {
                if (!condition) {
                    console.log("Condition not found!");
                    return null;
                }

                patient.addCondition(condition);
                console.log(`>> added Condition id=${condition.id} to Patient id=${patient.id}`);
                return patient;
            });
        })
        .catch((err) => {
            console.log(">> Error while adding Condition to Patient: ", err);
        });
};

// Retrieve all Patients from the database.
exports.findAll = (req, res) => {
    const transactionInstance = db.sequelize.transaction();
    transactionInstance.isolationLevel = Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    try {
        const name = req.query.name;
        var condition = name ? {name: {[Op.like]: `%${name}%`}} : null;

        Patient.findAll({
            where: condition,
            include: [
                {
                    model: Condition,
                    as: "conditions",
                    attributes: ["id", "condition_name", "symptoms", "treatment_name"],
                    through: {
                        attributes: [],
                    }
                },
                "doctors",
                "providers",
                // {
                //     model: Provider,
                //     as: "providers",
                //     attributes: ["id", "name", "coverage_offered", "phone_number"],
                //     through: {
                //         attributes: [],
                //     }
                // }
            ]
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving patients."
                });
            });

    }
    catch (error) {
        transactionInstance.rollback()
    }
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

    const conditionId = req.body.conditionId;

    Patient.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                patient_condition.addCondition(id, conditionId);
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
            console.log("error catch");
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
