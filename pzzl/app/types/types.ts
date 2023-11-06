// Types for Chess Pieces
export type ChessPieceType =
  | "b" // Black Bishop
  | "r" // Black Rook
  | "q" // Black Queen
  | "n" // Black Knight
  | "k" // Black King
  | "p" // Black Pawn
  | "B" // White Bishop
  | "R" // White Rook
  | "Q" // White Queen
  | "N" // White Knight
  | "K" // White King
  | "P" // White Pawn
  | "" // Empty

// Interface for the position of a piece on the chessboard
export interface PiecePosition {
  row: number;
  col: number;
}

export interface ChessState {
  board: ChessPieceType[][];
  turn: string;
  castling: string;
  enPassant: string;
  halfMoveClock: number;
  firstMoveTimer: number;
};

// Interface for the BoardProps
export interface BoardProps {
  boardData: ChessState; // Assuming ChessState is already defined in your parseFEN utils
}

// Interface for the ClientChessPiece component's props
export interface ClientChessPieceProps {
  src: string;
  alt: ChessPieceType;
  board: ChessState;
  boardRef: React.RefObject<HTMLDivElement>;
  setBoard: React.Dispatch<React.SetStateAction<ChessState>>;
  onDrop: (
    e: MouseEvent,
    startingPosition: PiecePosition,
    alt: ChessPieceType,
    board: ChessState,
    boardRef: React.RefObject<HTMLDivElement>,
    setBoard: React.Dispatch<React.SetStateAction<ChessState>>,
  ) => void;
  piecePosition: PiecePosition;
  updatePiecePosition: (e: MouseEvent, currentPiece: HTMLImageElement) => void;
}

// You can also include any other relevant types or interfaces here
