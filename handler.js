"use strict";
const serverlessHttp = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/activities", function (request, response) {
  var activities = {
    activites: [
      { id: "1", name: "Dance" },
      { id: "2", name: "Drumming" },
      { id: "3", name: "Cooking" },
      { id: "4", name: "Writing" },
      { id: "5", name: "Crafts" },
    ],
  };

  response.status(200).send(activities);
});

module.exports.app = serverlessHttp(app);
