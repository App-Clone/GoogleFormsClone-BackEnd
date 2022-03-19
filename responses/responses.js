//response handling
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const app = express({ json: "50mb" });

app.post("/", (req, res) => {
    //    const [quesnum, paraanswer, valueselected, type] = req.body;
    //    const response = {quesnum: quesnum, paraanswer: paraanswer, valueselected: valueselected, type: type};
    var obj = {};
    req.body.forEach((item, idx) => {
      obj[idx] = item;
    });
    console.log('response');
    console.log(obj);
    console.log(req.body);
    res.send({ status: "200" });
  });


  module.exports = router;