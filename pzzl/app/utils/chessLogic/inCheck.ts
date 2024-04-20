import { ChessState, PiecePosition } from "@/app/types/types"
import { isPieceWhite } from "./checkLegalMove";


export const inCheck = (board: ChessState, newPosition: PiecePosition) => {
  console.log("inCheck")
  let betweenKandR = false;
  let inCheck = false;
  // for (let i = 0; i < board.board[newPosition.row].length; i++) {
  //   let currentPiece = board.board[newPosition.row][i]

  //   // if piece is a king and pieces are opposite colors
  //   if (currentPiece.toUpperCase() == "K" && isPieceWhite(board.board[newPosition.row][newPosition.col]) !== isPieceWhite(currentPiece) || i == newPosition.col) {
  //     betweenKandR = !betweenKandR;
  //     console.log("Between k and r: ", betweenKandR)
  //     console.log("King: ", board.board[newPosition.row][i])
  //     console.log("End col: ", newPosition.col)
  //   }

  //   if (betweenKandR) {
  //     console.log("currentPiece in between k and r: ", currentPiece)
  //   }
  // }
  console.log("THIS SHOULD BE THE NEW POSITION: ", newPosition)
  console.log("NEW POSITION: ", board.board[newPosition.row])
}
