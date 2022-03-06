require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// const cryptoRandomString = require('crypto-random-string');
const Form = require('./models/forms.model');
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';


// npm install crypto-random-string
mongoose.connect(process.env.MONGODB).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});

const app = express({json: '50mb'});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/forms/:id', (req, res) =>{
    const id = req.params.id;
    Form.findById(id, (err, form) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(form);
        }
    });
    // const data = forms[req.body.id];
    // res.send({ data });
});

app.post('/forms', (req, res) => {
    const form = req.body;
    console.log(form);
    const id = uuidv4();
    Form.create({_id: id, ...form}, (err, form) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({id : id});
        }
    });
});

app.listen(4000, () => {
    console.log('Listening on port 4000!');
});


/*
forms = {
    {
        _id: '',
        title: '',
        type: '',
        data: '',
        options: []
    }
}
*/