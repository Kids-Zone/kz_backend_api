"use strict";
const serverlessHttp = require("serverless-http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const schedule = express();
const connection = require('./db-connect');
schedule.use(cors());
schedule.use(bodyParser.json());


schedule.get("/schedule/:id", function (request, response) {
  const user_id = request.params.id;
  const query = 'SELECT s.schedule_id, s.activity_id, s.user_id,s.isActive,s.schedule_day,a.activity_name,t.activity_type_name \n' +
  'FROM activity_schedule s INNER JOIN activity a ON s.activity_id=a.activity_id \n' +
  'INNER JOIN activity_type t ON a.activity_type_id = t.activity_type_id \n' +
  'and s.user_id =?';

  connection.query(query,[user_id], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

schedule.post("/schedule", function (request, response) {
  const data = request.body;
  console.log(data);
  const query = 'INSERT INTO activity_schedule( user_id,activity_id,schedule_day,slots,slots_duration ,start_date,end_date ,isActive ,created_date ,updated_date) \n' +
    ' VALUES (?,?,?,?,?,?,?,?,?,?)';
  connection.query(query,[data.user_id,data.activity_id,data.schedule_day,data.slots,data.slots_duration,data.start_date,data.end_date,data.isActive,data.created_date,data.updated_date], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send("Activity scheduled successfully.");
    }
  });
});

schedule.put("/schedule/:id", function (request, response) {
  const id = request.params.id;
  const data = request.body; 
  const query = "UPDATE activity_schedule SET ? WHERE schedule_id = ?";
  connection.query(query, [data, id], (err) => {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send("Schedule updated successfully.");
    }
  });
});

schedule.delete("/schedule/:id", function (request, response) {
  const id = request.params.id;
  const data = request.body; 
  const query = "update activity_schedule SET ? where schedule_id = ?";
  connection.query(query,[data,id], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      console.log("isActive :" + data.isActive);
      if(data.isActive) 
      response.status(200).send("Scheduled successfully.");
      else
      response.status(200).send("Schedule cancelled successfully.");
    }
  });
});

module.exports.schedule = serverlessHttp(schedule);