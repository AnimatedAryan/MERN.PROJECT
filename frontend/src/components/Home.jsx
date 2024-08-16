import React from 'react';
import { NavbarHome } from './NavbarHome';
import './Home.css'; // Import your CSS file

const Home = () => {
  return (
    <div className="home">
      <div className="nav">
        <NavbarHome />
      </div>
      <div className="flex-container">
        <div className="text-compartment">
          <h1>Welcome to Logic Loom</h1>
        </div>
        <div className="image-compartment">
          {/* Image will be added through CSS */}
        </div>
      </div>
    </div>
  );
};

export default Home;
