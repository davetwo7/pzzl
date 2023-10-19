import React from "react";

const Board = () => {
  let cols: number = 8;
  let rows: number = 8;

  return (
    <div className="board">
      <div className="relative container mx-auto p-4 w-[40vw] max-w-[750px] pt-[40vw] max-pt-[750px]">
        <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-8 bg-white text-black gap-0 w-full h-full">
          {Array.from({ length: cols * rows }, (_, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const isBlack = (row + col) % 2 !== 0;
            return (
              <div
                key={index}
                className={`${isBlack ? "bg-stone-800" : "bg-stone-300"}`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Board;
