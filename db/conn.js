const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    console.log("URL MongoDB.  " + Db ); 
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("ident");
        console.log("Successfully connected to MongoDB.  " + Db +" " + Object.keys(db)); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};