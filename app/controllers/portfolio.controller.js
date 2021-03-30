const db = require("../models");

var help = require("../help/getmf.nav");

const Portfolio = db.portfolio;

const url=[
  'https://www.valueresearchonline.com/funds/16324/sbi-focused-equity-fund-direct-plan/?ref_plan_id=16324',
  'https://www.valueresearchonline.com/funds/15787/sbi-small-cap-fund-direct-plan/?ref_plan_id=15787',
  'https://www.valueresearchonline.com/funds/15684/axis-focused-25-fund-direct-plan/?'
];

// Create and Save a new Portfolio
exports.create = (req, res) => {
  // Validate request
  //console.log(req.body);
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Portfolio
  const portfolio = new Portfolio({
    name: req.body.name,
    description: req.body.description,
    day: new Date(),
    type: req.body.type,
    invested_nav_price: req.body.invested_nav_price,
    unit_no_of_shares: req.body.unit_no_of_shares,
    last_nav_price: req.body.last_nav_price
  });

  // Save Portfolio in the database
  portfolio
    .save(portfolio)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Portfolio."
      });
    });
};

// Retrieve all Portfolios from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  //console.log("name: "+name);

  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Portfolio.find(condition)
    .then(async data => {
      last_nav = await help.getNAV(data[0], url[0]);
      last_nav = await help.getNAV(data[1], url[1]);
      last_nav = await help.getNAV(data[2], url[2]);
      // console.log("last_nav: " + last_nav);
      console.log("portfolio findAll 0: " + data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving portfolios."
      });
    });  
};

// Find a single Portfolio with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Portfolio.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Portfolio with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Portfolio with id=" + id });
    });  
};

// Update a Portfolio by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Portfolio.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Portfolio with id=${id}. Maybe Portfolio was not found!`
        });
      } else res.send({ message: "Portfolio was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Portfolio with id=" + id
      });
    }); 
};

// Delete a Portfolio with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Portfolio.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Portfolio with id=${id}. Maybe Portfolio was not found!`
        });
      } else {
        res.send({
          message: "Portfolio was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Portfolio with id=" + id
      });
    });  
};

// Delete all Portfolios from the database.
exports.deleteAll = (req, res) => {
  Portfolio.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Portfolios were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all portfolios."
      });
    });  
};
