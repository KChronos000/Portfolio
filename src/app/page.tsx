'use client'

import { Boxs } from "@/components/floatingBox/Boxs";
import FirstSection from "@/components/intro/FirstSection";
import ProjectSection from "@/components/projects/ProjectSection";
import SkillSection from "@/components/skills/SkillSection";
import React from 'react'



export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center relative"> 
      <Boxs />      
      <FirstSection />
      <SkillSection />
      <ProjectSection />
    </main>
  );
}