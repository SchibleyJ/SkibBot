const express = require('express');
const app = express();
const port = 8081;

const minimax = require('./minimax.js');

app.use(express.json());

app.post('/', (req, res) => {
    
    console.log(minimax(req.body, 1, false));
    
    res.send('recieved');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})