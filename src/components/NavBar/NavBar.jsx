import React, { useRef, useState, useEffect } from "react";
import { navLinks } from "../../constants/navbarConstants";

import "./NavBar.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NavBar = () => {
  const panelRef = useRef(null);
  const tl = useRef(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    if (!panelRef.current) return;

    gsap.set(panelRef.current, {
      height: 0,
      opacity: 0,
      y: -10,
      pointerEvents: "none"
    });

    tl.current = gsap.timeline({ paused: true })
      .to(panelRef.current, {
        height: "auto",
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power3.inOut"
      });
  }, { scope: panelRef });

  useEffect(() => {
    if (tl.current) {
      if (open) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [open]);

  const handleScroll = (e, target) => {
    e.preventDefault();
    setOpen(false); // Close menu on click
    gsap.to(window, { duration: 1, scrollTo: target, ease: "power3.inOut" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={(e) => handleScroll(e, "body")}>
          Portfolio.
        </div>
        
        <div className="desktop-links">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={(e) => handleScroll(e, `#${link.id}`)}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="menu-toggle" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </div>
      </div>

      <div className="mobile-panel" ref={panelRef}>
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} onClick={(e) => handleScroll(e, `#${link.id}`)}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;