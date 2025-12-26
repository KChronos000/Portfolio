import { FacebookIcon, GithubIcon, GmailIcon } from '../Svgicon'
import { useEffect, useState } from "react";

export const Namecard = () => {
  return (
    <div className="card-vio-blu duration-400 hover:scale-[102.5%]">
        <div className="card_content md:text-right">
            <div className="bg-gray-950 p-4 hover:shadow-lg rounded-xl hover:shadow-violet-500/50 duration-300 transition-all">
            {/* <div className=""> */}
               <Title/>
            {/* </div> */}
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
                    <a href="https://www.facebook.com/taemmarin.taprab" target="_blank" className="opacity-70 hover:opacity-100 hover:scale-120 duration-300">
                        <FacebookIcon />
                    </a>
                    <a href="mailto:damnwork186@gmail.com" target="_blank" className="opacity-70 hover:opacity-100 hover:scale-120 duration-300">
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



export default function Title() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");

    const update = () => setIsMobile(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const className =
    "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-linear-to-r from-emerald-500 to-violet-600 bg-clip-text text-transparent";

  return isMobile ? (
    <h1 className={className}>TAEMMMARIN TAPRAB</h1>
  ) : (
    <span className={className}>TAEMMMARIN TAPRAB</span>
  );
}
