import CardSkills from './CardSkills'

const SkillSection = () => {
  return (
    <main id='skills' className='bg-neutral-900 w-full relative z-10 flex flex-col justify-center min-h-screen items-center '>
      <section className="">
        <div className="flex justify-center items-center">
          <div className="mx-auto rounded-xl floating w-full">
            <CardSkills />
          </div>
        </div>
      </section>
    </main>
  )
}

export default SkillSection