import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer id='footer' className='w-full relative z-0 flex flex-col justify-center bg-gray-50 dark:bg-neutral-950 py-12 md:py-16 transition-colors duration-300'>
      <section className="w-full max-w-7xl mx-auto px-6">
        {/* Top gradient line */}
        <div className="w-full h-0.5 bg-linear-to-r from-transparent via-indigo-500/60 to-transparent mb-10 md:mb-12"></div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12">
          
          {/* About Section */}
          <div className="space-y-4 text-center md:text-start flex flex-col items-center md:items-start">
            <span className='text-xl font-bold bg-linear-to-r from-emerald-500 via-indigo-500 to-violet-500 dark:from-green-400 dark:via-indigo-400 dark:to-violet-500 bg-clip-text text-transparent'>
              Web&Game Developer
            </span>
            <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed max-w-sm">
              ผลงานของดิฉันเป็นการพัฒนาเว็บไซต์และเกมที่มีความทันสมัยและเข้าถึงได้ง่าย
            </p>
            
            {/* Tech Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
              <span className="px-3 py-1 text-xs rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300 shadow-xs">HTML</span>
              <span className="px-3 py-1 text-xs rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300 shadow-xs">CSS</span>
              <span className="px-3 py-1 text-xs rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300 shadow-xs">JavaScript</span>
            </div>

            {/* Login Button */}
            <div className="pt-2 w-full flex justify-center md:justify-start">
              <Link 
                href="/admin" 
                className="w-full max-w-50 md:w-45 px-6 py-2.5 text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white text-sm font-semibold rounded-full border-gray-300 dark:border-neutral-800 border bg-white/80 dark:bg-neutral-900/50 hover:bg-gray-100 dark:hover:bg-neutral-900 hover:shadow-lg hover:border-violet-400 dark:hover:border-neutral-700 shadow-violet-500/10 dark:hover:shadow-violet-900/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-start">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-neutral-200">Quick Links</h3>
            <ul className="flex flex-wrap justify-center md:flex-col gap-4 md:gap-2">
              {['home', 'skills', 'projects'].map((link) => (
                <li key={link}>
                  <Link href={`#${link}`} className="text-gray-600 dark:text-neutral-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 text-sm flex items-center justify-center md:justify-start gap-2 group py-1 px-2 md:p-0">
                    <span className="hidden md:inline-block w-0 group-hover:w-4 h-0.5 bg-teal-500 dark:bg-teal-400 transition-all duration-300"></span>
                    <span className="capitalize">{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4 text-center md:text-start">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-neutral-200">Connect</h3>
            <div className="flex flex-row md:flex-col justify-center items-center md:items-start gap-4 md:gap-3">
              
              {/* Facebook Link */}
              <Link 
                href="https://www.facebook.com/taemmarin.taprab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 flex items-center justify-center group-hover:border-violet-500 dark:group-hover:border-violet-400 transition-colors shrink-0 shadow-xs">
                  <svg className="w-5 h-5 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </div>
                <span className="text-sm hidden sm:inline-block md:inline-block">Facebook</span>
              </Link>

              {/* GitHub Link */}
              <Link 
                href="https://github.com/KChronos000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 flex items-center justify-center group-hover:border-violet-500 dark:group-hover:border-violet-400 transition-colors shrink-0 shadow-xs">
                  <svg className="w-5 h-5 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </div>
                <span className="text-sm hidden sm:inline-block md:inline-block">GitHub</span>
              </Link>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-neutral-800/80">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-gray-500 dark:text-neutral-500 text-xs md:text-sm">
              © {currentYear} TAEMMARIN TAPRAB. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs md:text-sm text-gray-500 dark:text-neutral-500">
              <Link href="#privacy" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300">Privacy Policy</Link>
              <Link href="#terms" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer