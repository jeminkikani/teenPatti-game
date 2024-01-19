var config = require("./../config");
var databaseUrl;

if (config.database.mode === "local") {
  databaseUrl = "mongodb://127.0.0.1:27017/teen";
  console.log(databaseUrl);
} else {
  databaseUrl =
    config.database.username +
    config.database.password +
    config.database.host +
    config.database.port +
    config.database.dbname;
  console.log(databaseUrl);
}
console.log(config.database.mode);
var collections = ["users", "tables", "sessions"];
var db = require("mongojs")(databaseUrl, collections);
console.log(config.database.host);
console.log(">>>>>>", databaseUrl);
// mongoose.connect("mongodb://localhost:27017/teenpatti", {
//   useNewUrlParser: true,
//   //   useUnifiedTopology: true,
//   poolSize: 10, // Adjust the pool size as needed
// });

var DAL = { db: db };

module.exports = DAL;
