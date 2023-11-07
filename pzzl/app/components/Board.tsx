"use client";
import React, { useEffect } from "react";
import { useState, useRef, useContext } from "react";
import { BoardProps } from "../types/types";
import { updatePiecePosition } from "../utils/boardUtils";
import bPawn from "../../public/chessPieceSVG/pb.svg";
import bBishop from "../../public/chessPieceSVG/bb.svg";
import bRook from "../../public/chessPieceSVG/rb.svg";
import bQueen from "../../public/chessPieceSVG/qb.svg";
import bKnight from "../../public/chessPieceSVG/nb.svg";
import bKing from "../../public/chessPieceSVG/kb.svg";
import wPawn from "../../public/chessPieceSVG/pw.svg";
import wBishop from "../../public/chessPieceSVG/bw.svg";
import wRook from "../../public/chessPieceSVG/rw.svg";
import wQueen from "../../public/chessPieceSVG/qw.svg";
import wKnight from "../../public/chessPieceSVG/nw.svg";
import wKing from "../../public/chessPieceSVG/kw.svg";
import ClientChessPiece from "./ClientChessPiece";
import PromotionModal from "@/app/components/PromotionModal";
import { ModalContext } from "./ModalProvider";
import { useMovePiece } from "../utils/chessLogic/checkLegalMove";
import { ChessPieceType, ChessState, PiecePosition } from "../types/types";
import { calculateNewPosition } from "../utils/boardUtils";
import { checkLegalMove } from "../utils/chessLogic/checkLegalMove";

const Board = ({ boardData }: BoardProps) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const { modalVisible, promotionColor, promotionPosition } =
    useContext(ModalContext);
  const movePiece = useMovePiece();

  let cols: number = 8;
  let rows: number = 8;

  const [board, setBoard] = useState(boardData);

  const PIECES_MAP = {
    b: bBishop,
    r: bRook,
    q: bQueen,
    n: bKnight,
    k: bKing,
    p: bPawn,
    B: wBishop,
    R: wRook,
    Q: wQueen,
    N: wKnight,
    K: wKing,
    P: wPawn,
  };

  const onPieceDrop = async (
    e: MouseEvent,
    startingPosition: PiecePosition,
    piece: ChessPieceType,
    board: ChessState,
    boardRef: React.RefObject<HTMLDivElement>,
    setBoard: React.Dispatch<React.SetStateAction<ChessState>>
  ) => {
    let newPosition = calculateNewPosition(e, boardRef);
    console.log(startingPosition);
    console.log("Piece dropped at: ", newPosition);

    const isLegal: boolean = checkLegalMove(
      piece,
      startingPosition,
      newPosition,
      board
    );

    if (isLegal) {
      movePiece(startingPosition, newPosition, setBoard);
    }
  };

  return (
    <div className="board relative" ref={boardRef}>
      {modalVisible ? (
        <PromotionModal
          color={promotionColor}
          position={promotionPosition}
          setBoard={setBoard}
        />
      ) : null}
      <div className="relative container mx-auto p-4 w-[40vw] max-w-[750px] pt-[40vw] pt-full">
        <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-8 bg-white text-black gap-0 w-full h-full">
          {Array.from({ length: cols * rows }, (_, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const isBlack = (row + col) % 2 !== 0;
            let currentPiece = board.board[row][col];
            let currentPieceSrc = currentPiece && PIECES_MAP[currentPiece];
            return (
              <div
                key={index}
                className={`${
                  isBlack ? "bg-dark-blue" : "bg-light-blue"
                } relative`}
              >
                {currentPiece ? (
                  <ClientChessPiece
                    src={currentPieceSrc}
                    alt={currentPiece || "Chess piece"}
                    onDrop={onPieceDrop}
                    updatePiecePosition={updatePiecePosition}
                    piecePosition={{ row: row, col: col }}
                    board={board}
                    boardRef={boardRef}
                    setBoard={setBoard}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Board;
