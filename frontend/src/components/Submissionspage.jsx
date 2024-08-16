import React from 'react'
import Submissiontable from './Submissiontable'
import Navdash from './Navdash';

export const Submissionspage = () => {
  return (
    <div className="subpage">
        <div className="nav">
         <Navdash />
        </div>
        <div className="page">
        <Submissiontable />
        </div>
    </div>
  )
}
export default Submissionspage;