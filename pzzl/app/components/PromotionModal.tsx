"use client";
import React from "react";
import Image from "next/image";
import blackQueen from "../../public/chessPieceSVG/qb.svg";
import blackRook from "../../public/chessPieceSVG/rb.svg";
import blackKnight from "../../public/chessPieceSVG/nb.svg";
import blackBishop from "../../public/chessPieceSVG/bb.svg";
import whiteQueen from "../../public/chessPieceSVG/qw.svg";
import whiteRook from "../../public/chessPieceSVG/rw.svg";
import whiteKnight from "../../public/chessPieceSVG/nw.svg";
import whiteBishop from "../../public/chessPieceSVG/bw.svg";
import { PiecePosition, ChessState, ChessPieceType } from "../types/types";
import { ModalContext } from "./ModalProvider";
import { useContext } from "react";
interface PromotionModalProps {
  color: string;
  position: PiecePosition;
  setBoard: React.Dispatch<React.SetStateAction<ChessState>>;
}

const pieces = {
  white: {
    Q: whiteQueen,
    R: whiteRook,
    N: whiteKnight,
    B: whiteBishop,
  },
  black: {
    Q: blackQueen,
    R: blackRook,
    N: blackKnight,
    B: blackBishop,
  },
};

const PromotionModal = ({ color, position, setBoard }: PromotionModalProps) => {
  const { setModalVisible } = useContext(ModalContext);

  const piecesColor = color === "white" ? pieces.white : pieces.black;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pieceName = e.currentTarget.querySelector("img")?.alt;
    console.log(pieceName);
    setBoard((prevBoard) => {
      const newBoard = prevBoard.board.map((row) => [...row]);
      if (pieceName) {
        const piece =
          color === "black"
            ? pieceName.toLowerCase().charAt(0)
            : pieceName.charAt(0);
        console.log(piece);
        newBoard[position.row][position.col] = piece as ChessPieceType; // new piece
      }

      return {
        ...prevBoard,
        board: newBoard,
      };
    });
    setModalVisible(false);
  };

  return (
    <div className="absolute z-50 inset-0 flex justify-center items-center bg-transparent">
      <button
        className="bg-slate-100 h-1/5 w-1/5 p-2 rounded-l-md"
        onClick={handleClick}
      >
        <Image src={piecesColor.Q} alt={"Queen"} className="drop-shadow-2xl" />
      </button>
      <button className="bg-slate-100 h-1/5 w-1/5 p-2" onClick={handleClick}>
        <Image src={piecesColor.R} alt={"Rook"} />
      </button>
      <button className="bg-slate-100 h-1/5 w-1/5 p-2" onClick={handleClick}>
        <Image src={piecesColor.N} alt={"N Knight"} />
      </button>
      <button
        className="bg-slate-100 h-1/5 w-1/5 p-2 rounded-r-md"
        onClick={handleClick}
      >
        <Image src={piecesColor.B} alt={"Bishop"} />
      </button>
    </div>
  );
};

export default PromotionModal;
