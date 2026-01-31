// import React from 'react';
// import './App.css'; // For overall layout and z-index

// // Components
// import Navbar from './pages/Navbar';
// import ParticleNetwork from './pages/ParticleNetwork';
// import HomePage from './pages/HomePage';
// import AboutSection from './pages/AboutSection';

// function App() {
//   return (
//     <div className="App">
//       {/* 1. BACKGROUND LAYER */}
//       <ParticleNetwork /> 

//       {/* 2. FOREGROUND CONTENT */}
//       <div className="content-container">
//         <Navbar />

//         {/* Hero section (with “About Me ➜” button) */}
//         <HomePage />

//         {/* About section (this is where the button scrolls to) */}
//         <AboutSection />
//       </div>
//     </div>
//   );
// }

// export default App;




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./pages/Navbar";
// import HomePage from "./pages/HomePage";
// import AboutSection from "./pages/AboutSection";
// import SkillsSection from "./pages/SkillsSection";
// import ParticleNetwork from "./pages/ParticleNetwork";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* Background Layer */}
//         <ParticleNetwork />

//         {/* Foreground Layer */}
//         <div className="content-container">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/about" element={<AboutSection />} />
//             <Route path="/skills" element={<SkillsSection />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import Navbar from "./pages/Navbar";
import HeroSection from "./pages/HeroSection";
import AboutSection from "./pages/AboutSection";
import SkillsSection from "./pages/SkillsSection";
import ParticleNetwork from "./pages/ParticleNetwork";
import "./App.css";
import EducationSection from "./pages/Education Section";
import WorkAndExperienceSection from "./pages/WorkExperience";
import ProjectSection from "./pages/Project";
import ContactSection from "./pages/Contact";
import Footer from "./pages/ModernFooter";

function App() {
  return (
    
    <div className="App">
      {/* Background */}
      <ParticleNetwork />

      <Navbar />
      {/* Foreground */}
      <div className="content-container">
        <section id="home">
          <HeroSection />
        </section>
        <AboutSection />
        <SkillsSection />
        <EducationSection/>
        <ProjectSection/>
        <WorkAndExperienceSection/>
        
        <ContactSection/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
