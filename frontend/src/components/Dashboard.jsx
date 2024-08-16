import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Adjust the import path
import { Navdash } from './Navdash';
import './Home.css';


const Dashboard = () => {
  const { auth } = useContext(AuthContext); // Access auth from context

  if (!auth?.loggedIn) {
    console.log("PLEASE LOGIN ");
    return <div>Please log in</div>;
  }
  return(
   <div className="dashboard-container">
      <Navdash />
      <div className="full-background">
        <div className="right-column">
          <div className="tagline">
            Weave your Logic into Code with LogicLoom
          </div>
        </div>
        <div className="left-column">
          <p className="text-white"></p>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
