"use strict";
const serverlessHttp = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const viewPlan = express();
const createPlan = express();
const updatePlan = express();
const cancelPlan = express();
const connection = require('./db-connect');
viewPlan.use(cors());
viewPlan.use(bodyParser.json());

viewPlan.get("/viewPlan/:id", function (request, response) {
  const auth0Id = request.params.id;
  const query = "SELECT * FROM activity WHERE auth0Id = ?";
  connection.query(query,[auth0Id], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

module.exports.viewPlan = serverlessHttp(viewPlan);

createPlan.use(cors());
createPlan.use(bodyParser.json());

createPlan.post("/createPlan", function (request, response) {
  const data = request.body;
  console.log(data);
  const query = "INSERT INTO activity(activity_name, activity_summary, activity_details,activity_schedule,max_occupancy,activity_type_id,auth0Id) VALUES (?,?,?,?,?,?,?)";
  connection.query(query,[data.activity_name, data.activity_summary, data.activity_details,data.activity_schedule,data.max_occupancy,data.activity_type_id,data.auth0Id], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send("Activity created successfully.");
    }
  });
});

module.exports.createPlan = serverlessHttp(createPlan);

updatePlan.use(cors());
updatePlan.use(bodyParser.json());

updatePlan.put("/updatePlan/:id", function (request, response) {
  const id = request.params.id;
  const data = request.body; 
  const query = "UPDATE activity SET ? WHERE activity_id = ?";
  connection.query(query, [data, id], (err) => {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send("Activity updated successfully.");
    }
  });
});

module.exports.updatePlan = serverlessHttp(updatePlan);

cancelPlan.use(cors());

cancelPlan.delete("/cancelPlan/:id", function (request, response) {
  const activityId = request.params.id;
  const query = "DELETE from activity where activity_id = ?";
  connection.query(query,[activityId], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send("Activity deleted successfully.");
    }
  });
});

module.exports.cancelPlan = serverlessHttp(cancelPlan);