type Piece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p' | 'R' | 'N' | 'B' | 'Q' | 'K' | 'P' | null;

interface FEN {

}

interface ParsedFEN {

}

const parseFEN = (fen: String) => {
  let parts = fen.split(" ");
  let ranks = parts[0].split("/");

  const board: Piece[][] = ranks.map()

  return 1;
}

parseFEN("r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24")

// export default parseFEN;