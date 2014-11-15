
var fs = require("fs");
var jsonServer = require("json-server");

var jsonDBPath = path.join(__dirname, "db.json");
var jsonDB = fs.readFileSync(jsonDBPath, "UTF-8");

var liveJsonDB = JSON.parse(jsonDB);

jsonServer(liveJsonDB).listen(3000);