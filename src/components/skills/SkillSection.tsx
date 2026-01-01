// import CardSkills from './CardSkills'

import BoxSkill from "./BoxSkill"

const SkillSection = () => {
  return (
    <main id='skills' className=' w-full relative z-10 flex flex-col justify-center min-h-screen items-center'>
      <section>
        <div className="flex justify-center items-center">
          <div className="mx-auto rounded-xl w-full">

            <div className="">
              <BoxSkill/>
            </div>





            {/* <div className="text-content">
              <div className="">
                <h2>programming language</h2> 
                <div className="">
                  
                </div>
              </div>
            </div>
            <div className="floating">
              <CardSkills />
            </div> */}
            
          </div>
        </div>
      </section>
    </main>
  )
}

export default SkillSection