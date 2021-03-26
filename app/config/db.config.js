const config = require('./config');
var AWS = require("aws-sdk");

module.exports = config.db;
// this is being used...
const URL = process.env.DB_URL || "mongodb://localhost:27017/bezkoder_db";
console.log("URL: " + URL);

module.exports = {
  url: URL 
};
