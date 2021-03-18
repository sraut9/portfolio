const db = require("../models");

var help = require("../help/getmf.nav");

const Sidvin = db.sidvin;

const url=[
  'https://www.valueresearchonline.com/funds/114/franklin-india-bluechip-fund/?ref_plan_id=114',
  'https://www.valueresearchonline.com/funds/219/hdfc-equity-fund/?ref_plan_id=219',
  'https://www.valueresearchonline.com/funds/104/hdfc-top-100-fund/?ref_plan_id=104',
  'https://www.valueresearchonline.com/funds/2886/idfc-multi-cap-fund-regular-plan/?ref_plan_id=2886',
  'https://www.valueresearchonline.com/funds/2138/uti-mid-cap-fund-regular-plan/?ref_plan_id=2138',
  'https://www.valueresearchonline.com/funds/2820/uti-value-opportunities-fund-regular-plan/?ref_plan_id=2820'
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
  const sidvin = new Sidvin({
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    invested_nav_price: req.body.invested_nav_price,
    unit_no_of_shares: req.body.unit_no_of_shares,
  });

  // Save Portfolio in the database
  sidvin
    .save(sidvin)
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
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Sidvin.find(condition)
    .then(async data => {
      // let i = 0;
      // data.forEach(async function (value) {
      //     console.log(value);
      //     last_nav = await help.getNAV(value, url[i++]);
      // });
    //   for (i=0; i < data.length; i++) {
    //     last_nav = await help.getNAV(data[i], url[i]);
    // }
      last_nav = await help.getNAV(data[0], url[0]);
      last_nav = await help.getNAV(data[1], url[1]);
      last_nav = await help.getNAV(data[2], url[2]);
      last_nav = await help.getNAV(data[3], url[3]);
      last_nav = await help.getNAV(data[4], url[4]);
      last_nav = await help.getNAV(data[5], url[5]);
      //console.log("sidvin findAll 0: " + data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sidvin."
      });
    });  
};

// Find a single Portfolio with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sidvin.findById(id)
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

  Sidvin.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Sidvin.findByIdAndRemove(id)
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
  Sidvin.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Portfolios were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sidvin."
      });
    });  
};
