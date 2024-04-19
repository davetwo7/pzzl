import { ChessPieceType, ChessState } from "../types/types";

const parseBlackSide = (ranks: string[]) => {
  let board: ChessPieceType[][] = []
  for (let i = ranks.length - 1; i >= 0; i--) {
    let rank = ranks[i];
    let row: ChessPieceType[] = [];
    console.log(rank)
    for (let j = rank.length - 1; j >= 0; j--) {
      const char = rank[j];
      if (isNaN(Number(char))) {
        row.push(char as ChessPieceType)
      } else {
        for (let k = 0; k < Number(char); k++) {
          row.push("");
        }
      }
    }
    board.push(row)
  }
  return board
}

const parseWhiteSide = (ranks: String[]) => {
  return ranks.map((rank) => {
    const row: ChessPieceType[] = [];
    for (let i = 0; i < rank.length; i++) {
      const char = rank[i];
      if (isNaN(Number(char))) {
        row.push(char as ChessPieceType)
      } else {
        for (let j = 0; j < Number(char); j++) {
          row.push("");
        }
      }
    }
    return row;
  })
}

const parseFEN = (fen: String): ChessState => {
  let parts = fen.split(" ");
  let ranks = parts[0].split("/");
  const turn = parts[1] as ("w" | "b");
  const castling = parts[2];
  const enPassant = parts[3];
  const halfMoveClock = parseInt(parts[4]);
  const firstMoveTimer = parseInt(parts[5]);
  console.log(ranks)
  const board: ChessPieceType[][] = turn == "w" ? parseWhiteSide(ranks) : parseBlackSide(ranks);

  const testBlack: ChessPieceType[][] = []
  console.log("hello")
  for (let i = ranks.length - 1; i >= 0; i--) {
    let rank = ranks[i];
    let row: ChessPieceType[] = [];
    console.log(rank)
    for (let j = rank.length - 1; j >= 0; j--) {
      const char = rank[j];
      if (isNaN(Number(char))) {
        row.push(char as ChessPieceType)
      } else {
        for (let k = 0; k < Number(char); k++) {
          row.push("");
        }
      }
    }
    testBlack.push(row)
  }

  return {
    board,
    turn,
    castling,
    enPassant,
    halfMoveClock,
    firstMoveTimer
  };
}

export default parseFEN;