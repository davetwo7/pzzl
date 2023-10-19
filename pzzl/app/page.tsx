import Board from "./components/Board";
import parseFEN from "./utils/parseFEN";

export default function Home() {
  let test = parseFEN("r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24");
  console.log(test);
  return (
    <main className="flex items-center flex-col">
      <h1 className="p-8 text-2xl font-ranade-medium">pzzl.</h1>
      <Board />
      <div>jelo</div>
    </main>
  );
}
