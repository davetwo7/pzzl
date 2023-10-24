import React from "react";
import { ChessState } from "../utils/parseFEN";
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
interface BoardProps {
  boardData: ChessState;
}

const Board = ({ boardData }: BoardProps) => {
  let cols: number = 8;
  let rows: number = 8;

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

  const handleDragStart = (
    e: React.DragEvent<HTMLImageElement>,
    imgElement: HTMLImageElement
  ) => {
    e.dataTransfer.setDragImage(
      imgElement,
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
  };

  return (
    <div className="board">
      <div className="relative container mx-auto p-4 w-[40vw] max-w-[750px] pt-[40vw] max-pt-[750px]">
        <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-8 bg-white text-black gap-0 w-full h-full">
          {Array.from({ length: cols * rows }, (_, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const isBlack = (row + col) % 2 !== 0;
            let currentPiece = boardData.board[row][col];
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
