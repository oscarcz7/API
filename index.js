const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//initialize app
const app = express();

//import routes file
const routes = require("./routes/api-routes");

// Configure bodyparser to handle post requests
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
app.use(bodyParser.json());

//Connect to Mongoose and set connection variable
// mongoose.connect("mongodb://localhost/servicedb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect("mongodb+srv://user_udla:udla2021@petshop.sdd7l.mongodb.net/servicedb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
//testing connection for mongo db

if(!db){
    console.log('Error connenctig MongoDB');
}else{
    console.log('Mongo Db connection successfuly');
};

//Defining port to be used by the app
const port = process.env.PORT || 5000;

//default message to the url
app.get("/", (req, res) => {
    res.send("API Rest with Express - NodeJs - MongoDB Atlas");
});

//Use the routes for the app
app.use("/api", routes);

//Lunching app to the port
app.listen(port, () => {
  console.log("htttp://localhost:" + port);
});
