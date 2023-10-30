import { ChessState, ChessPieceType, PiecePosition } from "@/app/types/types";
import { validatePawnMove, validateBishopMove, validateKnightMove, validateRookMove, validateQueenMove } from "./moveValidation";

export const checkLegalMove = (piece: ChessPieceType, startPosition: PiecePosition, endPosition: PiecePosition, board: ChessState) => {
  if (piece === null) {
    return false;
  }
  // Determine color and piece type from pieceType
  // Call the respective function based on the piece type
  // e.g., if (pieceType.toLowerCase() === 'p') { return validatePawnMove(startPosition, endPosition, board); }
  const pieceMoves: { [key in ChessPieceType]: Function } = {
    'p': validatePawnMove,
    'P': validatePawnMove, // Assuming same logic for black and white pawns
    'r': validateRookMove,
    'R': validateRookMove,
    'q': validateQueenMove,
    'Q': validateQueenMove,
    // 'k': validateKingMove,
    // 'K': validateKingMove,
    'n': validateKnightMove,
    'N': validateKnightMove,
    'b': validateBishopMove,
    'B': validateBishopMove
  }
  console.log(board.board[endPosition.row][endPosition.col])
  return pieceMoves[piece](startPosition, endPosition, board, isPieceWhite(piece)) && (board.board[endPosition.row][endPosition.col] !== "k" && board.board[endPosition.row][endPosition.col] !== "K")
  // Include additional rules like check/checkmate considerations

};

export const isPieceWhite = (chessPiece: ChessPieceType): boolean => {
  // your logic here
  return chessPiece === chessPiece?.toUpperCase();
}

export const capturePiece = (
  startPosition: PiecePosition,
  endPosition: PiecePosition,
  setBoard: React.Dispatch<React.SetStateAction<ChessState>>
) => {
  console.log("Piece captured");

  setBoard(prevBoard => {
    // First, create a deep copy of the board
    const newBoard = prevBoard.board.map(row => [...row]);

    // Move the piece from the startPosition to the endPosition
    newBoard[endPosition.row][endPosition.col] = newBoard[startPosition.row][startPosition.col];
    newBoard[startPosition.row][startPosition.col] = ""; // Assuming an empty square is represented by an empty string

    // Now return the new state with the updated board
    return {
      ...prevBoard,
      board: newBoard
    };
  });
}