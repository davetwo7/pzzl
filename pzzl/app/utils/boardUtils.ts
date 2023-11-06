import { PiecePosition, ChessPieceType, ChessState } from "../types/types";
import { checkLegalMove, useMovePiece } from "./chessLogic/checkLegalMove";

export const updatePiecePosition = (
  e: MouseEvent,
  currentPiece: HTMLImageElement
) => {
  currentPiece.style.left = e.clientX - currentPiece.offsetWidth / 2 + "px";
  currentPiece.style.top = e.clientY - currentPiece.offsetHeight / 2 + "px";
};

export const calculateNewPosition = (e: MouseEvent, boardRef: React.RefObject<HTMLDivElement>): PiecePosition => {
  if (!boardRef.current) {
    return { row: 0, col: 0 };
  }

  const rect = boardRef.current.getBoundingClientRect();
  const squareWidth = rect.width / 8;
  const squareHeight = rect.height / 8;

  // Calculate the mouse position relative to the board
  const mouseXRelativeToBoard = e.clientX - rect.left;
  const mouseYRelativeToBoard = e.clientY - rect.top;

  // Calculate row and column, convert to range 1-8 and adjust for zero-based index
  let col = Math.ceil(mouseXRelativeToBoard / squareWidth) - 1;
  let row = Math.ceil(mouseYRelativeToBoard / squareHeight) - 1;

  // Make sure the row and col are within the 1-8 range
  row = Math.max(0, Math.min(8, row));
  col = Math.max(0, Math.min(8, col));

  console.log("This is the calculated row and col ", row, col);
  return { row, col };
};