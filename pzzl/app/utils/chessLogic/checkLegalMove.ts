import { ChessState, ChessPieceType, PiecePosition } from "@/app/types/types";
import { validatePawnMove, validateBishopMove, validateKnightMove, validateRookMove, validateQueenMove, validateKingMove } from "./moveValidation";
import { ModalContext } from "@/app/components/ModalProvider";
import { useContext, useEffect, useState } from "react";

export const checkLegalMove = (piece: ChessPieceType, startPosition: PiecePosition, endPosition: PiecePosition, board: ChessState) => {
  if (piece === null) {
    return false;
  }
  const pieceMoves: { [key in ChessPieceType]: Function } = {
    'p': validatePawnMove,
    'P': validatePawnMove,
    'r': validateRookMove,
    'R': validateRookMove,
    'q': validateQueenMove,
    'Q': validateQueenMove,
    'k': validateKingMove,
    'K': validateKingMove,
    'n': validateKnightMove,
    'N': validateKnightMove,
    'b': validateBishopMove,
    'B': validateBishopMove,
    '': () => false
  }
  return pieceMoves[piece](startPosition, endPosition, board, isPieceWhite(piece)) && (board.board[endPosition.row][endPosition.col] !== "k" && board.board[endPosition.row][endPosition.col] !== "K")
};

export const isPieceWhite = (chessPiece: ChessPieceType): boolean => {
  return chessPiece === chessPiece?.toUpperCase();
}

interface PromotionState {
  shouldPromote: boolean;
  color: string | null;
  newPosition: {
    row: number;
    col: number;
  } | null
}

export const useMovePiece = () => {
  const { setModalVisible, setPromotionColor, setPromotionPosition } = useContext(ModalContext);

  const [promotion, setPromotion] = useState<PromotionState>({ shouldPromote: false, color: null, newPosition: null });

  useEffect(() => {
    if (promotion.shouldPromote && promotion.color && promotion.newPosition) {
      setPromotionColor(promotion.color)
      setPromotionPosition(promotion.newPosition)
      setModalVisible(true);
      // Handle the promotion here or reset the promotion state
      // ...
    }
    console.log(promotion)
  }, [promotion, setModalVisible, setPromotionColor, setPromotionPosition]);

  const movePiece = (
    startPosition: PiecePosition,
    endPosition: PiecePosition,
    setBoard: React.Dispatch<React.SetStateAction<ChessState>>
  ) => {

    setBoard(prevBoard => {
      const newBoard = prevBoard.board.map(row => [...row]);

      newBoard[endPosition.row][endPosition.col] = newBoard[startPosition.row][startPosition.col];
      newBoard[startPosition.row][startPosition.col] = "";

      const newPosition = newBoard[endPosition.row][endPosition.col];
      if (endPosition.row === 0 && newPosition === "P") {
        console.log("White Piece Promotion");
        setPromotion({ shouldPromote: true, color: 'white', newPosition: endPosition });
      } else if (endPosition.row === 7 && newPosition === "p") {
        console.log("Black Piece Promotion");
        setPromotion({ shouldPromote: true, color: 'black', newPosition: endPosition });
      }

      return {
        ...prevBoard,
        board: newBoard
      };
    });
  }

  return movePiece;
};