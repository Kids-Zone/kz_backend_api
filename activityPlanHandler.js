"use strict";
const serverlessHttp = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const viewPlan = express();
const createPlan = express();
const updatePlan = express();
const cancelPlan = express();
const connection = require('./db-connect');

viewPlan.use(bodyParser.json());

viewPlan.get("/viewPlan/:id", function (request, response) {
  // var activities = {
  //   activites: [
  //     { id: "1", name: "Dance" },
  //     { id: "2", name: "Drumming" },
  //     { id: "3", name: "Cooking" },
  //     { id: "4", name: "Writing" },
  //     { id: "5", name: "Crafts" },
  //   ],
  // };

  // response.status(200).send(activities);
  connection.query("select * from activity", function (err, data) {
    console.log(data);
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
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