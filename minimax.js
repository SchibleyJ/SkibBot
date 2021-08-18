const evaluate = require('./evaluate.js');
const getMoves = require('./getMoves.js');
const makeMove = require('./game/makeMove.js')

const minimax = (game, depth, isWhite) => {
    if (depth == 0) {
        return [game.board, evaluate(game.board)];
    }

    if (isWhite){
        let maxEval = -Infinity;
        let moves = getMoves(game.board, game.whiteTurn, game.enPassant, game.castling);
        for (let i = 0; i < moves.length; i++){
            let newGame = JSON.parse(JSON.stringify(game));
            makeMove({body: {move: moves[i].substring(0,2), piece: moves[i].substring(2)}}, newGame.board, newGame.whiteTurn, newGame.enPassant, newGame.castling);
            newGame.whiteTurn = !newGame.whiteTurn;
            let eval = minimax(newGame, depth - 1, false);
            maxEval = Math.max(maxEval, eval);
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        let moves = getMoves(game.board, game.whiteTurn, game.enPassant, game.castling);
        for (let i = 0; i < moves.length; i++){
            let newGame = JSON.parse(JSON.stringify(game));
            makeMove({body: {move: moves[i].substring(0,2), piece: moves[i].substring(2)}}, newGame.board, newGame.whiteTurn, newGame.enPassant, newGame.castling);
            newGame.whiteTurn = !newGame.whiteTurn;
            let eval = minimax(newGame, depth - 1, true);
            maxEval = Math.min(minEval, eval);
        }
        return minEval;
    }
}

module.exports = minimax;