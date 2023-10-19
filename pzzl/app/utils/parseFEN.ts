type Piece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p' | 'R' | 'N' | 'B' | 'Q' | 'K' | 'P' | null;

interface ChessState {
  board: Piece[][];
  turn: string;
  castling: string;
  enPassant: string;
  halfMoveClock: number;
  firstMoveTimer: number;
};

const parseFEN = (fen: String): ChessState => {
  let parts = fen.split(" ");
  let ranks = parts[0].split("/");

  const board: Piece[][] = ranks.map((rank) => {
    const row: Piece[] = [];
    for (let i = 0; i < rank.length; i++) {
      const char = rank[i];
      if (isNaN(Number(char))) {
        row.push(char as Piece)
      } else {
        for (let j = 0; j < Number(char); j++) {
          row.push(null);
        }
      }
    }
    return row;
  })

  const turn = parts[1] as ("w" | "b");
  const castling = parts[2];
  const enPassant = parts[3];
  const halfMoveClock = parseInt(parts[4]);
  const firstMoveTimer = parseInt(parts[5]);

  console.log(parts)
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