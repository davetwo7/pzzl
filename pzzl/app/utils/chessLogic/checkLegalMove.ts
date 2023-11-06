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
}

export const useMovePiece = () => {
  const { setModalVisible } = useContext(ModalContext);

  const [promotion, setPromotion] = useState<PromotionState>({ shouldPromote: false, color: null });;

  useEffect(() => {
    // Only show the modal if a promotion should occur
    if (promotion.shouldPromote) {
      setModalVisible(true);
      // Handle the promotion here or reset the promotion state
      // ...
    }
    console.log(promotion)
  }, [promotion, setModalVisible]);

  const movePiece = (
    startPosition: PiecePosition,
    endPosition: PiecePosition,
    setBoard: React.Dispatch<React.SetStateAction<ChessState>>
  ) => {

    let promotion = false;

    setBoard(prevBoard => {
      const newBoard = prevBoard.board.map(row => [...row]);

      newBoard[endPosition.row][endPosition.col] = newBoard[startPosition.row][startPosition.col];
      newBoard[startPosition.row][startPosition.col] = "";

      const newPosition = newBoard[endPosition.row][endPosition.col];
      if (endPosition.row === 0 && newPosition === "P") {
        console.log("White Piece Promotion");
        setPromotion({ shouldPromote: true, color: 'white' });
      } else if (endPosition.row === 7 && newPosition === "p") {
        console.log("Black Piece Promotion");
        setPromotion({ shouldPromote: true, color: 'black' });
      }

      return {
        ...prevBoard,
        board: newBoard
      };
    });
  }

  return movePiece;
};