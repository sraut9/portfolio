const db = require("../models");

var help = require("../help/getshare.price");

const Sharekhan = db.sharekhan;

const url=[
  'https://money.rediff.com/companies/Sun-Pharmaceutical-Industries-Ltd/12540191',
  'https://money.rediff.com/companies/Wockhardt-Ltd/12540405',
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
  const sharekhan = new Sharekhan({
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    invested_nav_price: req.body.invested_nav_price,
    unit_no_of_shares: req.body.unit_no_of_shares,
  });

  // Save Portfolio in the database
  sharekhan
    .save(sharekhan)
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

  Sharekhan.find(condition)
    .then(async data => {
      // let i = 0;
      // data.forEach(async function (value) {
      //     console.log(value);
      //     last_nav = await help.getNAV(value, url[i++]);
      // });
    //   for (i=0; i < data.length; i++) {
    //     last_nav = await help.getNAV(data[i], url[i]);
    // }
      last_nav = await help.getPrice(data[0], url[0]);
      last_nav = await help.getPrice(data[1], url[1]);
      // last_nav = await help.getNAV(data[2], url[2]);
      // last_nav = await help.getNAV(data[3], url[3]);
      // last_nav = await help.getNAV(data[4], url[4]);
      // last_nav = await help.getNAV(data[5], url[5]);
      //console.log("sharekhan findAll 0: " + data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sharekhan."
      });
    });  
};

// Find a single Portfolio with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sharekhan.findById(id)
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

  Sharekhan.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Sharekhan.findByIdAndRemove(id)
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
  Sharekhan.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Portfolios were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sharekhan."
      });
    });  
};
