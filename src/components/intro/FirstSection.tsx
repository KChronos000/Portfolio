import { Namecard } from './Namecard'
// import { AFuckingBlub } from './AFuckingBlub'

const FirstSection = () => {
  return (
    <section className="w-full z-10 flex flex-col justify-center min-h-screen items-center">
        <div className="flex justify-between w-full max-w-10xl container">
            <div className="sm:w-1/2 mx-auto text-right rounded-xl">
              {/* <AFuckingBlub /> */}
            </div>

            <div className="sm:w-1/2 mx-auto text-right rounded-xl floating">
              <Namecard />
            </div>
        </div>
    </section>
  )
}

export default FirstSection