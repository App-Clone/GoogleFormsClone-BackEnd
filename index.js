require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const json2xls = require("json2xls");
const { OAuth2Client } = require("google-auth-library");

const Form = require("./models/forms.model");

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
users = [];

const app = express({ json: "50mb" });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

function upsert(arr, item) {
  const index = arr.findIndex((i) => i.email === item.email);
  if (index === -1) {
    arr.push(item);
  } else {
    arr[index] = item;
  }
}

app.post("/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email } = ticket.getPayload();
  upsert(users, { email });
  console.log({ email });
  res.status(200).send({ email });
});

app.get("/forms/:id", (req, res) => {
  const id = req.params.id;
  Form.findById(id, (err, form) => {
    if (err) {
      res.status(500).send(err);
    } else if (!form) {
      res.status(404).send("Form not found");
    } else {
      res.send(form);
    }
  });
});

app.post("/forms", (req, res) => {
  const form = req.body;
  console.log(form);
  const id = uuidv4();
  Form.create({ _id: id, ...form }, (err, _) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ id: id });
    }
  });
});

app.post("/responses", (req, res) => {
  //    const [quesnum, paraanswer, valueselected, type] = req.body;
  //    const response = {quesnum: quesnum, paraanswer: paraanswer, valueselected: valueselected, type: type};
  var obj = {};
  req.body.forEach((item, idx) => {
    obj[idx] = item;
  });
  console.log(obj);
  console.log(req.body);
  res.send({ status: "200" });
});

app.listen(4000, () => {
  console.log("Listening on port 4000!");
});