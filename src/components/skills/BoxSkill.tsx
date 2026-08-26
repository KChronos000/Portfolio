import Image from 'next/image'
import React from 'react'

const BoxSkill = () => {
  return (
    <div>
      <div className="ml-4 md:ml-0 md:mb-10">
        <div className='flex items-center justify-center my-5 md:my-0'>
          <span className='text-shadow-lg text-gray-900 dark:text-white text-shadow-gray-500 text-6xl lg:text-6xl font-bold mr-4'>
              <span className="md:hidden">{`<`}</span>
              <span className="hidden md:inline">✦</span>
          </span>
          <h2 className="bg-linear-to-r from-violet-500 via-cyan-400 to-emerald-500 dark:from-violet-500 dark:to-emerald-500 bg-clip-text text-transparent uppercase font-bold text-6xl lg:text-6xl mb-4">
            SKILLS
          </h2>
          <span className='text-shadow-lg text-gray-900 dark:text-white text-shadow-gray-500 text-6xl lg:text-6xl font-bold ml-4'>
            <span className="lg:hidden">{`/>`}</span>
            <span className="hidden lg:inline">✦</span>
          </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 justify-between gap-6 p-4 md:p-0">
        {/* Programming Languages Card */}
        <div className="
          bg-radial-[at_50%_75%] from-purple-100 to-indigo-200/60
          dark:from-transparent dark:to-indigo-900/35
          floating-400 mb:floating
          p-8 w-full 
          border border-purple-300 dark:border-purple-900 rounded-xl
          inset-shadow-sm inset-shadow-indigo-300 dark:inset-shadow-indigo-500
          shadow-lg shadow-purple-300/40 dark:shadow-none hover:shadow-violet-400 dark:hover:shadow-violet-700
          transition-all inset-shadow-md
          hover:scale-105
          duration-700
        ">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-linear-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className='uppercase font-bold text-3xl bg-linear-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent'>
              Programming Languages
            </h2>
          </div>
          <ProgramLanguage/>
        </div>
        
        {/* Frameworks & Tools Card */}
        <div className="
          bg-radial-[at_50%_75%] from-teal-100 to-teal-200/60
          dark:from-transparent dark:to-teal-900/35
          floating-400-delay mb:floating-delay
          p-8 w-full 
          border border-cyan-300 dark:border-cyan-900 rounded-xl
          inset-shadow-sm inset-shadow-teal-300 dark:inset-shadow-teal-500 
          shadow-lg shadow-teal-300/40 dark:shadow-none hover:shadow-emerald-400 dark:hover:shadow-emerald-700
          transition-all 
          hover:scale-105
          duration-700
        ">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-linear-to-b from-emerald-500 to-cyan-500 rounded-full"></div>
            <h2 className='uppercase font-bold text-3xl bg-linear-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent'>
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
  { name: "HTML", file: "HTMLicon.png", color: "from-orange-400 to-amber-400 dark:from-orange-500 dark:to-red-500" },
  { name: "CSS", file: "CSSicon.png", color: "from-sky-400 to-blue-400 dark:from-blue-500 dark:to-blue-600" },
  { name: "JavaScript", file: "Javascripticon.png", color: "from-amber-300 to-yellow-300 dark:from-yellow-400 dark:to-yellow-500" },
  { name: "TypeScript", file: "Typescripticon.png", color: "from-sky-400 to-indigo-300 dark:from-blue-600 dark:to-blue-700" },
  { name: "Python", file: "Pythonicon.png", color: "from-sky-400 to-amber-300 dark:from-blue-400 dark:to-yellow-400" },
  { name: "PHP", file: "PHPicon.png", color: "from-indigo-400 to-purple-300 dark:from-purple-500 dark:to-indigo-600" },
  { name: "C#", file: "Csharpicon.png", color: "from-purple-300 to-pink-300 dark:from-purple-600 dark:to-pink-600" },
  { name: "C", file: "Cicon.png", color: "from-blue-300 to-cyan-300 dark:from-blue-500 dark:to-blue-700" },
];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pb-4">
      {skills.map((skill, index) => (
        <div 
          key={index} 
          className="group/item relative"
          style={{
            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
            width: "auto"
          }}
        >
          <div className="relative bg-white/40 dark:bg-neutral-800/20 md:backdrop-blur-sm p-4 rounded-xl border border-transparent hover:border-purple-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer">
            <div className={`absolute inset-0 bg-linear-to-br ${skill.color} opacity-0 group-hover/item:opacity-20 rounded-xl transition-opacity duration-300 blur-xl`}></div>
            
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={`/programsLan/${skill.file}`}
                    alt={skill.name}
                    fill
                    sizes="48px"
                    className="object-contain filter group-hover/item:drop-shadow-lg transition-all duration-300"
                  />
                </div>
              </div>
              
              <p className="text-xs font-medium text-gray-700 dark:text-gray-400 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-300 text-center">
                {skill.name}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProgramTools = () => {
const skills = [
  { name: 'Unity', file: 'Unityicon.png', color: 'from-slate-300 to-zinc-300 dark:from-gray-700 dark:to-gray-400' },
  { name: 'Next.js', file: 'NextJsicon.png', color: 'from-slate-300 to-sky-300 dark:from-slate-700 dark:to-gray-300' },
  { name: 'React', file: 'Reacticon.png', color: 'from-cyan-300 to-sky-300 dark:from-cyan-400 dark:to-blue-500' },
  { name: 'MySQL', file: 'MySQLicon.png', color: 'from-sky-300 to-amber-300 dark:from-blue-600 dark:to-orange-400' },
  { name: 'TailwindCSS', file: 'TailwindCSS.png', color: 'from-cyan-300 to-teal-300 dark:from-cyan-600 dark:to-cyan-400' },
  { name: 'Postman', file: 'postman.png', color: 'from-orange-300 to-amber-300 dark:from-yellow-600 dark:to-orange-400' },
  { name: 'Node.js', file: 'nodejs.png', color: 'from-emerald-300 to-green-300 dark:from-yellow-600 dark:to-green-400' },
  { name: 'Vite.js', file: 'Vite.png', color: 'from-violet-300 to-fuchsia-300 dark:from-violet-600 dark:to-pink-400' }
];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {skills.map((skill, index) => (
        <div 
          key={index} 
          className="group/item relative"
          style={{
            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
            width: "auto"
          }}
        >
          <div className="relative bg-white/40 dark:bg-neutral-800/20 md:backdrop-blur-sm p-4 rounded-xl border border-transparent hover:border-teal-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer">
            <div className={`absolute inset-0 bg-linear-to-br ${skill.color} opacity-0 group-hover/item:opacity-20 rounded-xl transition-opacity duration-300 blur-xl`}></div>
            
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={`/Tools/${skill.file}`}
                    alt={skill.name}
                    fill
                    sizes="48px"
                    className="object-contain filter group-hover/item:drop-shadow-lg transition-all duration-300"
                  />
                </div>
              </div>
              
              <p className="text-xs font-medium text-gray-700 dark:text-gray-400 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-300 text-center">
                {skill.name}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BoxSkill