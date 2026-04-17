import { Suspense } from "react";
import DeckShell from "./components/DeckShell";

export default function Home() {
  return (
    <Suspense>
      <DeckShell />
    </Suspense>
  );
}
