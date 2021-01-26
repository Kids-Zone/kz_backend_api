"use strict";
const serverlessHttp = require("serverless-http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const booking = express();
const connection = require('./db-connect');
booking.use(cors());
booking.use(bodyParser.json());


booking.get("/booking/:id", function (request, response) {
  const user_id = request.params.id;
  const query = 'SELECT b.booking_id, b.activity_id, b.user_id,a.activity_name,a.activity_schedule,t.activity_type_name \n' +
  'FROM activity_booking b INNER JOIN activity a ON b.activity_id=a.activity_id \n' +
  'INNER JOIN activity_type t ON a.activity_type_id = t.activity_type_id \n' +
  'and b.user_id =?';

  connection.query(query,[user_id], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

booking.post("/Booking", function (request, response) {
  const data = request.body;
  console.log(data);
  const query = "INSERT INTO activity_booking(booking_id, user_id, activity_id, created_date,updated_date) VALUES (?,?,?,?,?)";
  connection.query(query,[data.booking_id, data.user_id, data.activity_id, data.created_date,data.updated_date], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send("Booking created successfully.");
    }
  });
});

// booking.put("/Booking/:id", function (request, response) {
//   const id = request.params.id;
//   const data = request.body; 
//   const query = "UPDATE activity SET ? WHERE activity_id = ?";
//   connection.query(query, [data, id], (err) => {
//     if (err) {
//       console.log("Error from MySQL", err);
//       response.status(500).send(err);
//     } else {
//       response.status(200).send("Booking updated successfully.");
//     }
//   });
// });

booking.delete("/Booking/:id", function (request, response) {
  const bookingId = request.params.id;
  const query = "DELETE from activity_booking where booking_id = ?";
  connection.query(query,[bookingId], function (err, data) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send("Booking cancelled successfully.");
    }
  });
});

module.exports.booking = serverlessHttp(booking);