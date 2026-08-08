import Image from 'next/image'
import React from 'react'

const BoxSkill = () => {
  return (
    <div>
      <div className="ml-4 md:ml-0 md:mb-10">
        <div className='flex items-center justify-center my-5 md:my-0'>
          <span className='text-shadow-lg text-shadow-gray-500 text-6xl lg:text-6xl font-bold mr-4'>
              <span className="md:hidden">{`<`}</span>
                {/* สำหรับหน้าจอใหญ่ */}
              <span className="hidden md:inline">✦</span>
          </span>
          <h2 className="bg-linear-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent uppercase font-bold text-6xl lg:text-6xl mb-4">
            SKILLS
            {/* <div className="w-50 h-1 rounded bg-white shadow shadow-gray-500 mt-3"></div> */}
          </h2>
            <span className='text-shadow-lg text-shadow-gray-500 text-6xl lg:text-6xl font-bold ml-4'>
              <span className="lg:hidden">{`/>`}</span>
                {/* สำหรับหน้าจอใหญ่ */}
              <span className="hidden lg:inline">✦</span>
            </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 justify-between gap-6 p-4 md:p-0">
        {/* Programming Languages Card */}
        <div className="
            bg-radial-[at_50%_75%] floating-400 mb:floating
            p-8 w-full 
            border border-purple-900 rounded-xl
            inset-shadow-sm inset-shadow-indigo-500
            shadow-xl/30 hover:shadow-violet-700
            transition-all inset-shadow-md
            to-indigo-900/35 hover:scale-105
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
            bg-radial-[at_50%_75%] floating-400-delay mb:floating-delay
            p-8 w-full 
            border border-cyan-900 rounded-xl
            inset-shadow-sm inset-shadow-teal-500 
            shadow-xl/30 hover:shadow-emerald-700
            transition-all 
            to-teal-900/35 hover:scale-105
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
    { name: "HTML", file: "HTMLicon.png", color: "from-orange-500 to-red-500" },
    { name: "CSS", file: "CSSicon.png", color: "from-blue-500 to-blue-600" },
    { name: "JavaScript", file: "Javascripticon.png", color: "from-yellow-400 to-yellow-500" },
    { name: "TypeScript", file: "Typescripticon.png", color: "from-blue-600 to-blue-700" },
    { name: "Python", file: "Pythonicon.png", color: "from-blue-400 to-yellow-400" },
    { name: "PHP", file: "PHPicon.png", color: "from-purple-500 to-indigo-600" },
    { name: "C#", file: "Csharpicon.png", color: "from-purple-600 to-pink-600" },
    { name: "C", file: "Cicon.png", color: "from-blue-500 to-blue-700" },
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
          {/* Card */}
          <div className="relative bg-neutral-800/20 backdrop-blur-sm p-4 rounded-xl hover:border-block border border-transparent hover:border-purple-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer">
            {/* Glow on hover */}
            <div className={`absolute inset-0 bg-linear-to-br ${skill.color} opacity-0 group-hover/item:opacity-20 rounded-xl transition-opacity duration-300 blur-xl`}></div>
            
            {/* Icon */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <Image
                  src={`/programsLan/${skill.file}`}
                  alt={skill.name}
                  width={48}
                  height={48}
                  style={{ width: 'auto', height: 'auto' }}
                  className="max-w-full max-h-full object-contain filter group-hover/item:drop-shadow-lg transition-all duration-300"
                />
              </div>
              
              {/* Name */}
              <p className="text-xs font-medium text-gray-400 group-hover/item:text-white transition-colors duration-300 text-center">
                {skill.name}
              </p>
            </div>

            {/* Progress bar effect on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProgramTools = () => {
  const skills = [
    { name: 'Unity', file: 'Unityicon.png', color: 'from-gray-700 to-gray-400' },
    { name: 'Next.js', file: 'NextJsicon.png', color: 'from-black to-gray-300' },
    { name: 'React', file: 'Reacticon.png', color: 'from-cyan-400 to-blue-500' },
    { name: 'MySQL', file: 'MySQLicon.png', color: 'from-blue-600 to-orange-400' },
    { name: 'TailwindCSS', file: 'TailwindCSS.png', color: 'from-cyan-600 to-cyan-400' },
    { name: 'Postman', file: 'postman.png', color: 'from-yellow-600 to-orange-400' },
    { name: 'Node.js', file: 'nodejs.png', color: 'from-yellow-600 to-green-400' }
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
          {/* Card */}
          <div className="relative bg-neutral-800/20 backdrop-blur-sm p-4 rounded-xl border border-transparent hover:border-teal-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer">
            {/* Glow on hover */}
            <div className={`absolute inset-0 bg-linear-to-br ${skill.color} opacity-0 group-hover/item:opacity-20 rounded-xl transition-opacity duration-300 blur-xl`}></div>
            
            {/* Icon */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <Image 
                  src={`/Tools/${skill.file}`} 
                  alt={skill.name}
                  width={48}
                  height={48}
                  style={{ width: 'auto', height: 'auto' }}
                  className="max-w-full max-h-full object-contain filter group-hover/item:drop-shadow-lg transition-all duration-300"
                />
              </div>
              
              {/* Name */}
              <p className="text-xs font-medium text-gray-400 group-hover/item:text-white transition-colors duration-300 text-center">
                {skill.name}
              </p>
            </div>

            {/* Progress bar effect on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BoxSkill