const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const webserver = express();

webserver.use(cors());

webserver.use(bodyParser.urlencoded({extended:true}));

webserver.use(express.static(__dirname));

webserver.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,"fundraiser.html"));
});

webserver.get("/search", (req, res)=>{
    res.sendFile(path.join(__dirname,"search.html"));
});

webserver.get("/fundraiser_info", (req, res)=>{
    res.sendFile(path.join(__dirname,"fundraiser_info.html"));
});

webserver.get("/donation", (req, res)=>{
    res.sendFile(path.join(__dirname,"donation.html"));
});

webserver.listen("3030", function(){
    console.log("webserver running")
});