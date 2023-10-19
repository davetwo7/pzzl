import Board from "./components/Board";

export default function Home() {
  return (
    <main className="flex items-center flex-col">
      <h1 className="p-8 text-2xl font-ranade-medium">pzzl.</h1>
      <Board />
    </main>
  );
}
