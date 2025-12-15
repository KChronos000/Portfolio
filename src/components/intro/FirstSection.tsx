import Image from 'next/image'
import { Namecard } from './Namecard'
// import { AFuckingBlub } from './AFuckingBlub'

const FirstSection = () => {
  return (
    <section className="w-full z-10 flex flex-col justify-center min-h-screen items-center">
        <div className="grid md:grid-cols-2 items-center justify-center gap-4 container p-3 lg:p-0">
            {/* <div className="w-full md:w-1/2 mx-auto text-right rounded-xl"> */}
              {/* <AFuckingBlub /> */}
            {/* </div> */}

            <div className="w-full mx-auto floating">
              <ProfilePic />
            </div>
            <div className="w-full mx-auto md:text-right floating-delay">
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
          src="/tools/Unityicon.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
    </div>
  )
}


export default FirstSection