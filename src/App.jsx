import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 1, title: "Serafina", tech: "React, Custom CSS", shortDesc: "Luxury shopping platform.", desc: "Engineered a high-performance e-commerce web application tailored for luxury retail. Developed smooth user interactions, robust state management, and a scalable architecture to handle complex user and product data.", image: "/images/serafina.jpg", link: "https://serafina-app.vercel.app/" },
  { id: 2, title: "Infrastructure Assassin", tech: "Node.js, Llama 3.2, NLP", shortDesc: "Automated IT Cost & Security Optimization.", desc: "Architected a full-stack auditing application to automate server cost-optimization and flag vulnerabilities. Orchestrated a privacy-first AI pipeline integrating a local Meta Llama 3.2 LLM with a deterministic NLP fallback for 100% uptime, enforcing zero-trust RBAC.", image: "/images/infra-assassin.jpg", link: "https://github.com/Ipshita-Das" },
  { id: 3, title: "CollabBoard", tech: "MERN, JWT, REST APIs", shortDesc: "Custom task management engine.", desc: "Developed a secure, full-stack Kanban workspace featuring real-time problem reporting and interactive analytics. Engineered robust backend security using HTTP-only JWT authentication and strict Role-Based Access Control across all API routes.", image: "/images/collab-board.jpg", link: "https://collab-board-azure.vercel.app/" },
  { id: 4, title: "Agro Guard", tech: "IoT, Random Forest", shortDesc: "Smart crop preservation framework.", desc: "Engineered a smart IoT monitoring system using an Arduino UNO and Random Forest algorithm, achieving 92.5% classification accuracy to detect structural cracks and humidity. The web dashboard provides real-time tracking and automated hazard alerts to prevent crop loss.", image: "/images/agro-guard.jpg", link: "https://pandadsgn.github.io/Agro-Guard/" },
  { id: 5, title: "Household Energy Consumption Optimization", tech: "IoT, ML, React", shortDesc: "Household consumption optimization.", desc: "Integrated real-time IoT sensors with machine learning models to combat wasteful electricity consumption, achieving 97.2% energy classification accuracy. Delivered a comprehensive smart home dashboard for live monitoring and predictive billing.", image: "/images/energy-opt.jpg", link: "https://house-energy-consumption-optimization-fhwo3ngba6f4mruphmv5rq.streamlit.app/" }
];

const achievements = [
  { title: "Vice Chancellor's Award", role: "Overall Performance", date: "2025", desc: "Honored with the prestigious Vice Chancellor's award for exceptional academic excellence and extra-curricular achievements." },
  { title: "President", role: "CSI Student Chapter", date: "2026 - Present", desc: "Directing student initiatives, organizing large-scale computing events, and managing high-stakes technical environments for the university." },
  { title: "1st Place, Algotrix", role: "Project Competition", date: "2025", desc: "Secured first place in the Departmental Project Competition for the Household Energy Consumption Optimization architecture." },
  { title: "Manager", role: "CSI Student Chapter", date: "2024 - 2025", desc: "Orchestrated chapter operations, fostered competitive innovation, and coordinated logistics for multiple events." }
];

const certifications = [
  { id: 1, title: "Google AI", issuer: "Google", year: "2026", image: "/images/google-ai.jpg" },
  { id: 2, title: "Foundations of Data Science", issuer: "Google", year: "2026", image: "/images/data-science.jpg" },
  { id: 3, title: "Transforming Business with AI Agents", issuer: "PMI", year: "2025", image: "/images/pmi-ai.jpg" },
  { id: 4, title: "Cyber Security Fundamentals", issuer: "University of London", year: "2025", image: "/images/cyber-sec.jpg" }
];

const publications = [
  { title: "Household Energy Consumption Optimization", publisher: "ICAGEC", year: "2026" },
  { title: "AgroGuard: A Novel IoT-Enabled Framework for Smart Crop Preservation in Grain Silos", publisher: "UEMGREEN", year: "2026" }
];

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeCert, setActiveCert] = useState(null);
  const [isNightEdition, setIsNightEdition] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useEffect(() => {
    if (isNightEdition) {
      document.body.classList.add('night-edition');
    } else {
      document.body.classList.remove('night-edition');
    }
  }, [isNightEdition]);

  const degreesPerItem = 360 / projects.length;
  const spinWheel = (direction) => {
    setRotation(prev => prev + (direction === 'next' ? -degreesPerItem : degreesPerItem));
    setActiveProject(null); 
  };

  return (
    <div className="w-full min-h-screen px-4 md:px-12 py-8 max-w-360 mx-auto overflow-hidden transition-colors duration-700">
      
      {/* FOOLPROOF HOVER FIX: This ensures the grayscale filter is always removed on hover */}
      <style>{`
        .filtered-img { filter: var(--img-filter); transition: filter 0.5s ease; }
        .group:hover .filtered-img { filter: none !important; }
      `}</style>

      {/* HEADER WITH TOGGLE */}
      <div className="flex flex-wrap justify-between items-center border-b-2 border-t-2 border-(--text-color) py-2 mb-2 text-[10px] md:text-xs uppercase tracking-widest font-semibold gap-2">
        <span>Issue No. 01</span>
        <button 
          onClick={() => setIsNightEdition(!isNightEdition)}
          className="text-center font-bold hover:text-(--accent-red) transition-colors border border-dashed border-(--text-color) px-4 py-1"
        >
          {isNightEdition ? "☼ Switch to Morning Edition" : "☾ Switch to Night Edition"}
        </button>
        <span>June 2026</span>
      </div>
      <div className="border-b-4 border-(--text-color) mb-12 transition-colors duration-700"></div>

      {/* MASTHEAD */}
      <header className="relative mb-16 text-center flex flex-col items-center">

        <motion.h1 
          className="text-6xl sm:text-8xl md:text-[11rem] font-black editorial-font cursor-default uppercase tracking-tighter leading-[0.8] text-(--accent-red) flex flex-wrap justify-center transition-colors duration-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {"Ipshita Das".split("").map((char, index) => {
            if (char === " ") return <span key={index} className="w-4 md:w-8"></span>;
            return <span key={index} className="hollow-text-hover inline-block">{char}</span>;
          })}
        </motion.h1>
        <p className="text-xl md:text-3xl editorial-font italic mt-6 z-10 bg-(--bg-color) px-6 text-(--text-color) transition-colors duration-700">
          Bridging Business & Technical Execution
        </p>
      </header>

      {/* INFINITE SCROLLING TECH MARQUEE */}
      <div className="w-full border-y-4 border-(--text-color) py-3 overflow-hidden bg-(--text-color) text-(--bg-color) flex whitespace-nowrap mb-16 transition-colors duration-700">
        <motion.div
          className="flex gap-12 items-center text-lg md:text-xl font-black uppercase tracking-widest editorial-font"
          animate={{ x: [0, -1450] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          <span className="text-(--accent-red)">+++ TECHNICAL SKILLS</span>
          <span>• PYTHON</span>
          <span>• JAVA</span>
          <span>• JAVASCRIPT</span>
          <span>• MERN STACK</span>
          <span>• XGBOOST</span>
          <span>• RANDOM FOREST</span>
          <span>• SCIKIT-LEARN</span>
          <span>• MONGODB</span>
          <span>• REST APIS</span>
          <span>• GIT</span>
          <span className="text-(--accent-red) ml-12">+++ TECHNICAL SKILLS</span>
          <span>• PYTHON</span>
          <span>• JAVA</span>
          <span>• JAVASCRIPT</span>
          <span>• MERN STACK</span>
          <span>• XGBOOST</span>
          <span>• RANDOM FOREST</span>
          <span>• SCIKIT-LEARN</span>
          <span>• MONGODB</span>
          <span>• REST APIS</span>
          <span>• GIT</span>
        </motion.div>
      </div>

      <div className="star-divider overflow-hidden hidden md:block"></div>

      {/* WEB DEVELOPER & BUSINESS-FOCUSED ABOUT SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-y-2 border-(--text-color) py-12 mb-24 max-w-7xl mx-auto transition-colors duration-700">
        <div className="md:col-span-5 relative group">
          <img 
            src="/images/myImage3.jpeg" 
            alt="Ipshita Das" 
            className="filtered-img w-full h-full object-cover border border-(--text-color) shadow-[8px_8px_0px_0px_var(--text-color)] transition-all duration-700" 
          />
        </div>
        <div className="md:col-span-7 flex flex-col justify-center px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl editorial-font mb-6 font-bold uppercase text-(--accent-red) border-b border-(--text-color) pb-2 transition-colors duration-700">The Engineering Brief</h2>
          <div className="text-sm md:text-base leading-relaxed text-(--text-color) opacity-90 columns-1 md:columns-2 gap-8 drop-cap">
            <p className="mb-4 text-justify">
              As a Computer Science and Engineering undergraduate specializing in Artificial Intelligence & Machine Learning at the Institute of Engineering and Management, I am driven to build full-stack products that bridge the critical gap between business strategy and technical execution. With a strong foundation in comprehensive web development, I focus on creating intuitive, resilient applications that handle complex data while delivering a seamless user experience.
            </p>
            <p className="text-justify">
              My academic journey is grounded in maintaining high technical standards and representing my cohort as Class Representative. I specialize in translating complex business requirements into scalable digital products whether that means integrating machine learning models for smarter insights or engineering secure RESTful APIs to power the core application. From managing databases to developing dynamic web interfaces, the goal remains the same: precise execution, measurable business impact, and seamless innovation.
            </p>
          </div>
        </div>
      </section>

      {/* THE ORBITING GALLERY */}
      <section className="mb-32 relative flex flex-col items-center w-full max-w-7xl mx-auto">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block text-(--text-color) opacity-5 font-black text-8xl uppercase tracking-widest whitespace-nowrap editorial-font pointer-events-none">
          Archive 26
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 hidden lg:block text-(--text-color) opacity-5 font-black text-8xl uppercase tracking-widest whitespace-nowrap editorial-font pointer-events-none">
          Selected
        </div>

        <h2 className="text-5xl md:text-7xl editorial-font mb-4 font-black uppercase text-center border-y-4 border-(--text-color) py-4 w-full transition-colors duration-700">
          Featured Works
        </h2>
        <p className="text-center italic editorial-font text-xl mb-4 mt-4 text-(--accent-red) transition-colors duration-700">
          Spin the gallery. Click to unfold the documentation.
        </p>

        <div className="relative w-full h-150 md:h-187.5 flex flex-col items-center justify-center mt-8">
          <div className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-(--text-color) pb-2 mb-2 transition-colors duration-700">Vol. 1</span>
            <h3 className="text-4xl md:text-5xl editorial-font italic text-(--accent-red) leading-none transition-colors duration-700">The <br/> Portfolio</h3>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold border-t border-(--text-color) pt-2 mt-2 transition-colors duration-700">Edition</span>
          </div>

          <motion.div 
            className="absolute z-20 w-full h-full flex items-center justify-center"
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 45, damping: 14 }}
          >
            {projects.map((proj, index) => {
              const angle = (index * degreesPerItem) * (Math.PI / 180);
              const radius = isDesktop ? 280 : 160; 
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const cardWidth = isDesktop ? 220 : 140;
              const cardHeight = isDesktop ? 300 : 200;

              return (
                <motion.div 
                  key={proj.id}
                  className="absolute bg-(--bg-color) p-3 border-4 md:border-[6px] border-(--text-color) shadow-2xl cursor-pointer group flex flex-col transition-colors duration-700"
                  style={{ width: cardWidth, height: cardHeight, left: `calc(50% + ${x}px - ${cardWidth / 2}px)`, top: `calc(50% + ${y}px - ${cardHeight / 2}px)` }}
                  animate={{ rotate: -rotation }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setActiveProject(activeProject === proj.id ? null : proj.id)}
                >
                  <div className="w-full h-3/4 overflow-hidden border-2 border-(--text-color) bg-(--bg-color) p-1 flex items-center justify-center transition-colors duration-700">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="filtered-img w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="h-1/4 w-full flex items-center justify-center pt-2 px-1">
                    <h4 className="text-[10px] md:text-sm editorial-font font-black uppercase text-center leading-tight">
                      {proj.title}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="absolute bottom-0 md:-bottom-12 z-30 flex gap-8 bg-(--bg-color) px-8 py-2 rounded-full border-[3px] border-(--text-color) shadow-xl transition-colors duration-700">
            <button onClick={() => spinWheel('prev')} className="text-4xl hover:text-(--accent-red) transition-colors editorial-font leading-none pb-2">←</button>
            <button onClick={() => spinWheel('next')} className="text-4xl hover:text-(--accent-red) transition-colors editorial-font leading-none pb-2">→</button>
          </div>
        </div>

        <div className="mt-16 md:mt-24 w-full flex justify-center z-40 relative">
          <AnimatePresence>
            {activeProject && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                className="w-full max-w-5xl overflow-hidden border-y-8 border-double border-(--text-color) bg-(--bg-color) shadow-2xl transition-colors duration-700"
              >
                {projects.filter(p => p.id === activeProject).map(proj => (
                  <div key={proj.id} className="grid md:grid-cols-2">
                    <div className="p-8 md:p-12 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-(--text-color) transition-colors duration-700">
                      <h3 className="text-4xl md:text-5xl editorial-font font-black mb-4 uppercase leading-none text-(--accent-red)">{proj.title}</h3>
                      <p className="text-xs font-bold tracking-[0.2em] mb-8 text-(--text-color) border-b-2 border-(--text-color) pb-4 transition-colors duration-700">TECH: {proj.tech}</p>
                      <p className="text-base text-(--text-color) opacity-90 leading-relaxed font-serif text-justify drop-cap mb-8 transition-colors duration-700">
                        {proj.desc}
                      </p>
                      <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block text-center border-2 border-(--text-color) py-3 px-6 text-sm uppercase tracking-[0.2em] font-bold hover:bg-(--text-color) hover:text-(--bg-color) transition-all"
                      >
                        View Project
                      </a>
                    </div>
                    {/* The expanded image has NO filter classes, guaranteeing it is always full color */}
                    <div className="p-4 bg-(--text-color) transition-colors duration-700 flex items-center justify-center">
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        className="w-full h-full object-contain bg-(--bg-color) border-4 border-(--bg-color) transition-all duration-700 rounded-sm" 
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* GRID: CERTIFICATIONS & LEADERSHIP */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t-[6px] border-double border-(--text-color) mt-16 max-w-7xl mx-auto transition-colors duration-700">
        
        {/* CREDENTIALS & PUBLICATIONS */}
        <section className="p-8 md:p-12 md:border-r-[6px] md:border-double border-(--text-color) transition-colors duration-700">
          
          <h2 className="text-2xl md:text-3xl editorial-font mb-8 font-bold uppercase text-center border-b border-(--text-color) pb-4 transition-colors duration-700">Credentials</h2>
          <ul className="space-y-6 mb-16">
            {certifications.map((cert) => (
              <li 
                key={cert.id} 
                className="flex flex-col group cursor-pointer border-b border-dashed border-gray-400 pb-4 hover:bg-(--text-color) hover:text-(--bg-color) transition-colors duration-300 p-2 -mx-2 rounded-sm"
                onClick={() => setActiveCert(activeCert === cert.id ? null : cert.id)}
              >
                <div className="flex justify-between items-baseline mb-1 pointer-events-none">
                  <h3 className="text-base md:text-lg font-bold editorial-font group-hover:text-(--bg-color) transition-colors">{cert.title}</h3>
                  <span className="text-sm font-black editorial-font ml-4">{cert.year}</span>
                </div>
                <p className="text-[10px] md:text-xs tracking-widest uppercase opacity-80 pointer-events-none mt-1">
                  {cert.issuer}
                  <span className="ml-3 italic font-bold text-(--accent-red) group-hover:text-(--bg-color) transition-colors">
                    [ Click to View Document ]
                  </span>
                </p>

                <AnimatePresence>
                  {activeCert === cert.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-6"
                    >
                      {/* The certificate image has NO filter classes, guaranteeing it is always full color */}
                      <img 
                        src={cert.image} 
                        alt={cert.title} 
                        className="w-full h-auto object-contain bg-(--bg-color) border-4 border-(--text-color) group-hover:border-(--bg-color) p-1 shadow-xl transition-all duration-700" 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl editorial-font mb-8 font-bold uppercase text-center border-b border-(--text-color) pb-4 transition-colors duration-700">Publications</h2>
          <ul className="space-y-6">
            {publications.map((pub, idx) => (
              <li key={idx} className="flex flex-col border-b border-dashed border-gray-400 pb-4">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-sm md:text-base font-bold editorial-font leading-snug pr-4">{pub.title}</h3>
                  <span className="text-sm font-black editorial-font border-l border-(--text-color) pl-4">{pub.year}</span>
                </div>
                <p className="text-[10px] md:text-xs tracking-widest uppercase opacity-70 italic text-(--accent-red)">{pub.publisher}</p>
              </li>
            ))}
          </ul>

        </section>

        {/* LEADERSHIP & ACHIEVEMENTS */}
        <section className="bg-(--text-color) text-(--bg-color) p-8 md:p-12 relative overflow-hidden transition-colors duration-700">
          <h2 className="text-2xl md:text-3xl editorial-font mb-8 font-bold uppercase text-center border-b border-(--bg-color) border-opacity-30 pb-4 transition-colors duration-700">Leadership & Achievements</h2>
          
          <div className="min-h-55 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center w-full"
              >
                <h3 className="text-3xl md:text-4xl editorial-font mb-4 italic text-(--bg-color)">{achievements[slideIndex].title}</h3>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-70 mb-6 font-semibold">
                  {achievements[slideIndex].role} — {achievements[slideIndex].date}
                </p>
                <p className="text-sm leading-relaxed opacity-90 max-w-sm mx-auto">{achievements[slideIndex].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-8 mt-4">
            <button onClick={() => setSlideIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1))} className="text-2xl hover:opacity-50 transition-colors editorial-font">←</button>
            <button onClick={() => setSlideIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1))} className="text-2xl hover:opacity-50 transition-colors editorial-font">→</button>
          </div>
        </section>
      </div>

      <div className="star-divider overflow-hidden mt-12 mb-16 hidden md:block max-w-7xl mx-auto"></div>

      {/* CLASSIFIEDS SECTION (Contact & Socials) */}
      <section className="max-w-7xl mx-auto border-t-8 border-double border-(--text-color) pt-8 mb-16 transition-colors duration-700">
        <h2 className="text-4xl editorial-font font-black uppercase text-center mb-8 tracking-widest text-(--text-color)">
          Let's Connect
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <a href="mailto:ipshitadas029@gmail.com" className="col-span-1 md:col-span-2 border-4 border-(--text-color) p-6 hover:bg-(--text-color) hover:text-(--bg-color) transition-colors duration-300 group">
            <h3 className="text-2xl font-black uppercase mb-2">Notice: Seeking Opportunities</h3>
            <p className="text-sm font-serif italic mb-4 opacity-90">Web Developer and AI engineer available for high-impact roles. Will trade robust full-stack architecture for a salary. Inquire within.</p>
            <p className="text-xs uppercase tracking-widest font-bold group-hover:underline">Contact via Email: ipshitadas029@gmail.com</p>
            <p className="text-xs uppercase tracking-widest font-bold mt-1 group-hover:underline">Direct Line: +91-7044222721</p>
          </a>

          <a href="https://linkedin.com/in/ipshita-das" target="_blank" rel="noopener noreferrer" className="col-span-1 border-4 border-(--text-color) p-6 flex flex-col justify-between hover:bg-(--text-color) hover:text-(--bg-color) transition-colors duration-300 group">
            <div>
              <h3 className="text-xl font-black uppercase mb-2 text-(--accent-red) group-hover:text-(--bg-color)">Available For A Discussion</h3>
              <p className="text-xs font-serif opacity-90">Let us discuss intelligent systems, full-stack builds, and scalable logic.</p>
            </div>
            <p className="text-xs font-bold uppercase mt-4 underline">Connect on LinkedIn</p>
          </a>

          <a href="https://github.com/Ipshita-Das" target="_blank" rel="noopener noreferrer" className="col-span-1 border-4 border-(--text-color) p-6 flex flex-col justify-center items-center text-center hover:bg-(--text-color) hover:text-(--bg-color) transition-colors duration-300">
            <h3 className="text-3xl editorial-font italic mb-2">View The Archives</h3>
            <p className="text-xs uppercase tracking-widest font-bold border-t border-(--text-color) pt-2 mt-2 w-full">Inspect GitHub</p>
          </a>
        </div>
      </section>

      <footer className="border-t border-(--text-color) text-center pt-8 pb-4 transition-colors duration-700">
        <p className="text-xs uppercase tracking-widest editorial-font opacity-70">© {new Date().getFullYear()} Ipshita Das • Engineered with Scalable Intent</p>
      </footer>
      
    </div>
  );
}