import { FacebookIcon, GithubIcon, GmailIcon } from '../Svgicon'

export const Namecard = () => {
  return (
    <div className="card-vio-blu duration-400 hover:scale-[102.5%]">
        <div className="card_content">
            <div className="bg-gray-950 p-4 hover:shadow-lg rounded-xl hover:shadow-violet-500/50 duration-300 transition-all">
            <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-emerald-500 to-violet-600 bg-clip-text text-transparent">
                TAEMMMARIN TAPRAB
            </span>
            <p className="mt-4">
                <span className="text-xl font-semibold text-violet-500">
                Game • Website  | Developer : 
                </span>
                <br />
                <span className="">
                Creating digital experiences that make a difference. From concept to deployment,
                    I specialize in building modern, accessible web applications with a user-first design principles. I Intend to enroll in the faculty of
                    <span className="text-xl font-semibold text-teal-500"> {`"Computer Engineering"`} </span>
                passionate about emerging technologies.
                </span>
                <br />
                <span className="flex gap-4">
                    <a href="" target="_blank" className="opacity-70 hover:opacity-100 hover:scale-120 duration-300">
                        <FacebookIcon />
                    </a>
                    <a href="" target="_blank" className="opacity-70 hover:opacity-100 hover:scale-120 duration-300">
                        <GmailIcon />
                    </a>
                    <a href="https://github.com/KChronos000" target="_blank" className="opacity-70 hover:opacity-100 hover:scale-120 duration-300">
                        <GithubIcon />
                    </a>
                </span>
                </p>
            </div>
        </div>
    </div>
  )
}


