import React, { useRef, useEffect } from "react";
import "./TechStack.scss";

// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import reactIcon from "../../assets/files/images/tech-icons/reactjsIcon.jpg";
import htmlIcon from "../../assets/files/images/tech-icons/htmlIcon.jpg";
import cssIcon from "../../assets/files/images/tech-icons/cssIcon.svg.png"; // ⚠️ fix extension if needed
import jsIcon from "../../assets/files/images/tech-icons/javascriptIcon.jpg";
import tailwindIcon from "../../assets/files/images/tech-icons/tailwindIcon.jpg";
import gsapIcon from "../../assets/files/images/tech-icons/gsapIcon.jpg";

import javaIcon from "../../assets/files/images/tech-icons/javaIcon.jpg";
import springIcon from "../../assets/files/images/tech-icons/springIcon.jpg";
import apiIcon from "../../assets/files/images/tech-icons/apiIcon.svg.png"; // ⚠️ fix extension
import microservicesIcon from "../../assets/files/images/tech-icons/microservicesIcon.jpg";

import postgresIcon from "../../assets/files/images/tech-icons/postgresIcon.jpg";
import mongoIcon from "../../assets/files/images/tech-icons/mongoIcon.jpg";
import mysqlIcon from "../../assets/files/images/tech-icons/mysqlIcon.jpg";

const TECH_ICONS = {
  React: reactIcon,
  HTML: htmlIcon,
  CSS: cssIcon,
  JavaScript: jsIcon,
  Tailwind: tailwindIcon,
  GSAP: gsapIcon,
  Java: javaIcon,
  Spring: springIcon,
  API: apiIcon,
  Microservices: microservicesIcon,
  PostgreSQL: postgresIcon,
  MongoDB: mongoIcon,
  MySQL: mysqlIcon,
};

const techStack = Object.keys(TECH_ICONS);

export default function TechStack() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const worldRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const viewportEl = viewportRef.current;
    const worldEl = worldRef.current;

    if (!sectionEl || !viewportEl || !worldEl) return;

    const CONFIG = {
      zGap: 800,
      radiusX: 400,
      radiusY: 300,
      scrollDistance: 9000,
      velocityMultiplier: 0.0008,
      positionLerp: 0.05,
      velocityLerp: 0.08,
      introStagger: 0.22,
      introDuration: 0.9,
    };

    const items = [];
    let idx = 0;

    worldEl.innerHTML = "";

   
    techStack.forEach((tech) => {
      const el = document.createElement("div");
      el.className = "hs-item";

      const card = document.createElement("div");
      card.className = "hs-card";

      const iconSrc = TECH_ICONS[tech];
      const randId = Math.floor(Math.random() * 9999);

      card.innerHTML = `
        <div class="hs-card-header">
          <span class="hs-card-id">ID-${randId}</span>
          <div class="hs-dot"></div>
        </div>

        <h2>${tech}</h2>

        ${
          iconSrc
            ? `<img class="hs-tech-icon" src="${iconSrc}" alt="${tech}" />`
            : ""
        }

        <div class="hs-card-footer">
          <span>${(Math.random() * 100).toFixed(1)}MB</span>
        </div>
      `;

      el.appendChild(card);
      worldEl.appendChild(el);

      items.push({
        el,
        x: 0,
        y: 0,
        baseZ: -idx * CONFIG.zGap,
        introDelay: idx * CONFIG.introStagger,
      });

      idx++;
    });

   

    let target = 0;
    let current = 0;

    const velocity = { v: 0, target: 0 };
    const mouse = { x: 0, y: 0 };

   
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;

      viewportEl.style.setProperty("--x", `${e.clientX}px`);
      viewportEl.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("pointermove", handleMouseMove);

    
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionEl,
      start: "top top",
      end: `+=${CONFIG.scrollDistance}`,
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        target = self.progress * (techStack.length * CONFIG.zGap);
        velocity.target = self.getVelocity() * CONFIG.velocityMultiplier;
      },
    });

    
    const render = () => {
      current += (target - current) * CONFIG.positionLerp;
      velocity.v += (velocity.target - velocity.v) * CONFIG.velocityLerp;
      const elapsed = gsap.ticker.time;

      items.forEach((item, i) => {
        const z = item.baseZ + current;

        const float = Math.sin(gsap.ticker.time + i) * 8;
        const scale = 1 - Math.min(Math.abs(z) / 4000, 0.5);
        const introProgress = gsap.utils.clamp(
          0,
          1,
          (elapsed - item.introDelay) / CONFIG.introDuration
        );

        const blur = Math.min(Math.abs(velocity.v) * 32, 8);
        let opacity = 1;

if (z > 300) opacity = 0;
else if (z > 0) opacity = 1 - z / 300;
else if (z < -1000) opacity = 0;
else if (z < -300) opacity = 1 + z / 1000;

opacity = Math.max(0, Math.min(1, opacity));
        opacity *= introProgress;
        const introScale = gsap.utils.interpolate(0.9, 1, introProgress);

        item.el.style.transform = `
          translate3d(${item.x}px, ${item.y + float}px, ${z}px)
          translate(-50%, -50%)
          rotateY(${float * 2}deg)
          scale(${scale * introScale})
        `;

        item.el.style.filter = `blur(${blur}px)`;
        item.el.style.opacity = opacity;
      });

      const tiltX = mouse.y * 12 - velocity.v * 40;
      const tiltY = mouse.x * 18;

      worldEl.style.transform = `
        rotateX(${tiltX}deg)
        rotateY(${tiltY + current * 0.05}deg)
      `;
    };

    gsap.ticker.add(render);

   
    return () => {
      gsap.ticker.remove(render);
      scrollTrigger.kill();
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hs-section">
      <div className="hs-header">
        <p className="hs-kicker">03. TECH STACK</p>
        <h2 className="hs-title">TECHNICAL EXPERTISE</h2>
        <p className="hs-desc">A curated set of technologies I use</p>
      </div>

      <div ref={viewportRef} className="hs-viewport">
        <div ref={worldRef} className="hs-world" />
      </div>
    </section>
  );
}
