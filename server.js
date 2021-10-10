const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require('path');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://endlessashley:Mgw2patt!@cluster0.uqttk.mongodb.net/dbWorkout?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


})