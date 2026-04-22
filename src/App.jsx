import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";


import Warp from './components/Warp/Warp'
import Cursor from "./ui/cursor/Cursor";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";

import WhoAmI from "./components/Hero/WhoAmI/WhoAmI";
import Experience from "./components/Experience/Experience";
import TechStack from "./components/TechStack/TechStack";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const App = () => {
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
      normalizeScroll: true

    });
    ScrollTrigger.refresh();
    
  }, []);
  return (
    <>
      
     <Warp/>
     <Cursor/>
     <div id="smooth-wrapper">
      <NavBar/>
      <div id="smooth-content">
        <Hero/>
        <WhoAmI/>
        <Experience/>
        <TechStack/>

      </div>

     </div>

    </>
  )
}

export default App
