const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:3306/robocore');

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

  const MyUser = sequelize.define('myuser', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  });
  
  // Note: you need to have create and read separately as sync means it is async...

  // force: true will drop the table if it already exists
  // MyUser.sync({force: true}).then(() => {
  //   // Table created
  //   return MyUser.create({
  //     firstName: 'John',
  //     lastName: 'Hancock'
  //   });
  // });

  // MyUser.findAll().then(users => {
  //   console.log(users)
  // })

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/portfolio.routes")(app);
require("./app/routes/sidvin.routes")(app);
require("./app/routes/share.routes")(app);
require("./app/routes/sharekhan.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
