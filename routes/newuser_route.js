const express = require("express");
const newuserModel = require("../models/newUser");
const res = require("express/lib/response");
const bodyParser = require("body-parser");
const userController = require("../controllers/newuser");
const cors = require("cors");
const app2 = express();

app2.use(cors());

app2.use(
  bodyParser.urlencoded({
    limit: "5000mb",
    extended: true,
    parameterLimit: 100000000000,
  })
);

app2.post("/addNewUser", userController.postFunc);

app2.get("/newusers", userController.getFunc);

app2.get("/newusersID/:id", userController.getIdFunc);

app2.put("/updateUser/:id", userController.putFunc);

app2.delete("/deleteUser/:id", userController.deleteFunc);

app2.post("/signIn", userController.addFunc);

app2.post("/emailSend", userController.emailFunc);

//app2.post("/paswordChange", userController.passwordFunc);

module.exports = app2;
