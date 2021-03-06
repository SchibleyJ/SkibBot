const getLegalMoves = require('./functions/getLegalMoves.js');
const makeMove = require('./functions/makeMove.js');
const evaluate = require('./evaluate.js');
const gameEndCheck = require('./functions/gameEndCheck.js')
const minimax = (position, depth, maximizingPlayer) => {
    if (depth == 0 || gameEndCheck(position.board, position.whiteTurn, position.enPassantSquare, position.canCastle).length) {
        return [evaluate(position.board, gameEndCheck(position.board, position.whiteTurn, position.enPassantSquare, position.canCastle), position.whiteTurn)];
    }
   
    if (maximizingPlayer) {
        let maxEval = -Infinity;
        let maxMove = null;
        let children = getLegalMoves(position.board, position.whiteTurn, position.enPassantSquare, position.canCastle);
        for (let i = 0; i < 64; i++) {
            if (children[i]) {
                for (let j = 0; j < children[i].length; j++) {
                    let eval = minimax(makeMove2({ 'moveFrom': i, 'moveTo': children[i][j] }, position.board, position.whiteTurn, position.enPassantSquare, position.canCastle), depth - 1, false)[0];
                    maxEval = Math.max(maxEval, eval)
                    if (maxEval == eval){
                        maxMove = [i, children[i][j]];
                    }
                }
            }
        }
        return [maxEval, maxMove]
    } else {
        let minEval = Infinity;
        let minMove = null;        
        let children = getLegalMoves(position.board, position.whiteTurn, position.enPassantSquare, position.canCastle);
        for (let i = 0; i < 64; i++) {
            if (children[i]) {
                for (let j = 0; j < children[i].length; j++) {
                    let eval = minimax(makeMove2({ 'moveFrom': i, 'moveTo': children[i][j] }, position.board, position.whiteTurn, position.enPassantSquare, position.canCastle), depth - 1, true)[0] 
                    minEval = Math.min(minEval, eval)
                    if (minEval == eval){
                        minMove = [i, children[i][j]];
                    }
                }
            }
        }
        return [minEval, minMove]

    }
}

const makeMove2 = (body, oldBoard, whiteTurn, enPassantSquare, oldCanCastle) => {
    let board = Array.from(oldBoard);
    let canCastle = Array.from(oldCanCastle);

    let moveResult = makeMove(body, board, whiteTurn, enPassantSquare, canCastle);

    if (moveResult.wasEnPassant) {
        board[moveResult.wasEnPassant] = 0;
    }

    if (moveResult.wasCastle) {
        board[moveResult.wasCastle[0]] = board[moveResult.wasCastle[1]]
        board[moveResult.wasCastle[1]] = 0;
    }

    whiteTurn = !whiteTurn;
    enPassantSquare = moveResult.enPassantSquare;

    board[body.moveTo] = board[body.moveFrom];
    board[body.moveFrom] = 0;

    if (board[body.moveTo] % 10 == 1){
        if (body.moveTo < 8 || body.moveTo > 55){
            board[body.moveTo] = board[body.moveTo] + 4;
        }
    }

    return {
        'board': board,
        'whiteTurn': whiteTurn,
        'enPassantSquare': enPassantSquare,
        'canCastle': canCastle
    }

}

module.exports = minimax;