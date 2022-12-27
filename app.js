const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
/*

app.get('/', (request, response) => {
    response.status(200)
    .json({message: 'Hello from the server side!', 
            app: "Test API"});
});

app.post('/', (req, res) => {
    res.send('You can post to this endpoint...');
});
*/

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
})

app.post('/app/v1/tours', (req, res) => {
    console.log(req.body);
    res.send('done');
})

const port = 3000;

app.listen(port, () => {
    console.log('App running on port ${port}....');
});