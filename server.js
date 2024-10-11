var express = require('express');

const cors = require("cors");

var app = express();

app.use(cors());

var kstewart_a2_API = require("./controllerAPI/API-controller");

var bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:false}));

app.use("/api/fundraisers", kstewart_a2_API);

app.use("/api/donations", kstewart_a2_API);

app.listen(3060);

console.log("Server up and running on port 3060");

