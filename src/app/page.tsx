'use client'

import AchievementSection from "@/components/achievement/AchievementSection";
import { Boxs } from "@/components/floatingBox/Boxs";
import Footer from "@/components/footer/Footer";
import FirstSection from "@/components/intro/FirstSection";
import SkillSection from "@/components/skills/SkillSection";
import React from 'react'
// import { Sparkle } from "lucide-react";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center relative"> 
      <div className=""></div>
      <Boxs />      
      <FirstSection />
      {/* <Sparkle/> */}
      <SkillSection />
      <AchievementSection />
      <Footer />
    </main>
  );
}