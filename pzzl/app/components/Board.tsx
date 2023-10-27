"use client";
import React from "react";
import { useState, useRef } from "react";
import { BoardProps, PiecePosition, ChessPieceType } from "../types/types";
import {
  capturePiece,
  checkLegalMove,
} from "../utils/chessLogic/checkLegalMove";
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

const Board = ({ boardData }: BoardProps) => {
  const boardRef = useRef<HTMLDivElement>(null);

  let cols: number = 8;
  let rows: number = 8;

  const [board, setBoard] = useState(boardData);
  const [droppedPosition, setDroppedPosition] = useState(null);

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

  const updatePiecePosition = (
    e: MouseEvent,
    currentPiece: HTMLImageElement
  ) => {
    currentPiece.style.left = e.clientX - currentPiece.offsetWidth / 2 + "px";
    currentPiece.style.top = e.clientY - currentPiece.offsetHeight / 2 + "px";
  };

  const calculateNewPosition = (e: MouseEvent): PiecePosition => {
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
    let col = Math.ceil(mouseXRelativeToBoard / squareWidth);
    let row = Math.ceil(mouseYRelativeToBoard / squareHeight);

    // Make sure the row and col are within the 1-8 range
    row = Math.max(1, Math.min(8, row));
    col = Math.max(1, Math.min(8, col));
    return { row, col };
  };

  const onPieceDrop = async (
    e: MouseEvent,
    startingPosition: PiecePosition,
    piece: ChessPieceType
  ) => {
    let newPosition = calculateNewPosition(e);
    console.log(startingPosition);
    console.log("Piece dropped at: ", newPosition);
    const isLegal: boolean = checkLegalMove(
      piece,
      startingPosition,
      newPosition,
      board
    );
    if (isLegal) {
      capturePiece(startingPosition, newPosition, setBoard, board);
    }
    // setDroppedPosition(newPosition);
    // Here, you can update the board state based on where the piece was dropped
  };

  return (
    <div className="board" ref={boardRef}>
      <div className="relative container mx-auto p-4 w-[40vw] max-w-[750px] pt-[40vw] max-pt-[750px]">
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
                    piecePosition={{ row: row + 1, col: col + 1 }} // Add piece's current position
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
