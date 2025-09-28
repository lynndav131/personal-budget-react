// Budget API
const express = require('express');
const app = express();
const port = 5000;

// app.use('/', express.static('public'));

const budget = {
    myBudget: [
        {
            title: 'Car Note',
            budget: 320
        },
        {
            title: 'Rent',
            budget: 1750
        },
        {
            title: 'Phone',
            budget: 150
        },
        {
            title: 'Doggy Daycare',
            budget: 450
        }
    ]
};

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});
