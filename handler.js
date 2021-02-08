"use strict";
const serverlessHttp = require("serverless-http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const actions = express();
const connection = require('./db-connect');
actions.use(cors());
actions.use(bodyParser.json());


actions.get("/allActivity", function (request, response) {

  const query = 'SELECT a.activity_id, a.activity_name, a.activity_summary, a.activity_details, a.activity_schedule, a.max_occupancy, at.activity_type_name AS category FROM activity a  JOIN activity_type at ON a.activity_type_id = at.activity_type_id';

  connection.query(query, function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

actions.get("/Activity/:id", function (request, response) {
  const activity_id = request.params.id;
  const query = 'SELECT * FROM activity where activity_id =?';

  connection.query(query,[activity_id], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

actions.get("/ActivityByName/:name", function (request, response) {
  const activity_name = request.params.name;
  const query = 'SELECT * FROM activity where activity_name = ?';

  connection.query(query,[activity_name], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

actions.get("/participants/:id", function (request, response) {
  const schedule_id = request.params.id;
  const query = 'select u.forename,u.surname from user u \n' +
  'INNER JOIN activity_booking b \n'+
  'on u.auth0Id=b.user_id \n'+
  'and u.role_id =1 \n'+
  'INNER JOIN activity_schedule s \n'+
  'on b.activity_id =s.activity_id \n'+
  'and s.schedule_id =?';

  connection.query(query,[schedule_id], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});


module.exports.actions = serverlessHttp(actions);