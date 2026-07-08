import Image from 'next/image'
import { Namecard } from './Namecard'
// import { AFuckingBlub } from './AFuckingBlub'

const FirstSection = () => {
  return (
    <section id='#home' className="w-full z-10 flex flex-col justify-center lg:min-h-screen min-h-[70vh] items-center">
        <div className="grid md:grid-cols-2 items-center justify-center gap-4 container p-3 lg:p-0">
            {/* <div className="w-full md:w-1/2 mx-auto text-right rounded-xl"> */}
              {/* <AFuckingBlub /> */}
            {/* </div> */}

            <div className="relative w-full mx-auto floating md:m-0 m-8">
              <div className="absolute inset-0 -z-10 rounded-full bg-violet-500/30 blur-3xl scale-70"></div>                
                <div className="relative z-10">
                  <ProfilePic />
                </div>
              </div>
            <div className="w-full mx-auto floating-delay">
              <Namecard />
            </div>
        </div>
    </section>
  )
}


export const ProfilePic = () => {
  return (
    <div>
      <div className="">
        <Image
          src="/Myself.png"
          width={600}
          height={600}
          alt="Picture of the author"
        />
      </div>
    </div>
  )
}


export default FirstSection