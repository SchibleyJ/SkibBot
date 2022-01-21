const express = require('express');
const app = express();
const port = 8082;
const computerMove = require('./computerMove.js')

app.use(express.json());

app.get('/', (req, res) => {
	res.send('skibbot online');
});

app.post('/', (req, res) => {
    let computerResponse = computerMove(req.body);
    /*
    let legalMoves = getLegalMoves(req.body.board, req.body.whiteTurn, req.body.enPassantSquare, req.body.canCastle);
  while (true){
      let guess = Math.floor(Math.random() * 64);
      if (legalMoves[guess] && legalMoves[guess].length){
          let guess2 = Math.floor(Math.random() * legalMoves[guess].length);
          res.send(JSON.stringify([guess, legalMoves[guess][guess2]]))
          break;
      }
  }*/
  res.send(JSON.stringify(computerResponse));
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
