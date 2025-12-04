import Image from 'next/image'
import React from 'react'



const BoxSkill = () => {
    
    
    return (
    <div>
      <div className="ml-4 md:ml-0 md:mb-8">
        <div className="">
          <h2 className="uppercase font-bold text-6xl lg:text-6xl mb-4 text-shadow-lg text-shadow-gray-500">
            ⁘ SKILLS
          </h2>
          <div className="w-64 h-1 rounded bg-neutral-700"></div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 justify-between gap-6 p-4 md:p-0">
          <div className="
              bg-radial-[at_50%_75%] floating
              
              p-8 w-full 
              border border-purple-900 rounded-xl
              inset-shadow-sm inset-shadow-indigo-500 
              shadow-xl/30 hover:shadow-violet-700

              transition-all inset-shadow-md inset-shadow-indigo-500
              to-indigo-900/35 hover:scale-105
              duration-700
              
          ">
              <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  <h2 className='uppercase font-bold text-3xl bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent'>
                      Programming Languages
                  </h2>
              </div>
              <ProgramLanguage/>
          </div>
          
            <div className="
                bg-radial-[at_50%_75%] floating-400
                
                p-8 w-full 
                border border-cyan-900 rounded-xl
                inset-shadow-sm inset-shadow-teal-500 
                shadow-xl/30 hover:shadow-green-700

                transition-all 
                to-teal-900/35 hover:scale-105
                duration-700
            ">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
                <h2 className='uppercase font-bold text-3xl bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent'>
                    Frameworks & Tools
                </h2>
            </div>
            <ProgramTools/>
        </div>
        
      </div>
  </div>
  )
}


export const ProgramLanguage = () => {
  const skills = [
    { name: "HTML", file: "HTMLicon.png" },
    { name: "CSS", file: "CSSicon.png" },
    { name: "JavaScript", file: "Javascripticon.png" },
    { name: "TypeScript", file: "Typescripticon.png" },
    { name: "Python", file: "Pythonicon.png" },
    { name: "PHP", file: "PHPicon.png" },
    { name: "C#", file: "Csharpicon.png" },
    { name: "C", file: "Cicon.png" },
    // { name: "SQL", file: "SQLicon.png" }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 pb-4">
      {skills.map((skill, index) => (
        <div key={index} className="">
            <div  className="flex flex-col items-center justify-center hover:scale-105 transition-all duration-500 w-full h-full">
                <Image
                    src={`/programsLan/${skill.file}`}
                    alt={skill.name}
                    width={50}
                    height={50}
                    />
            </div>
            <div className="text-center">
                <p>{skill.name}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export const ProgramTools = () => {
    const skills = ['Unity', 'NextJs', 'React', 'MySQL'];
  return (
    <div className="grid grid-cols-4 gap-4">
      {skills.map((skill, index) => (
        <div key={index} className="">
            <div className="flex flex-col items-center justify-center hover:scale-105 transition-all duration-500 w-full h-full">
            <Image 
                src={`/Tools/${skill}icon.png`} 
                alt={skill}
                width={50}
                height={50}
            />
            </div>
            <div className="text-center">
                <p>{skill}</p>
            </div>
        </div>
      ))}
    </div>
  )
}


export default BoxSkill