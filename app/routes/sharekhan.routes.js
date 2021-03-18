module.exports = app => {
  const sidvin = require("../controllers/sharekhan.controller.js");

  var router = require("express").Router();

  // Create a new Portfolio
  router.post("/", sidvin.create);

  // Retrieve all Portfolios
  router.get("/", sidvin.findAll);

  // Retrieve a single Portfolio with id
  router.get("/:id", sidvin.findOne);

  // Update a Portfolio with id
  router.put("/:id", sidvin.update);

  // Delete a Portfolio with id
  router.delete("/:id", sidvin.delete);

  // Create a new Portfolio
  router.delete("/", sidvin.deleteAll);

  app.use('/api/sharekhan', router);
};
