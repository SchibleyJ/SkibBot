const evaluate = (board, gameResult, whiteTurn) => {

    if (gameResult === "CHECKMATE"){
        return ((whiteTurn ? -1 : 1) * Infinity);
    }
    if (gameResult === "STALEMATE"){
        return 0;
    } 
    let eval = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i]) {
            eval += (Math.floor(board[i] / 10) ? 1 : -1) * (getValue(board[i] % 10) + positionBonus[(Math.floor(board[i] / 10) ? "white" : "black") + getPieceType(board[i])][i]);
        }
    }
    return eval;
}

const getPieceType = (piece) => {
    switch (piece % 10) {
        case 1:
            return "pawn";
            break;
        case 2:
            return "knight";
            break;
        case 3:
            return "bishop";
            break;
        case 4:
            return "rook";
            break;
        case 5:
            return "queen";
            break;
        case 6:
            return "king";
            break;

    }
}

const getValue = (piece) => {
    switch (piece) {
        case 1: return 100;
        case 2: return 320;
        case 3: return 330;
        case 4: return 500;
        case 5: return 900;
        case 6: return 999999;
    }
}



const reverse = (array) => {
    return array.slice().reverse();
}

const positionBonus = {
    whitepawn: [
        0, 0, 0, 0, 0, 0, 0, 0,
        50, 50, 50, 50, 50, 50, 50, 50,
        10, 10, 20, 30, 30, 20, 10, 10,
        5, 5, 10, 25, 25, 10, 5, 5,
        0, 0, 0, 20, 20, 0, 0, 0,
        5, -5, -10, 0, 0, -10, -5, 5,
        5, 10, 10, -20, -20, 10, 10, 5,
        0, 0, 0, 0, 0, 0, 0, 0,
    ],


    whiteknight: [
        -50, -40, -30, -30, -30, -30, -40, -50,
        -40, -20, 0, 0, 0, 0, -20, -40,
        -30, 0, 10, 15, 15, 10, 0, -30,
        -30, 5, 15, 20, 20, 15, 5, -30,
        -30, 0, 15, 20, 20, 15, 0, -30,
        -30, 5, 10, 15, 15, 10, 5, -30,
        -40, -20, 0, 5, 5, 0, -20, -40,
        -50, -40, -30, -30, -30, -30, -40, -50
    ],

    whitebishop: [
        -20, -10, -10, -10, -10, -10, -10, -20,
        -10, 0, 0, 0, 0, 0, 0, -10,
        -10, 0, 5, 10, 10, 5, 0, -10,
        -10, 5, 5, 10, 10, 5, 5, -10,
        -10, 0, 10, 10, 10, 10, 0, -10,
        -10, 10, 10, 10, 10, 10, 10, -10,
        -10, 5, 0, 0, 0, 0, 5, -10,
        -20, -10, -10, -10, -10, -10, -10, -20
    ],

    whiterook: [
        0, 0, 0, 0, 0, 0, 0, 0,
        5, 10, 10, 10, 10, 10, 10, 5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        0, 0, 0, 5, 5, 0, 0, 0
    ],

    whitequeen: [
        -20, -10, -10, -5, -5, -10, -10, -20,
        -10, 0, 0, 0, 0, 0, 0, -10,
        -10, 0, 5, 5, 5, 5, 0, -10,
        -5, 0, 5, 5, 5, 5, 0, -5,
        0, 0, 5, 5, 5, 5, 0, -5,
        -10, 5, 5, 5, 5, 5, 0, -10,
        -10, 0, 5, 0, 0, 0, 0, -10,
        -20, -10, -10, -5, -5, -10, -10, -20
    ],

    whiteking: [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
    ],


}


positionBonus.blackpawn = reverse(positionBonus.whitepawn);
positionBonus.blackknight = reverse(positionBonus.whiteknight);
positionBonus.blackbishop = reverse(positionBonus.whitebishop);
positionBonus.blackrook = reverse(positionBonus.whiterook);
positionBonus.blackqueen = reverse(positionBonus.whitequeen);
positionBonus.blackking = reverse(positionBonus.whiteking);



module.exports = evaluate;