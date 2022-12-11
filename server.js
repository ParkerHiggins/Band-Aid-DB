const express = require("express");
// todo: const bodyParser?
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

// TODO: Un-comment out when development finished
// db.sequelize.sync();

// For development purposes. Remove when finished due to data drop risk
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });


db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function() {
    db.sequelize
        .sync({
            force: true
        }).then(function() {
        db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1').then(function() {
            console.log('Database synchronised.');
            console.log('Drop and Resync Db');
            initial();
        });
    });;
});

// simple route
app.get("/", (req,res) => {
    res.json({ message: "Welcome to Band-Aid DB!" });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/doctor.routes')(app);
require('./app/routes/patient.routes')(app);
require('./app/routes/treatment.routes')(app);
require('./app/routes/condition.routes')(app);
require('./app/routes/provider.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "moderator"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
}