import React from 'react'
import Compartments from './Compiler'
import { Navdash } from './Navdash'

export const Compilerpage = () => {
  return (
    <div className="compilerpage">
        <div className="nav">
         <Navdash />
        </div>
        <div className="compartments">
            <Compartments />
        </div>
    </div>
  )
}
export default Compilerpage;
