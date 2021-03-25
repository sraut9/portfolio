const config = require('./config');

module.exports = config.db;
// this is being used...
module.exports = {
  // local
  //url: "mongodb://localhost:27017/bezkoder_db"
  // remote
  url: "mongodb+srv://mongo_prod:pkpb1Vma3HeNYWD6@cluster0.0yygi.mongodb.net/portfolio?retryWrites=true&w=majority"
};
