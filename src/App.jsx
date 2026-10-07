import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Displayed in this order as alternating magazine spreads.
const projects = [
  { id: 1, title: "Uma", tech: "React, Generative AI", shortDesc: "Durga Puja AI chatbot.", desc: "A conversational AI companion for Durga Puja that answers everything about pandals, adda spots, bhog and festive outfits. Wrapped in a hand-illustrated Bengali folk-art interface, it greets users personally, offers quick-start prompts like North Kolkata pandal-hopping routes and Pujo street food, and accepts image input.", image: "/images/uma.jpg", link: "https://uma-pujo-chatbot.onrender.com/"},
  { id: 2, title: "Serafina", tech: "React, Custom CSS", shortDesc: "Luxury shopping platform.", desc: "Engineered a high-performance e-commerce web application tailored for luxury retail. Developed smooth user interactions, robust state management, and a scalable architecture to handle complex user and product data.", image: "/images/serafina.jpg", link: "https://serafina-app.vercel.app/" },
  { id: 3, title: "CollabBoard", tech: "MERN, JWT, REST APIs", shortDesc: "Secure full-stack Kanban workspace.", desc: "Developed a secure, full-stack Kanban workspace featuring real-time problem reporting and interactive analytics. Engineered robust backend security using HTTP-only JWT authentication and strict Role-Based Access Control across all API routes.", image: "/images/collab-board.jpg", link: "https://collab-board-azure.vercel.app/" },
  { id: 4, title: "The Coca-Cola Website", tech: "React, Three.js, GSAP, Framer Motion", shortDesc: "Interactive 3D brand experience.", desc: "A fully serverless, client-side brand experience exploring a 'Desi-Cyber' theme, featuring interactive 3D Coke can customization powered by Three.js and choreographed GSAP and Framer Motion animation.", image: "/images/Coca-cola.jpg", link: "https://the-coca-cola.github.io/coke/" },
  { id: 5, title: "Agro Guard", tech: "IoT, Random Forest", shortDesc: "Smart crop preservation framework.", desc: "Engineered a smart IoT monitoring system using an Arduino UNO and Random Forest algorithm, achieving 92.5% classification accuracy to detect structural cracks and humidity. The web dashboard provides real-time tracking and automated hazard alerts to prevent crop loss.", image: "/images/agro-guard.jpg", link: "https://pandadsgn.github.io/Agro-Guard/" },
  { id: 6, title: "Household Energy Optimization", tech: "IoT, ML, React", shortDesc: "Household consumption optimization.", desc: "Integrated real-time IoT sensors with machine learning models to combat wasteful electricity consumption, achieving 97.2% energy classification accuracy. Delivered a comprehensive smart home dashboard for live monitoring and predictive billing.", image: "/images/energy-opt.jpg", link: "https://house-energy-consumption-optimization-fhwo3ngba6f4mruphmv5rq.streamlit.app/" }
];

const achievements = [
  { title: "Vice Chancellor's Award", role: "Overall Performance", date: "2025", desc: "Honored with the prestigious Vice Chancellor's award for exceptional academic excellence and extra-curricular achievements." },
  { title: "President", role: "CSI Student Chapter", date: "2026 - Present", desc: "Directing student initiatives, organizing large-scale computing events, and managing high-stakes technical environments for the university." },
  { title: "1st Place, Algotrix", role: "Project Competition", date: "2025", desc: "Secured first place in the Departmental Project Competition for the Household Energy Consumption Optimization architecture." },
  { title: "Manager", role: "CSI Student Chapter", date: "2024 - 2025", desc: "Orchestrated chapter operations, fostered competitive innovation, and coordinated logistics for multiple events." }
];

const certifications = [
  { id: 1, title: "AI Tools & Claude Workshop", issuer: "be10X", year: "2026", image: "/images/be10x-ai-tools.jpg" },
  { id: 2, title: "Strategic Planning in the AI Age", issuer: "HP LIFE · HP Foundation", year: "2026", image: "/images/hp-strategic-planning.jpg" },
  { id: 3, title: "Google AI", issuer: "Google", year: "2026", image: "/images/google-ai.jpg" },
  { id: 4, title: "Foundations of Data Science", issuer: "Google", year: "2026", image: "/images/data-science.jpg" },
  { id: 5, title: "Transforming Business with AI Agents", issuer: "PMI", year: "2025", image: "/images/pmi-ai.jpg" },
  { id: 6, title: "Cyber Security Fundamentals", issuer: "University of London", year: "2025", image: "/images/cyber-sec.jpg" }
];

const publications = [
  { title: "Household Energy Consumption Optimization", publisher: "ICAGEC", year: "2026" },
  { title: "AgroGuard: A Novel IoT-Enabled Framework for Smart Crop Preservation in Grain Silos", publisher: "UEMGREEN", year: "2026" }
];

const skills = ["MongoDB", "Express.js", "React", "Node.js", "JavaScript", "REST APIs", "JWT Auth", "Python", "Java", "Scikit-Learn", "Git"];

const sections = [
  { id: "about", label: "The Brief" },
  { id: "work", label: "Works" },
  { id: "credentials", label: "Credentials" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Classifieds" }
];

const pad = (n) => String(n).padStart(2, '0');

function getInitialEdition() {
  try {
    const saved = localStorage.getItem('edition');
    if (saved) return saved === 'night';
  } catch { /* storage unavailable */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

function SectionHeading({ kicker, children, className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      {kicker && <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold text-(--accent-red) mb-3">{kicker}</p>}
      <h2 className="text-4xl md:text-6xl editorial-font font-black uppercase leading-none">{children}</h2>
    </div>
  );
}

function Spread({ proj, index }) {
  const flipped = index % 2 === 1;
  const tags = proj.tech.split(',').map(t => t.trim());
  const screenshot = (
    <div className="group relative border-2 border-(--text-color) bg-(--text-color) shadow-[8px_8px_0px_0px_var(--text-color)] overflow-hidden aspect-16/10 transition-colors duration-700">
      <img src={proj.image} alt={`${proj.title} screenshot`} loading="lazy" className="filtered-img w-full h-full object-cover object-top group-hover:scale-[1.03]" />
    </div>
  );

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-12 md:py-16">
      <div className={`lg:col-span-7 pr-2 lg:pr-0 ${flipped ? 'lg:order-2' : ''}`}>
        {proj.link
          ? <a href={proj.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${proj.title}`} className="block">{screenshot}</a>
          : screenshot}
      </div>
      <div className={`lg:col-span-5 ${flipped ? 'lg:order-1' : ''}`}>
        <div className="flex items-end gap-4 border-b-2 border-(--text-color) pb-3 mb-5 transition-colors duration-700">
          <span className="editorial-font font-black text-6xl md:text-7xl leading-none text-(--accent-red)">{pad(proj.id)}</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-semibold pb-1.5">{proj.shortDesc}</span>
        </div>
        <h3 className="editorial-font font-black uppercase leading-[0.95] text-3xl md:text-5xl mb-5">{proj.title}</h3>
        <p className="leading-relaxed opacity-90 font-serif text-pretty text-base mb-6">{proj.desc}</p>
        <ul className="flex flex-wrap gap-2 mb-7" aria-label="Tech stack">
          {tags.map(tag => (
            <li key={tag} className="border border-(--text-color) px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold transition-colors duration-700">{tag}</li>
          ))}
        </ul>
        {proj.link ? (
          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto text-center border-2 border-(--text-color) bg-(--text-color) text-(--bg-color) py-3 px-6 text-xs uppercase tracking-[0.2em] font-bold hover:bg-transparent hover:text-(--text-color) transition-colors">
            View Project ↗
          </a>
        ) : (
          <p className="text-xs uppercase tracking-[0.2em] font-bold italic text-(--muted-color)">Live link coming soon</p>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const [activeCert, setActiveCert] = useState(null);
  const [isNightEdition, setIsNightEdition] = useState(getInitialEdition);

  const today = new Date();
  const dateline = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  useEffect(() => {
    document.body.classList.toggle('night-edition', isNightEdition);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isNightEdition ? '#0a0a0a' : '#f5f3eb');
    try { localStorage.setItem('edition', isNightEdition ? 'night' : 'morning'); } catch { /* storage unavailable */ }
  }, [isNightEdition]);


  return (
    <div className="w-full min-h-screen px-4 md:px-12 py-6 md:py-8 max-w-360 mx-auto overflow-hidden transition-colors duration-700">

      {/* FOLIO LINE */}
      <div className="flex flex-wrap justify-between items-center border-y-2 border-(--text-color) py-2 mb-0.5 text-[10px] md:text-xs uppercase tracking-widest font-semibold gap-2 transition-colors duration-700">
        <span>Vol. I · Issue No. 01</span>
        <button
          onClick={() => setIsNightEdition(!isNightEdition)}
          aria-pressed={isNightEdition}
          className="order-last w-full sm:order-0 sm:w-auto text-center font-bold hover:text-(--accent-red) transition-colors border border-dashed border-(--text-color) px-4 py-1.5"
        >
          {isNightEdition ? "☼ Switch to Morning Edition" : "☾ Switch to Night Edition"}
        </button>
        <span>{dateline}</span>
      </div>
      <div className="border-b-4 border-(--text-color) transition-colors duration-700"></div>

      {/* SECTION NAV */}
      <nav aria-label="Sections" className="border-b border-(--text-color) mb-12 md:mb-16 transition-colors duration-700">
        <ul className="flex flex-wrap justify-center gap-x-6 md:gap-x-10 py-2 text-[10px] md:text-xs uppercase tracking-[0.25em] font-semibold">
          {sections.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-block py-1.5 hover:text-(--accent-red) transition-colors">{s.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* MASTHEAD */}
      <header className="relative mb-14 md:mb-16 text-center flex flex-col items-center">
        <motion.h1
          className="text-[3.6rem] sm:text-8xl md:text-[9rem] xl:text-[11rem] font-black editorial-font cursor-default uppercase tracking-tighter leading-[0.85] text-(--accent-red) flex flex-wrap justify-center transition-colors duration-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          aria-label="Ipshita Das"
        >
          {"Ipshita Das".split("").map((char, index) => {
            if (char === " ") return <span key={index} className="w-4 md:w-8" aria-hidden="true"></span>;
            return <span key={index} className="hollow-text-hover inline-block" aria-hidden="true">{char}</span>;
          })}
        </motion.h1>
        <p className="text-xl md:text-3xl editorial-font italic mt-6 px-2">
          Full-Stack Engineer, Specialized in the MERN Stack
        </p>
        <p className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-(--muted-color) max-w-2xl leading-relaxed">
          MongoDB · Express · React · Node · CSE (AI & ML), Institute of Engineering & Management
        </p>
        <div className="mt-8 flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-3">
          <a href="#work" className="border-2 border-(--text-color) bg-(--text-color) text-(--bg-color) px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-transparent hover:text-(--text-color) transition-colors">
            Read the Works
          </a>
          <a href="#contact" className="border-2 border-(--text-color) px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-(--text-color) hover:text-(--bg-color) transition-colors">
            Get in Touch
          </a>
        </div>
      </header>

      {/* INFINITE SCROLLING TECH TICKER */}
      <div className="ticker w-full border-y-4 border-(--text-color) py-3 overflow-hidden bg-(--text-color) text-(--bg-color) mb-16 transition-colors duration-700" aria-label={`Technical skills: ${skills.join(', ')}`}>
        <div className="ticker-track flex w-max whitespace-nowrap" aria-hidden="true">
          {[0, 1].map(copy => (
            <div key={copy} className="flex gap-12 pr-12 items-center text-lg md:text-xl font-black uppercase tracking-widest editorial-font">
              <span className="text-(--accent-red)">+++ Technical Skills</span>
              {skills.map(skill => <span key={skill}>• {skill}</span>)}
            </div>
          ))}
        </div>
      </div>

      {/* THE ENGINEERING BRIEF */}
      <section id="about" className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 border-y-2 border-(--text-color) py-12 mb-24 max-w-7xl mx-auto transition-colors duration-700">
        <figure className="md:col-span-5 relative group pr-2 md:pr-0">
          <img
            src="/images/myImage3.jpeg"
            alt="Portrait of Ipshita Das"
            className="filtered-img w-full aspect-4/5 object-cover border border-(--text-color) shadow-[8px_8px_0px_0px_var(--text-color)]"
          />
          <figcaption className="mt-5 text-[10px] uppercase tracking-[0.25em] text-(--muted-color) italic">Pictured: The engineer, off the record.</figcaption>
        </figure>
        <div className="md:col-span-7 flex flex-col justify-center md:px-8">
          <h2 className="text-4xl md:text-5xl editorial-font mb-6 font-bold uppercase text-(--accent-red) border-b border-(--text-color) pb-2 transition-colors duration-700">The Engineering Brief</h2>
          <div className="text-sm md:text-base leading-relaxed opacity-90 columns-1 lg:columns-2 gap-8 drop-cap">
            <p className="mb-4 text-pretty">
              I am a full-stack engineer specializing in the MERN stack, and a Computer Science and Engineering undergraduate in Artificial Intelligence & Machine Learning at the Institute of Engineering and Management. I build complete products end to end: MongoDB data models, Express and Node.js APIs, and fast, intuitive React interfaces that handle complex data while delivering a seamless user experience.
            </p>
            <p className="text-pretty">
              My work ranges from secure RESTful backends with JWT authentication and role-based access control to AI-powered experiences that bring machine learning models into everyday products. Alongside engineering, I represent my cohort as Class Representative and lead the CSI Student Chapter as President. Whatever the build, the goal remains the same: clean architecture, precise execution, and software that people enjoy using.
            </p>
          </div>
          <dl className="grid grid-cols-3 border-y-2 border-(--text-color) mt-10 text-center transition-colors duration-700">
            {[["Projects", projects.length], ["Publications", publications.length], ["Certifications", certifications.length]].map(([label, n], i) => (
              <div key={label} className={`py-4 ${i > 0 ? 'border-l border-(--text-color)' : ''}`}>
                <dd className="text-3xl md:text-4xl editorial-font font-black text-(--accent-red)">{pad(n)}</dd>
                <dt className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-semibold mt-1">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FEATURED WORKS: magazine spreads, alternating sides */}
      <section id="work" className="mb-24 md:mb-32 w-full max-w-7xl mx-auto">
        <div className="border-y-4 border-(--text-color) py-6 transition-colors duration-700">
          <SectionHeading kicker="Section B · Selected Archive">Featured Works</SectionHeading>
        </div>
        <div className="divide-y divide-(--rule-color)">
          {projects.map((proj, i) => <Spread key={proj.id} proj={proj} index={i} />)}
        </div>
        <div className="border-t-[6px] border-double border-(--text-color) transition-colors duration-700"></div>
      </section>

      {/* CREDENTIALS, PUBLICATIONS & LEADERSHIP */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-y-[6px] border-double border-(--text-color) max-w-7xl mx-auto transition-colors duration-700">

        <section id="credentials" className="py-8 md:p-12 md:border-r-[6px] md:border-double border-(--text-color) transition-colors duration-700">
          <h2 className="text-2xl md:text-3xl editorial-font mb-8 font-bold uppercase text-center border-b border-(--text-color) pb-4">Credentials</h2>
          <ul className="space-y-2 mb-16">
            {certifications.map((cert) => {
              const isOpen = activeCert === cert.id;
              return (
                <li key={cert.id} className="border-b border-dashed border-(--rule-color) pb-2">
                  <button
                    onClick={() => setActiveCert(isOpen ? null : cert.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left group hover:bg-(--text-color) hover:text-(--bg-color) transition-colors duration-300 p-2 rounded-sm"
                  >
                    <div className="flex justify-between items-baseline gap-4 mb-1">
                      <h3 className="text-base md:text-lg font-bold editorial-font">{cert.title}</h3>
                      <span className="text-sm font-black editorial-font">{cert.year}</span>
                    </div>
                    <p className="text-[10px] md:text-xs tracking-widest uppercase mt-1">
                      <span className="opacity-80">{cert.issuer}</span>
                      <span className="ml-3 italic font-bold text-(--accent-red) group-hover:text-(--bg-color) transition-colors">
                        {isOpen ? "[ Hide Document ]" : "[ View Document ]"}
                      </span>
                    </p>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <img src={cert.image} alt={`${cert.title} certificate, issued by ${cert.issuer}`} loading="lazy" className="w-full h-auto object-contain bg-(--bg-color) border-4 border-(--text-color) p-1 shadow-xl mt-4 mb-2" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <h2 className="text-2xl md:text-3xl editorial-font mb-8 font-bold uppercase text-center border-b border-(--text-color) pb-4">Publications</h2>
          <ul className="space-y-6">
            {publications.map((pub) => (
              <li key={pub.title} className="flex flex-col border-b border-dashed border-(--rule-color) pb-4 px-2">
                <div className="flex justify-between items-baseline mb-2 gap-4">
                  <h3 className="text-sm md:text-base font-bold editorial-font leading-snug">{pub.title}</h3>
                  <span className="text-sm font-black editorial-font border-l border-(--text-color) pl-4">{pub.year}</span>
                </div>
                <p className="text-[10px] md:text-xs tracking-widest uppercase italic text-(--accent-red)">{pub.publisher}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="leadership" className="bg-(--text-color) text-(--bg-color) -mx-4 px-6 py-8 md:mx-0 md:p-12 transition-colors duration-700">
          <h2 className="text-2xl md:text-3xl editorial-font mb-8 font-bold uppercase text-center border-b border-(--bg-color) pb-4">Leadership & Achievements</h2>
          <ol>
            {achievements.map((a, i) => (
              <li key={a.title + a.date} className={`py-6 ${i > 0 ? 'border-t border-dashed border-(--bg-color)/30' : ''}`}>
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-2xl md:text-3xl editorial-font italic leading-tight">{a.title}</h3>
                  <span className="text-xs font-black editorial-font whitespace-nowrap">{a.date}</span>
                </div>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-70 mt-2 mb-3 font-semibold">{a.role}</p>
                <p className="text-sm leading-relaxed opacity-90">{a.desc}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="star-divider overflow-hidden mt-12 mb-16 hidden md:block max-w-7xl mx-auto" aria-hidden="true"></div>

      {/* CLASSIFIEDS (Contact & Socials) */}
      <section id="contact" className="max-w-7xl mx-auto border-t-8 border-double border-(--text-color) pt-10 mt-16 md:mt-0 mb-16 transition-colors duration-700">
        <SectionHeading kicker="The Classifieds" className="mb-10">Let's Connect</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 border-4 border-(--text-color) p-6 flex flex-col transition-colors duration-700">
            <h3 className="text-2xl font-black uppercase mb-2">Notice: Seeking Opportunities</h3>
            <p className="text-sm font-serif italic mb-6 opacity-90">Full-stack MERN engineer available for high-impact roles. Will trade robust full-stack architecture for a salary. Inquire within.</p>
            <div className="mt-auto space-y-2 text-xs uppercase tracking-widest font-bold">
              <p>Email: <a href="mailto:ipshitadas029@gmail.com" className="normal-case tracking-wider underline underline-offset-4 hover:text-(--accent-red) break-all">ipshitadas029@gmail.com</a></p>
              <p>Direct Line: <a href="tel:+917044222721" className="tracking-wider underline underline-offset-4 hover:text-(--accent-red)">+91-7044222721</a></p>
            </div>
          </div>

          <a href="https://www.linkedin.com/in/ipshita-das-772479265/" target="_blank" rel="noopener noreferrer" className="border-4 border-(--text-color) p-6 flex flex-col justify-between hover:bg-(--text-color) hover:text-(--bg-color) transition-colors duration-300 group">
            <div>
              <h3 className="text-xl font-black uppercase mb-2 text-(--accent-red) group-hover:text-(--bg-color)">Available For A Discussion</h3>
              <p className="text-xs font-serif opacity-90">Let us discuss full-stack builds, scalable APIs, and intelligent systems.</p>
            </div>
            <p className="text-xs font-bold uppercase mt-4 underline underline-offset-4">Connect on LinkedIn ↗</p>
          </a>

          <a href="https://github.com/Ipshita-Das" target="_blank" rel="noopener noreferrer" className="border-4 border-(--text-color) p-6 flex flex-col justify-center items-center text-center hover:bg-(--text-color) hover:text-(--bg-color) transition-colors duration-300 group">
            <h3 className="text-3xl editorial-font italic mb-2">View The Archives</h3>
            <p className="text-xs uppercase tracking-widest font-bold border-t border-(--text-color) group-hover:border-(--bg-color) pt-2 mt-2 w-full">Inspect GitHub ↗</p>
          </a>
        </div>
      </section>

      <footer className="border-t border-(--text-color) flex flex-col sm:flex-row gap-3 justify-between items-center text-center pt-6 pb-2 text-xs uppercase tracking-widest editorial-font transition-colors duration-700">
        <p className="opacity-70">© {today.getFullYear()} Ipshita Das · Engineered with Scalable Intent</p>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="py-1 hover:text-(--accent-red) transition-colors">Back to Front Page ↑</a>
      </footer>
    </div>
  );
}
