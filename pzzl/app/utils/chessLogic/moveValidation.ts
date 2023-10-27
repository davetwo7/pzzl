import { BoardProps, ChessState, PiecePosition } from "@/app/types/types";
import { isPieceWhite } from "./checkLegalMove";

export const validatePawnMove = (start: PiecePosition, end: PiecePosition, board: ChessState, isWhite: boolean) => {
  // Simplified example: doesn't handle en passant or initial two-square move
  const direction = isWhite ? -1 : 1; // White pawns move up (decreasing row), black move down
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;

  // Normal move
  console.log('row diff: ', rowDiff)
  console.log('col diff: ', colDiff)
  console.log('direction: ', direction)
  if (colDiff === 0 && rowDiff === direction) {
    console.log(board.board)
    console.log(end.row, end.col)
    return !board.board[end.row - 1][end.col - 1]; // Must move to empty square
  }

  // Capture move
  if (Math.abs(colDiff) === 1 && rowDiff === direction) {
    return board.board[end.row - 1][end.col - 1] && (isWhite !== isPieceWhite(board.board[end.row - 1][end.col - 1])); // Must capture opposite color
  }

  return false;
}
