const db = require("../models");

var help = require("../help/getshare.price");

const Share = db.share;

const url=[
  'https://money.rediff.com/companies/Page-Industries-Ltd/16070088',
  'https://money.rediff.com/companies/Hdfc-Bank-Ltd/14030055',
  'https://money.rediff.com/companies/Yes-Bank-Ltd/14030144',
  'https://money.rediff.com/companies/Maruti-Suzuki-India-Ltd/10520005',
  'https://money.rediff.com/companies/Marico-Ltd/11120039',
  'https://money.rediff.com/companies/Sun-Pharmaceutical-Industries-Ltd/12540191',
  'https://money.rediff.com/companies/Hatsun-Agro-Products-Ltd/11050105',
  'https://money.rediff.com/companies/Can-Fin-Homes-Ltd/14080002',
  // 'https://money.rediff.com/companies/Graphite-India-Ltd/13580002',
  // 'https://money.rediff.com/companies/Meghmani-Organics-Ltd/12120059',
  // 'https://money.rediff.com/companies/Mold-Tek-Packaging-Ltd/12200107',
  // 'https://money.rediff.com/companies/Tata-Motors-Ltd/10510008',
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
  const share = new Share({
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    invested_nav_price: req.body.invested_nav_price,
    unit_no_of_shares: req.body.unit_no_of_shares,
  });

  // Save Portfolio in the database
  share
    .save(share)
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

  Share.find(condition)
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
      last_nav = await help.getPrice(data[2], url[2]);
      last_nav = await help.getPrice(data[3], url[3]);
      last_nav = await help.getPrice(data[4], url[4]);
      last_nav = await help.getPrice(data[5], url[5]);
      last_nav = await help.getPrice(data[6], url[6]);
      last_nav = await help.getPrice(data[7], url[7]);
      // last_nav = await help.getPrice(data[8], url[8]);
      // last_nav = await help.getPrice(data[9], url[9]);
      // last_nav = await help.getPrice(data[10], url[10]);
      // last_nav = await help.getPrice(data[11], url[11]);
      //console.log("share findAll 0: " + data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving share."
      });
    });  
};

// Find a single Portfolio with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Share.findById(id)
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

  Share.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Share.findByIdAndRemove(id)
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
  Share.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Portfolios were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all share."
      });
    });  
};
