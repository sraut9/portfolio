module.exports = app => {
  const share = require("../controllers/share.controller.js");

  var router = require("express").Router();

  // Create a new Portfolio
  router.post("/", share.create);

  // Retrieve all Portfolios
  router.get("/", share.findAll);

  // Retrieve a single Portfolio with id
  router.get("/:id", share.findOne);

  // Update a Portfolio with id
  router.put("/:id", share.update);

  // Delete a Portfolio with id
  router.delete("/:id", share.delete);

  // Create a new Portfolio
  router.delete("/", share.deleteAll);

  app.use('/api/share', router);
};
