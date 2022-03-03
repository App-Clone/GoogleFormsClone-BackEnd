import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

const forms = {};

app.get('/forms/:id', (req, res) => {
    const data = forms[req.body.id];
    res.send({ data });
});

app.post('/forms', (req, res) => {
    const id = "";
    const [data] = req.body;
    forms[id] = data;
    res.send(id);
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