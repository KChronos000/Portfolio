import React from 'react'
import { Bulb2 } from '../Svgicon'

export const AFuckingBlub = () => {
  return (
    <div className="">
      <div className='flex flex-col'>
            <div className="relative floating-700">
              <div className="absolute top-[15%] left-[46.3%] transform rotate-180 z-5 
                            text-yellow-300 hover:text-yellow-300 
                            transition-all duration-300 
                            drop-shadow-[0_0_20px_rgba(255,255,0,0.8)]
                            hover:drop-shadow-[0_0_30px_rgba(255,255,0,1)]
                            animate-pulse">
              <Bulb2 />
            </div>
            
            {/* Additional glow effect */}
            <div className="absolute top-[15%] left-[46.3%] transform rotate-180 z-5
                            text-yellow-200 opacity-30
                            blur-sm scale-110 pointer-events-none">
              <Bulb2 />
            </div>
          <div className="border-1 border-white rounded-full h-64 absolute top-[-246px] left-[50.8%]">
            </div>
          </div>
      </div>
    </div>
  )
}