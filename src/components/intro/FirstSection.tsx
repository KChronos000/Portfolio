import Image from 'next/image'
import { Namecard } from './Namecard'

const FirstSection = () => {
  return (
    <section id='home' className="w-full relative z-10 flex flex-col justify-center min-h-screen items-center px-4 md:px-8 py-12 lg:py-0 overflow-hidden">
      
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-[15%] left-[5%] -z-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-violet-600/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[5%] -z-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 items-center justify-center gap-10 lg:gap-16 container max-w-6xl mx-auto">
        
        {/* Name / Bio Column (Left on Desktop, Bottom on Mobile) */}
        <div className="w-full lg:col-span-7 order-2 lg:order-1 floating-delay">
          <Namecard />
        </div>

        {/* Profile Pic Column (Right on Desktop, Top on Mobile) */}
        <div className="w-full lg:col-span-5 order-1 lg:order-2 flex justify-center fade-in-up" style={{ animationDelay: '350ms' }}>
          <div className="relative group max-w-[280px] sm:max-w-[360px] md:max-w-[400px] w-full aspect-square floating">
            
            {/* Ambient pulsing glow behind the picture */}
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-violet-600 via-teal-500 to-indigo-600 opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-700 scale-95 group-hover:scale-105 pointer-events-none"></div>
            
            {/* Soft border ring */}
            <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-violet-500 via-fuchsia-500 to-emerald-500 opacity-60 blur-[3px] group-hover:opacity-100 transition-all duration-500 animate-spin-slow"></div>
            
            {/* Image Container with deep shadow */}
            <div className="relative rounded-full p-1.5 bg-black overflow-hidden border border-white/10 w-full h-full flex items-center justify-center shadow-2xl shadow-violet-950/40">
              <Image
                src="/Myself.png"
                width={400}
                height={400}
                alt="Picture of แทมมารีน ตาปราบ"
                className="rounded-full object-cover w-full h-full transform hover:scale-105 transition-all duration-700"
                priority
              />
            </div>

            {/* Interactive Floating Badge */}
            <div className="absolute -bottom-2 -right-2 bg-neutral-900/90 backdrop-blur-md border border-violet-500/30 rounded-xl px-4 py-2.5 shadow-xl shadow-black/50 flex items-center gap-2.5 floating-delay select-none hover:border-violet-400 transition-colors duration-300">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-100 tracking-wider">
                🎓 CPE Aspirant
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Elegant Scroll Down Indicator */}
      <div className="fade-in-up absolute bottom-6 left-1/2 transform -translate-x-1/2 select-none" style={{ animationDelay: '700ms' }}>
        <div className="flex flex-col items-center gap-1.5 cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors">
            Scroll to explore
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-violet-400 animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>

    </section>
  )
}

export default FirstSection
