
var fs = require("fs");
var jsonServer = require("json-server");

var jsonDBPath = "db.json";

var jsonDB = fs.readFileSync(jsonDBPath, "UTF-8");