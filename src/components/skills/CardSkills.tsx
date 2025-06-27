import React from 'react'
import { PHPIcon, PhythonIcon, TypeScriptIcon } from '../Svgicon'

export const CardSkills = () => {
  return (
    <div className=" flex flex-col gap-4">
        <div className="containerSkill">
            <div data-text="Phython"  className="glass">
                <PhythonIcon />
            </div>

            <div data-text="PHP" className="glass">
                <PHPIcon />
            </div>

            <div data-text="TypeScript"  className="glass">
                <TypeScriptIcon />
            </div>
        </div>
        <div className="containerSkill">
            <div data-text="Phython"  className="glass">
                <PhythonIcon />
            </div>

            <div data-text="PHP" className="glass">
                <PHPIcon />
            </div>

            <div data-text="TypeScript"  className="glass">
                <TypeScriptIcon />
            </div>
        </div>
    </div>
  )
}
