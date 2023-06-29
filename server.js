const express = require("express");
const mongoose = require("mongoose");
const Router = require('./routes');
const cors = require('cors')
const bodyParser = require('body-parser');
const newrouter = require('./routes/newuser_route');





const app = express();
app.use(cors())

app.use(express.json());
//mongodb+srv://cluster0.6wm1ske.mongodb.net/myFirstDatabase

 mongoose.connect('mongodb://127.0.0.1:27017/usersdb',

// mongoose.connect("mongodb+srv://mdhingra:YziqC0LaY13hW0NF@cluster0.6wm1ske.mongodb.net/usersdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);
app.use(newrouter);

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

app.listen(8081, () => {
    console.log("Server is running at port 8081");
  });