import { Boxs } from "@/components/floatingBox/Boxs";
import FirstSection from "@/components/intro/FirstSection";
import SkillSection from "@/components/skills/SkillSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center relative">
      <Boxs />      
      <FirstSection />
      <SkillSection />
    </main>
  );
}