const evaluate = require('./chess/evaluate.js');
const getLegalMoves = require('./chess/functions/getLegalMoves.js')

const minimax = require('./chess/minimax.js');
const minimaxabp = require('./chess/minimaxabp.js');

const gameEndCheck = require('./chess/functions/gameEndCheck.js')

const computerMove = (body) => {
    let legalMoves = getLegalMoves(body.board, body.whiteTurn, body.enPassantSquare, body.canCastle);
    console.log(evaluate(body.board, gameEndCheck(body.board, body.whiteTurn, body.enPassantSquare, body.canCastle), body.whiteTurn));
    //let result = minimax(body, 2, body.whiteTurn);
    //let resultabpd2 = minimaxabp(body, 2, -Infinity, Infinity, body.whiteTurn);
    let resultabp = minimaxabp(body, 2, -Infinity, Infinity, body.whiteTurn);
    //abp is broken, pls fix
    //console.log(resultabpd2);
    console.log(resultabp);
    
    return [resultabp[1][0], resultabp[1][1]]

    //random move:
}

module.exports = computerMove;
