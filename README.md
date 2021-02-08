# Getting Started with KidsZone
This project is RESTful api for KidsZone application, built as part of the tech for good project taught by TechReturners.This project is built using Serverless template for node js deploying to AWS.You can refer the way endpoints are created using node.js.

## Accessing AWS
Look at serverless.yml for configuring your provider details.The serverless db credentials are taken from .aws credentials file. 

## Accessing Database
To configure DB you can create a file in local like db.js and add cresentials
in formet below:
module export=
(property) export=: {
    DB_HOST: 'hostname';
    DB_USER: 'user';
    DB_PASSWORD: 'password';
}

### `serverless deploy` 
This command is used to deploy the code on aws and exposes end points like below:
endpoints:
  GET - https://k2q4xg1r4e.execute-api.eu-west-2.amazonaws.com/dev/allActivity
  GET - https://k2q4xg1r4e.execute-api.eu-west-2.amazonaws.com/dev/Activity/{id}
  GET - https://k2q4xg1r4e.execute-api.eu-west-2.amazonaws.com/dev/ActivityByName/{name}
  GET - https://k2q4xg1r4e.execute-api.eu-west-2.amazonaws.com/dev/participants/{id}
  GET - https://k2q4xg1r4e.execute-api.eu-west-2.amazonaws.com/dev/viewPlan/{id}
  POST - https://k2q4xg1r4e.execute-api.eu-west-2.amazonaws.com/dev/createPlan
  PUT - https://k2q4xg1r4e.execute-api.eu-west-2.amazonaws.com/dev/updatePlan/{id}
  DELETE - https://k2q4xg1r4e.execute-api.eu-west-2.amazonaws.com/dev/cancelPlan/{id}
  GET - https://k2q4xg1r4e.execute-api.eu-west-2.amazonaws.com/dev/Booking/{id}


### Test using Postman
You can test the endpoints using postman.All reponses are Json response.