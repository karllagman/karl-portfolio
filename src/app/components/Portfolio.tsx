'use client';

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Linkedin, Github, Mail, FileText } from "lucide-react";
import bgImage from "@/assets/pcb.png";

export default function Portfolio() {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const [showTop, setShowTop] = useState(false);
  const [yearsExperience, setYearsExperience] = useState(16);
  const [headerHeight, setHeaderHeight] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const startDate = new Date(2008, 10);
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    const monthDiff = now.getMonth() - startDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < startDate.getDate())) {
      years -= 1;
    }
    setYearsExperience(years);
  }, []);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const update = () => setHeaderHeight(header.offsetHeight);
    update(); // measure immediately

    // Recalculate on resize + font load/layout shifts
    window.addEventListener("resize", update);
    // Optional: re-measure after fonts/icons load
    const remeasureTimeout = setTimeout(update, 300);

    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(remeasureTimeout);
    };
  }, []);

  const getHeaderOffset = () => {
    const header = document.getElementById("site-header");
    return header ? header.offsetHeight + 16 : 96;
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref?.current) {
      const offset = headerHeight + 16; // 16px breathing room
      const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const bgUrl = bgImage;

  const experience = [
    {
      "company": "Manulife IT Delivery Center Asia, Inc.",
      "role": "Senior Software Engineer",
      "period": "April 2020 – Present",
      "summary": "Lead developer responsible for building, coding, testing, and maintaining high-quality software applications and APIs. Actively participates in Agile ceremonies, ensures rapid iteration, and drives technical improvements across teams and business units.",
      "responsibilities": [
        "Design, develop, and maintain APIs and backend services.",
        "Participate in Agile sprints and ceremonies.",
        "Translate business requirements into technical solutions.",
        "Conduct code reviews and ensure adherence to standards.",
        "Implement automated testing and continuous integration.",
        "Analyze and optimize application performance and stability.",
        "Research and adopt new tools and technologies."
      ],
      "technologies": [
        "Java", "Spring Boot", "Cosmos DB", "ASB", "AKS", "AI", "REST APIs", "Agile/Scrum", "CI/CD", "Git", "BitBucket", "JUnit", "Microservices", "Cloud Services"
      ]
    },
    {
      "company": "Yondu Inc.",
      "role": "Associate Manager – Software Engineer",
      "period": "November 2018 – March 2020",
      "summary": "Developed enterprise-level applications using Spring frameworks, implemented design patterns, and contributed to all stages of the software development life cycle. Managed APIs, testing, and integration with various databases and messaging services.",
      "responsibilities": [
        "Develop RESTful services and CRUD operations.",
        "Implement design patterns and best practices.",
        "Perform unit and integration testing using JUnit and Jenkins.",
        "Manage source code with Git and conduct peer code reviews.",
        "Document APIs with Swagger and support release cycles."
      ],
      "technologies": [
        "Java", "Spring MVC", "Spring Boot", "Spring DAO", "RabbitMQ", "REST APIs", "Swagger", "Postman", "JUnit", "Jenkins", "Cloud (PCF)", "Git", "AzureDB", "Redis", "HBase/Phoenix", "Hive"
      ]
    },
    {
      "company": "Collabera Technologies Private Limited, Inc.",
      "role": "Senior Software Engineer",
      "period": "August 2017 – November 2018",
      "summary": "Worked as a key developer providing support in software conceptualization, coding, testing, and performance improvements. Assisted in resolving technical issues and contributed to various project phases, from design to implementation.",
      "responsibilities": [
        "Assist in software design and coding based on specifications.",
        "Run tests and troubleshoot performance issues.",
        "Resolve technical problems and support development teams.",
        "Prepare and maintain technical documentation."
      ],
      "technologies": [
        "Java", "J2EE", "JSP", "Spring Framework", "Thymeleaf", "CSS", "JQuery", "Bootstrap", "SQL", "Version Control Systems", "Unit Testing Tools"
      ]
    },
    {
      "company": "Managed Uptime Services, Inc.",
      "role": "Java Developer",
      "period": "November 2008 – August 2017",
      "summary": "Full-stack Java developer responsible for end-to-end software development, integration, and user interface design. Provided mentorship to junior developers and acted as a consultant on multiple web-based and enterprise projects.",
      "responsibilities": [
        "Analyze requirements and design system features.",
        "Develop applications and integrate database solutions.",
        "Troubleshoot and resolve production issues.",
        "Prepare documentation and provide user support.",
        "Mentor junior developers and consult on web-based projects."
      ],
      "technologies": [
        "Java", "J2EE", "Java Swing", "JavaFX", "PHP", "JavaScript", "CSS", "SQL", "HTML", "SVN", "Hibernate"
      ]
    }
  ];

  const skills = ["Java/J2EE", "Spring Boot", "Microservices", "GraphQL", "REST/SOAP APIs", "Docker", "Kubernetes (AKS)", "CI/CD (Jenkins)", "OAuth2 & JWT", "Redis", "SQL Optimization", "Kibana", "New Relic", "Cloud (PCF)"];

  const defaultThumbnail = "https://static-cse.canva.com/blob/1808021/create_youtube-thumbnails_lead4x.1db8ba01.avif";
  const projects = [
    { name: "Loan Management System", description: "A lightweight and user-friendly web application to manage loans, clients, and payments — perfect for personal lending, microfinance, or small business use.", thumbnail: "/lms.PNG", github: "https://github.com/karllagman/app-lms-standalone", tech: ["Java", "Spring Boot", "JPA", "MySQL", "Thymeleaf", "JQuery", "Bootstrap"] },
    { name: "Portfolio Website", description: "A personal portfolio built with React, Tailwind CSS, and Next.js showcasing my experience and skills.", thumbnail: "/portfolio.PNG", link: "#", github: "https://github.com/karllagman/portfolio", tech: ["React", "Next.js", "Tailwind CSS"] }
  ];

  const fadeIn = { hidden: { opacity: 0, y: 10 }, visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.3 } }) };
  const iconHover = "transition-transform transform hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]";
  const buttonHover = "px-5 py-2 transition-all transform hover:scale-105 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_0_8px_rgba(34,211,238,0.6)] rounded-xl";
  const linkHover = "relative inline-block transition-transform transform hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.7)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left";
  const thumbnailHover = "transition-transform transform hover:scale-105 hover:shadow-xl border border-cyan-500/40";
  const pdfButtonStyle = "inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 animate-pulse";
  const topButtonStyle = "fixed bottom-10 right-10 z-50 inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold h-12 w-12 rounded-full shadow-md transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const thumbInitial = { opacity: 0, scale: 0.98 };
  const thumbWhileInView = { opacity: 1, scale: 1 };
  const thumbTransition = { duration: 0.4, ease: "easeOut" };
  const thumbViewport = { once: true, amount: 0.4 };

interface SectionHeadingProps {
  innerRef: React.RefObject<HTMLHeadingElement>;
  id: string;
  children: React.ReactNode;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ innerRef, id, children, className }) => (
  <h2 
    id={id} 
    ref={innerRef} 
    className={`text-3xl md:text-4xl font-bold mb-6 text-cyan-400 scroll-mt-32 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)] ${className || ''}`}
  >
    {children}
  </h2>
);


  return (
    <div className="relative bg-gray-900 text-gray-100 min-h-screen overflow-x-hidden font-[Calibri]" style={{ backgroundImage: `url(${bgUrl.src})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center', fontFamily: 'Calibri, sans-serif' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30 -z-10" />

      {/* Header */}
      <header id="site-header" className="bg-gray-800 text-center p-6 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-bold text-cyan-400">Karl Anthony Lagman</h1>
          <p className="text-lg">Senior Java Backend Engineer | {yearsExperience}+ Years Experience</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className={buttonHover} onClick={() => scrollToSection(aboutRef)}>About</Button>
            <Button className={buttonHover} onClick={() => scrollToSection(skillsRef)}>Skills</Button>
            <Button className={buttonHover} onClick={() => scrollToSection(experienceRef)}>Experience</Button>
            <Button className={buttonHover} onClick={() => scrollToSection(projectsRef)}>Projects</Button>
            <Button className={buttonHover} onClick={() => scrollToSection(contactRef)}>Contact</Button>
          </div>
          <div className="flex space-x-4 mt-2">
            <a href="mailto:karl.lagman@yahoo.com" aria-label="Email" className={`text-cyan-400 hover:text-cyan-300 ${iconHover}`}><Mail className="h-6 w-6" /></a>
            <a href="https://www.linkedin.com/in/karl-anthony-lagman-9305b613a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`text-cyan-400 hover:text-cyan-300 ${iconHover}`}><Linkedin className="h-6 w-6" /></a>
            <a href="https://github.com/karllagman" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`text-cyan-400 hover:text-cyan-300 ${iconHover}`}><Github className="h-6 w-6" /></a>
          </div>
        </div>
      </header>

      <div
        style={{ paddingTop: headerHeight ? headerHeight + 32 : 300 }} // fallback for SSR
        className="transition-all duration-300"
      > {/* Add padding to offset fixed header */}
        {/* About */}
        <motion.section initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl mx-auto p-6">
          <SectionHeading
            innerRef={aboutRef}
            id="about"
            className="mt-24 sm:mt-0"
          >About</SectionHeading>
          <Card className="bg-gray-800 p-6">
            <CardContent>
              <p className="text-lg">Seasoned Java/J2EE Backend Engineer with {yearsExperience}+ years of experience designing and delivering enterprise-grade, scalable, and high-performance applications. Expert in Spring Boot microservices, API integration, event-driven architecture, and database optimization.</p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Skills */}
        <motion.section initial="hidden" animate="visible" className="max-w-4xl mx-auto p-6">
          <SectionHeading innerRef={skillsRef} id="skills">Skills</SectionHeading>
          <Card className="bg-gray-800 p-6">
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <motion.span key={idx} custom={idx} variants={fadeIn} initial="hidden" animate="visible" className="bg-cyan-700 text-white px-3 py-1 rounded-full text-sm font-medium">{skill}</motion.span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Experience */}
        <motion.section initial="hidden" animate="visible" className="max-w-4xl mx-auto p-6">
          <SectionHeading innerRef={experienceRef} id="experience">Experience</SectionHeading>
          <div className="space-y-6">
            {experience.map((job, idx) => (
              <motion.div key={idx} custom={idx} variants={fadeIn} initial="hidden" animate="visible">
                <Card className="bg-gray-800 p-6">
                  <CardContent>
                    <h3 className="text-xl font-semibold">{job.role} – {job.company}</h3>
                    <p className="text-sm text-gray-400 mb-2">{job.period}</p>
                    {job.summary && <p className="mb-2 text-sm text-gray-300">{job.summary}</p>}
                    {job.responsibilities && (
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {job.responsibilities.map((resp, i) => (<li key={i}>{resp}</li>))}
                      </ul>
                    )}
                    {job.technologies && job.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.technologies.map((tech, i) => (
                          <span key={i} className="bg-cyan-700 text-white px-2 py-0.5 rounded-full text-xs">{tech}</span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section initial="hidden" animate="visible" className="max-w-4xl mx-auto p-6">
          <SectionHeading innerRef={projectsRef} id="projects">Projects</SectionHeading>
          <div className="space-y-6">
            {projects.map((project, idx) => {
              const projectHref = project.link || project.github || undefined;
              const ThumbWrapper = projectHref ? motion.a : motion.div;
              const thumbProps = projectHref ? { href: projectHref, target: "_blank", rel: "noopener noreferrer" } : {};
              const thumbnailSrc = project.thumbnail?.trim() ? project.thumbnail : defaultThumbnail;
              return (
                <motion.div key={idx} custom={idx} variants={fadeIn} initial="hidden" animate="visible">
                  <Card className="bg-gray-800 p-6">
                    <CardContent>
                      {thumbnailSrc && (
                        <div
                          onClick={() => handleImageClick(thumbnailSrc)}
                          className="cursor-pointer block mb-4"
                        >
                          <picture>
                            <source srcSet={thumbnailSrc} type="image/avif" />
                            <img
                              loading="lazy"
                              src={thumbnailSrc}
                              alt={`${project.name} thumbnail`}
                              className={`rounded-md w-full h-48 object-cover ${thumbnailHover}`}
                            />
                          </picture>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                      {project.tech && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.tech.map((tag, i) => (
                            <span key={i} className="bg-cyan-700 text-white px-2 py-0.5 rounded-full text-xs">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex space-x-4 mt-2">
                        {project.link && (<a href={project.link} className={`text-cyan-400 underline ${linkHover}`} target="_blank" rel="noopener noreferrer">View Project</a>)}
                        {project.github && (<a href={project.github} className={`text-cyan-400 underline ${linkHover}`} target="_blank" rel="noopener noreferrer">GitHub</a>)}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl mx-auto p-6">
          <SectionHeading innerRef={contactRef} id="contact">Contact</SectionHeading>
          <Card className="bg-gray-800 p-6">
            <CardContent className="text-center">
              <p>Email: <a className="text-cyan-400" href="mailto:karl.lagman@yahoo.com">karl.lagman@yahoo.com</a></p>
              <p>Phone: +63 906 066 9908</p>
              <div className="flex justify-center items-center space-x-6 mt-4">
                <a href="mailto:karl.lagman@yahoo.com" aria-label="Email" className={`text-cyan-400 hover:text-cyan-300 ${iconHover}`}><Mail className="h-8 w-8" /></a>
                <a href="https://www.linkedin.com/in/karl-anthony-lagman-9305b613a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`text-cyan-400 hover:text-cyan-300 ${iconHover}`}><Linkedin className="h-8 w-8" /></a>
                <a href="https://github.com/karllagman" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`text-cyan-400 hover:text-cyan-300 ${iconHover}`}><Github className="h-8 w-8" /></a>
              </div>
              <div className="mt-6 text-sm text-gray-300">
                <a href="https://github.com/karllagman/karl-portfolio/tree/master/public/karl_lagman_cv.pdf" target="_blank" rel="noopener noreferrer" className={pdfButtonStyle}>
                  <FileText className="h-5 w-5" /> <span>View PDF Resume</span>
                </a>
                <p className="mt-2 text-xs text-gray-400">PDF ~1.2 MB • Right-click and choose &quot;Save As&quot; to download.</p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      {showTop && (<button onClick={scrollToTop} className={topButtonStyle} aria-label="Back to top">↑</button>)}


      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // clicking the backdrop closes it
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // prevents closing when clicking the image or close button
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Project"
              className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );

}
