import Hero from "./sections/Hero";
import FabricWorld from "./sections/FabricWorld";
import CraftStory from "./sections/CraftStory";
import Collections from "./sections/Collections";
import CategorySection from "./sections/CategorySection"
import FounderStory from "./sections/FounderStory";
import EnterStore from "./sections/EnterStore";

export default function Home() {
  return (
    <main>
      <Hero />
      <FabricWorld />
      <CategorySection />  
      <CraftStory />
      <Collections />
      <FounderStory />
      <EnterStore />
    </main>
  );
}