import Hero from "./sections/Hero";
import FabricWorld from "./sections/FabricWorld";
import CraftStory from "./sections/CraftStory";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Collections from "./sections/Collections";
import FounderStory from "./sections/FounderStory";
import EnterStore from "./sections/EnterStore";

export default function Home() {
  return (
    <main>
      <Hero />
      <FabricWorld />
      <CraftStory />
      <Collections />
      <FounderStory />
      <EnterStore />
    </main>
  );
}