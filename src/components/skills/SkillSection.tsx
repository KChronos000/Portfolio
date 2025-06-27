import React from 'react'
import { CardSkills } from './CardSkills'

const SkillSection = () => {
  return (
    <section id='skills' className="bg-neutral-900 w-full relative z-10 flex flex-col justify-center min-h-screen items-center border">
      <div className="">
        <CardSkills />
      </div>
    </section>
  )
}

export default SkillSection