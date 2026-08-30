import Image from 'next/image'
import { Namecard } from './Namecard'

const FirstSection = () => {
  return (
    <section id='home' className="w-full relative z-10 flex flex-col justify-center min-h-screen items-center pt-24 sm:pt-0 px-4 md:px-8 py-12 lg:py-0 overflow-hidden">
      
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-[15%] left-[5%] -z-10 w-62.5 sm:w-100 h-62.5 sm:h-100 rounded-full bg-violet-600/10 dark:bg-violet-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[5%] -z-10 w-62.5 sm:w-100 h-62.5 sm:h-100 rounded-full bg-emerald-600/10 dark:bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 items-center justify-center gap-10 lg:gap-16 container max-w-6xl mx-auto">
        
        {/* Name / Bio Column */}
        <div className="w-full lg:col-span-7 order-2 lg:order-1 floating-delay">
          <Namecard />
        </div>

        {/* Profile Pic Column */}
        <div className="w-full lg:col-span-5 order-1 lg:order-2 flex justify-center fade-in-up" style={{ animationDelay: '350ms' }}>
          <div className="relative group max-w-70 sm:max-w-90 md:max-w-100 w-full aspect-square floating">
            
            {/* 1. Ambient Background Glow */}
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-violet-500 to-emerald-400 opacity-20 dark:opacity-40 blur-2xl group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>
            
            {/* 2. Simple Border Frame */}
            <div className="relative rounded-full p-1 bg-linear-to-tr from-violet-500 via-emerald-400 to-violet-500 w-full h-full shadow-lg">
              
              {/* 3. Image Box */}
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-neutral-900 overflow-hidden flex items-center justify-center relative">
                <Image
                  src="/me.webp"
                  width={400}
                  height={400}
                  alt="Picture of แทมมารีน ตาปราบ"
                  className="rounded-full object-cover w-full h-full scale-105 translate-y-2 group-hover:scale-110 transition-transform duration-500 dark:brightness-95"
                  priority
                />
              </div>

            </div>

            {/* Interactive Floating Badge */}
            <div className="absolute bottom-2 right-2 z-20 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-violet-300/60 dark:border-violet-500/30 rounded-full px-4 py-2 shadow-lg flex items-center gap-2 select-none hover:border-violet-400 transition-colors duration-300">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-100 tracking-wider">
                Hi 👋
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="fade-in-up absolute bottom-6 left-1/2 transform -translate-x-1/2 select-none" style={{ animationDelay: '700ms' }}>
        <div className="flex flex-col items-center gap-1.5 cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
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
            className="text-violet-500 dark:text-violet-400 animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>

    </section>
  )
}

export default FirstSection