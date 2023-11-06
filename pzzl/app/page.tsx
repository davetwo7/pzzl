"use client";
import Board from "./components/Board";
import { ModalProvider } from "./components/ModalProvider";
import parseFEN from "./utils/parseFEN";

let test = parseFEN(
  "r2qr1k1/b1p2ppp/pp4n1/P1P1p3/4P1n1/B2P2Pb/3NBP1P/RN1QR1K1 b - - 1 16"
);

export default function Home() {
  return (
    <ModalProvider>
      <main className="flex items-center flex-col">
        <h1 className="p-8 text-2xl font-ranade-medium">pzzl.</h1>
        <Board boardData={test} />
      </main>
    </ModalProvider>
  );
}
