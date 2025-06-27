import React from 'react'
import { FacebookIcon, GithubIcon, GmailIcon } from '../Svgicon'

export const Namecard = () => {
  return (
    <div className="card">
        <div className="card_content">
            <div className="bg-gray-950 p-4 hover:shadow-lg rounded-xl hover:shadow-teal-500/50 duration-300 transition-all">
            <span className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-green-500 to-violet-500 bg-clip-text text-transparent">
                TAEMMMARIN TAPRAB
            </span>
            <p className="mt-4">
                <span className="text-xl font-semibold text-teal-500">
                Web Developer | UX/UI Designer : 
                </span>
                <br />
                <span className="opacity-80">
                Creating digital experiences that make a difference. From concept to deployment,
                    I specialize in building modern, accessible web applications with a user-first design principles. I Intend to enroll in the faculty of
                <span className="text-xl font-semibold text-teal-500"> "Computer Engineering" </span>
                passionate about emerging technologies.
                </span>
                <br />
                <span className="flex gap-4">
                    <a href="" target="_blank" className="hover:scale-120 duration-300">
                        <FacebookIcon />
                    </a>
                    <a href="" target="_blank" className="hover:scale-120 duration-300">
                        <GmailIcon />
                    </a>
                    <a href="https://github.com/KChronos000" target="_blank" className="hover:scale-120 duration-300">
                        <GithubIcon />
                    </a>
                </span>
                </p>
            </div>
        </div>
    </div>
  )
}


