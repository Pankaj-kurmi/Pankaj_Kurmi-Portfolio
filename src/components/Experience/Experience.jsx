import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Experience.scss";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    type: "Experience",
    title: "Frontend Developer Intern",
    organization: "ABC Tech Pvt Ltd",
    duration: "Jan 2024 – Mar 2024",
    description:
      "Worked on building responsive user interfaces using React.js and improved UI performance.",
  },
  {
    type: "Experience",
    title: "Java Developer Intern",
    organization: "XYZ Solutions",
    duration: "Jun 2023 – Aug 2023",
    description:
      "Developed backend APIs using Spring Boot and integrated with MySQL database.",
  },
  {
    type: "Education",
    title: "B.Tech in Computer Science",
    organization: "RGPV University",
    duration: "2021 – 2025",
    description:
      "Currently pursuing Bachelor's degree with focus on software development and data structures.",
  },
  {
    type: "Education",
    title: "Higher Secondary (HSC)",
    organization: "MP Board",
    duration: "2020 – 2021",
    description:
      "Completed 12th with focus on PCM.",
  },
  {
    type: "Education",
    title: "Secondary School (SSC)",
    organization: "MP Board",
    duration: "2018 – 2019",
    description:
      "Completed 10th with strong academic performance.",
  },
];

export default function Experience() {
  const timelineRef = useRef(null);
  const lineFillRef = useRef(null);

  useGSAP(() => {
    const wrap = timelineRef.current;
    const items = gsap.utils.toArray(".tl-item", wrap);

    items.forEach((item) => {
      const card = item.querySelector(".tl-card");
      const dot = item.querySelector(".tl-dot");

      gsap.set(card, { opacity: 0.2, y: 60, filter: "blur(10px)" });
      gsap.set(dot, { scale: 0.8, opacity: 0.5 });
    });

    gsap.to(lineFillRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top 60%",
        end: "bottom 60%",
        scrub: true,
      },
    });

    items.forEach((item) => {
      const card = item.querySelector(".tl-card");
      const dot = item.querySelector(".tl-dot");

      ScrollTrigger.create({
        trigger: item,
        start: "top 60%",
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
          });
          gsap.to(dot, { scale: 1, opacity: 1 });
        },
      });
    });
  }, []);

  return (
    <section className="journey">
      {/* HERO */}
      <div className="journey-hero">
        <p className="journey-kicker">MY JOURNEY</p>
        <h2 className="journey-title">Experience & Education</h2>
        <p className="journey-sub">
          A timeline of my professional experience and academic background.
        </p>
      </div>

      {/* TIMELINE */}
      <div ref={timelineRef} className="timeline">
        <div className="timeline-line">
          <div className="timeline-line-bg"></div>
          <div ref={lineFillRef} className="timeline-line-fill"></div>
        </div>

        {data.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className={`tl-item ${isLeft ? "left" : "right"}`}
            >
              {/* LEFT SIDE */}
              <div className="tl-side tl-left">
                {isLeft && (
                  <div className="tl-card">
                    <div className="tl-date">{item.duration}</div>
                    <h3 className="tl-h">{item.title}</h3>
                    <div className="tl-org">{item.organization}</div>
                    <p className="tl-desc">{item.description}</p>
                  </div>
                )}
              </div>

              {/* CENTER DOT */}
              <div className="tl-center">
                <div className="tl-dot"></div>
              </div>

              {/* RIGHT SIDE */}
              <div className="tl-side tl-right">
                {!isLeft && (
                  <div className="tl-card">
                    <div className="tl-date">{item.duration}</div>
                    <h3 className="tl-h">{item.title}</h3>
                    <div className="tl-org">{item.organization}</div>
                    <p className="tl-desc">{item.description}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}