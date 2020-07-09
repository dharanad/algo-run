const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Hello algo run');
});

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('Algo run about.');
});


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