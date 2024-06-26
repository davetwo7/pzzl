import { BoardProps, ChessState, PiecePosition } from "@/app/types/types";
import { isPieceWhite } from "./checkLegalMove";

export const validatePawnMove = (start: PiecePosition, end: PiecePosition, board: ChessState, isWhite: boolean) => {
  // Simplified example: doesn't handle en passant or initial two-square move
  const direction = (board.turn === "w") === isWhite ? -1 : 1; // White pawns move up (decreasing row), black move down

  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;

  // Normal move
  if (colDiff === 0 && rowDiff === direction) {
    console.log(board.board)
    console.log(end.row, end.col)
    return !board.board[end.row][end.col]; // Must move to empty square
  }

  // Capture move
  if (Math.abs(colDiff) === 1 && rowDiff === direction) {
    return board.board[end.row][end.col] && (isWhite !== isPieceWhite(board.board[end.row][end.col])); // Must capture opposite col or
  }

  return false;
}

export const validateBishopMove = (start: PiecePosition, end: PiecePosition, board: ChessState, isWhite: boolean) => {
  console.log(start, end);

  let rowDifference = Math.abs(start.row - end.row);
  let colDifference = Math.abs(start.col - end.col);

  if (rowDifference === colDifference) {
    let rowIncrement = (end.row - start.row) / rowDifference;
    let colIncrement = (end.col - start.col) / colDifference;

    for (let i = 1; i < rowDifference; i++) {

      if (board.board[start.row + i * rowIncrement][start.col + i * colIncrement]) {
        return false;
      }
    }

    let endPiece = board.board[end.row][end.col];
    return !endPiece || isPieceWhite(endPiece) !== isWhite;
  } else {
    return false;
  }
}

export const validateKnightMove = (start: PiecePosition, end: PiecePosition, board: ChessState, isWhite: boolean) => {
  const verticalMove = Math.abs(end.row - start.row);
  const horizontalMove = Math.abs(end.col - start.col);

  const isLShapedMove = (verticalMove === 2 && horizontalMove === 1) || (verticalMove === 1 && horizontalMove === 2);

  const endPiece = board.board[end.row][end.col];
  const isCaptureMove = endPiece && isPieceWhite(endPiece) !== isWhite;
  const isMoveToEmptySquare = !endPiece;

  return isLShapedMove && (isCaptureMove || isMoveToEmptySquare);
};

export const validateRookMove = (start: PiecePosition, end: PiecePosition, board: ChessState, isWhite: boolean) => {
  let rowDifference = Math.abs(start.row - end.row);
  let colDifference = Math.abs(start.col - end.col);

  let movedHorizontally = rowDifference === 0 && colDifference > 0;
  let movedVertically = colDifference === 0 && rowDifference > 0;

  if (!movedHorizontally && !movedVertically) {
    return false;
  }

  let rowStep = start.row < end.row ? 1 : -1;
  let colStep = start.col < end.col ? 1 : -1;

  let currentRow = start.row;
  let currentCol = start.col;

  while ((movedVertically && currentRow !== end.row) || (movedHorizontally && currentCol !== end.col)) {
    if (movedVertically) currentRow += rowStep;
    if (movedHorizontally) currentCol += colStep;

    if ((movedVertically && currentRow !== end.row) || (movedHorizontally && currentCol !== end.col)) {
      if (board.board[currentRow][currentCol]) {
        console.log("Invalid Move")
        return false;
      }
    }
  }

  const endPiece = board.board[end.row][end.col];
  console.log("end piece: ", { row: end.row, col: end.col })
  const canCapture = endPiece && isPieceWhite(endPiece) !== isWhite;
  return !endPiece || canCapture;
};

export const validateQueenMove = (start: PiecePosition, end: PiecePosition, board: ChessState, isWhite: boolean) => {
  return validateBishopMove(start, end, board, isWhite) || validateRookMove(start, end, board, isWhite)
}

export const validateKingMove = (start: PiecePosition, end: PiecePosition, board: ChessState, isWhite: boolean) => {
  let rowDiff = Math.abs(start.row - end.row);
  let colDiff = Math.abs(start.col - end.col);
  if (rowDiff > 1 || colDiff > 1) return false;

  // Find opponent's king's position
  let opponentKingPos: { row: number; col: number; } | undefined;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board.board[row][col] === (isWhite ? 'k' : 'K')) {
        opponentKingPos = { row, col };
        break;
      }
    }
    if (opponentKingPos) break;
  }

  if (!opponentKingPos) {
    // Handle the error or throw an exception
    console.error("Opponent's king not found on the board!");
    return false;
  }

  // Check if the end position is too close to the opponent's king
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the square where the opponent's king is
      let checkRow = opponentKingPos.row + i;
      let checkCol = opponentKingPos.col + j;

      // If this is our end position, the move is not valid
      if (checkRow === end.row && checkCol === end.col) return false;
    }
  }

  // Check if end square is empty or contains an opponent's piece
  const endPiece = board.board[end.row][end.col];
  const canCapture = endPiece && isPieceWhite(endPiece) !== isWhite;
  return !endPiece || canCapture;
};
