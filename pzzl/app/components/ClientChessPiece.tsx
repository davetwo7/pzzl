"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ClientChessPieceProps {
  src: string;
  alt: string;
}

const ClientChessPiece = ({ src, alt }: ClientChessPieceProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const pieceRef = useRef<HTMLImageElement>(null);
  const clonedPieceRef = useRef<HTMLImageElement | null>(null);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const targetImage = e.target as HTMLElement;
    console.log("Mouse down triggered");
    setIsDragging(true);
    targetImage.style.opacity = "0";

    // Clone the original image and append to body
    if (pieceRef.current) {
      clonedPieceRef.current = pieceRef.current.cloneNode(
        true
      ) as HTMLImageElement;
      document.body.appendChild(clonedPieceRef.current);
      console.log("clone", clonedPieceRef.current);
      clonedPieceRef.current.width = pieceRef.current.offsetWidth;
      clonedPieceRef.current.height = pieceRef.current.offsetHeight;
      clonedPieceRef.current.style.position = "fixed";
      clonedPieceRef.current.style.opacity = "1";
      clonedPieceRef.current.style.pointerEvents = "none"; // so it doesn't interfere with other DOM elements

      updatePiecePosition(e);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUpDocument);
  };

  const handleMouseUpDocument = (e: MouseEvent) => {
    console.log("Mouse up triggered");
    setIsDragging(false);
    if (pieceRef.current) {
      pieceRef.current.style.opacity = "1";
    }

    // Remove the cloned image from the body
    if (clonedPieceRef.current) {
      document.body.removeChild(clonedPieceRef.current);
      clonedPieceRef.current = null;
    }

    // IMPORTANT: Remove the listeners from the document when done dragging
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUpDocument);
  };

  const handleMouseMove = (e: MouseEvent) => {
    console.log("Mouse move triggered");
    console.log(isDragging);
    if (clonedPieceRef.current) {
      updatePiecePosition(e);
    }
  };

  const updatePiecePosition = (e: MouseEvent) => {
    console.log("Updating position:", e.clientX, e.clientY);
    if (clonedPieceRef.current) {
      clonedPieceRef.current.style.left =
        e.clientX - clonedPieceRef.current.offsetWidth / 2 + "px";
      clonedPieceRef.current.style.top =
        e.clientY - clonedPieceRef.current.offsetHeight / 2 + "px";
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      ref={pieceRef}
      onMouseDown={handleMouseDown}
      draggable={false}
      className="cursor-pointer"
    />
  );
};

export default ClientChessPiece;
