const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const api = require('./api/api');

app.use(morgan('tiny'))
app.use(helmet());
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
    console.log(`Server running on PORT : ${port}`);
});
