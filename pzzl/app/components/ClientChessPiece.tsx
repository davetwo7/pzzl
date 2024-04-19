"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { ClientChessPieceProps } from "../types/types";
import { isPieceWhite } from "../utils/chessLogic/checkLegalMove";

const ClientChessPiece = ({
  src,
  alt,
  onDrop,
  piecePosition,
  updatePiecePosition,
  board,
  boardRef,
  setBoard,
}: ClientChessPieceProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const pieceRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    let playerColor = "";
    if (isPieceWhite(alt)) {
      playerColor = "w";
    } else {
      playerColor = "b";
    }
    if (board.turn != playerColor) {
      return;
    }
    setIsDragging(true);
    if (pieceRef.current) {
      pieceRef.current.style.left =
        e.clientX - pieceRef.current.offsetWidth / 2 + "px";
      pieceRef.current.style.top =
        e.clientY - pieceRef.current.offsetHeight / 2 + "px";
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = (e: MouseEvent) => {
    setIsDragging(false);
    if (pieceRef.current) {
      pieceRef.current.style.position = "static";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      onDrop(e, piecePosition, alt, board, boardRef, setBoard);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    console.log("moving");
    console.log("piece: ", alt);
    if (!pieceRef.current) return;
    updatePiecePosition(e, pieceRef.current);
  };

  return (
    <Image
      src={src}
      alt={alt || "chess piece"}
      ref={pieceRef}
      onMouseDown={handleMouseDown}
      draggable={false}
      className={`cursor-pointer ${isDragging ? "dragging" : ""}`}
      style={
        isDragging && pieceRef.current
          ? {
              position: "fixed",
              pointerEvents: "none",
              zIndex: 25,
              opacity: 1,
              width: pieceRef.current.offsetWidth,
              height: pieceRef.current.offsetHeight,
            }
          : {}
      }
    />
  );
};

export default ClientChessPiece;
