const config = require('./config');
var AWS = require("aws-sdk");

module.exports = config.db;
// this is being used...
module.exports = {
  // local
  // url: "mongodb://localhost:27017/bezkoder_db"
  // remote
  url: process.env.DB_URL 
};
