const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./api/api');

const port = process.env.PORT || 3000;

app.use(cors()); // Same origin policy Enabled
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())
app.disable('x-powered-by');

// Serving React App
app.use(express.static(path.join(__dirname, 'client','build')));

// Route to /api
app.use('/api', api);

/* Middleware */
app.use((req, res) => {
    res.type('text/plain');
    res
    .status(400)
    .send('400 - Not Found');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.type('text/plain');
    res
    .status(500)
    .send('500 - Internal Error');
});

app.listen(port, () => {
    console.log(`Listening on PORT : ${port}`);
});