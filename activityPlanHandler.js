"use strict";
const serverlessHttp = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const viewPlan = express();
const createPlan = express();
const updatePlan = express();
const cancelPlan = express();


viewPlan.use(bodyParser.json());

viewPlan.get("/viewPlan/:id", function (request, response) {
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

module.exports.viewPlan = serverlessHttp(viewPlan);

createPlan.post("/createPlan", function (request, response) {
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

module.exports.createPlan = serverlessHttp(createPlan);

updatePlan.put("/updatePlan/:id", function (request, response) {
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

module.exports.updatePlan = serverlessHttp(updatePlan);

cancelPlan.delete("/cancelPlan/:id", function (request, response) {
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

module.exports.cancelPlan = serverlessHttp(cancelPlan);