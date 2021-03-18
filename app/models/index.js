const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.portfolio = require("./portfolio.model.js")(mongoose);
db.sidvin = require("./sidvin.model.js")(mongoose);
db.share = require("./share.model.js")(mongoose);
db.sharekhan = require("./sharekhan.model.js")(mongoose);

module.exports = db;
