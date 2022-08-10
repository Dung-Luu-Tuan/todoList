import React from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import MainScene from "./src/components/MainScene";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <MainScene />
    </TailwindProvider>
  );
}
