// import CardSkills from './CardSkills'

import BoxSkill from "./BoxSkill"

const SkillSection = () => {
  return (
    <main id='skills' className='lg:-mt-33 w-full relative z-10 flex flex-col justify-center lg:min-h-screen min-h-[60vh] items-center'>
      <section>
        <div className="flex justify-center items-center">
          <div className="mx-auto rounded-xl w-full">

            <div className="">
              <BoxSkill/>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  )
}

export default SkillSection