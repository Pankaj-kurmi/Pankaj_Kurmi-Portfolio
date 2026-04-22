import React, { useRef } from "react";
import "./WhoAmI.scss";
import "./whoami.scss"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import caricature from "../../../assets/files/images/common/caricature.png";
import { aboutmeDescription } from "../../../constants/aboutmeContstants";
gsap.registerPlugin(ScrollTrigger);

const WhoAmI = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    const root = sectionRef.current;
    const text = textRef.current;

    if (!root || !text) return;

    
    const split = new SplitType(text, {
      types: "words",
      wordClass: "whoami-word",
      tagName: "span",
    });

  
    gsap.set(split.words, {
      opacity: 0,         
      yPercent: 100,
    });

   
    const tween = gsap.to(split.words, {
      opacity: 1,
      yPercent: 0,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    
    const refresh = () => ScrollTrigger.refresh();

    requestAnimationFrame(refresh);
    imgRef.current?.addEventListener("load", refresh, { once: true });

  
    return () => {
      imgRef.current?.removeEventListener("load", refresh);
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, { scope: sectionRef });

  return (
    <section className="whoami-section" id="aboutMe">
      <h1 className="whoami-sub-heading">01. About Me</h1>

      <div className="whoami-content" ref={sectionRef}>
        <div className="whoami-inner">
          <p className="split" ref={textRef}>
            {aboutmeDescription}
          </p>

          <img
  ref={imgRef}
  src={caricature}
  alt="About me illustration"
  className="whoami-image"
/>
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;