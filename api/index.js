const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
app.use(cors()); // Same origin policy
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())
app.disable('x-powered-by');

// // Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Hello algo run');
});

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('Algo run about.');
});

app.post('/run', (req, res) => {
    const code = req.body.code;
    if(code){
        res.status(200).send('Code Recived');
    }else{
        res.status(400).send('Read the api docs.')
    }
})


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