// // // --- Projects Section ---
// // const Projects = () => {
// //     return (
// //         <section id="projects" data-section className="py-24 bg-[#140c23]">
// //             <div className="container mx-auto px-6">
// //                 <h2 className="text-4xl font-bold text-center text-white mb-4">
// //                     Featured <span className="text-purple-400">Projects</span>
// //                 </h2>
// //                 <p className="text-lg text-gray-300 text-center mb-16 max-w-2xl mx-auto">
// //                     A curated collection of full stack projects demonstrating my expertise in building modern, scalable, and interactive web applications.
// //                 </p>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                     {projectsData.map((project, index) => (
// //                         <div
// //                             key={index}
// //                             className="bg-[#1a112b] rounded-lg overflow-hidden border border-purple-800/50 shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-105 group"
// //                         >
// //                             <img
// //                                 src={project.imageUrl}
// //                                 alt={project.title}
// //                                 className="w-full h-48 object-cover"
// //                             />
// //                             <div className="p-6">
// //                                 <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
// //                                 <p className="text-gray-300 mb-4">{project.description}</p>
// //                                 <a
// //                                     href="#" // Placeholder link
// //                                     className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
// //                                 >
// //                                     View Project <ArrowRight size={18} className="ml-1" />
// //                                 </a>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };











// import React, { useEffect, useState } from 'react';
// import { ArrowRight, ExternalLink, GitHub, X } from 'react-feather';

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);

//   // Simulate dynamic fetch from CMS/backend
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch('/api/projects'); // Replace with actual CMS endpoint
//         const data = await response.json();
//         setProjects(data);
//       } catch (error) {
//         console.warn('Using fallback project data');
//         setProjects([
//           {
//             title: '3D Portfolio Website',
//             description: 'An immersive 3D portfolio built with React, Three.js, and GSAP animations.',
//             imageUrl: 'https://placehold.co/600x400/1a112b/4f3286?text=3D+Portfolio',
//             alt: 'Screenshot of 3D Portfolio Website',
//             liveUrl: '#',
//             repoUrl: '#',
//             tech: ['React', 'Three.js', 'GSAP'],
//           },
//           {
//             title: 'Bike-Time – Immersive Experience',
//             description: 'A concept site for a premium bike brand, featuring scroll-based visuals and branded UI.',
//             imageUrl: 'https://placehold.co/600x400/1a112b/4f3286?text=Bike+Experience',
//             alt: 'Screenshot of Bike-Time Experience',
//             liveUrl: '#',
//             repoUrl: '#',
//             tech: ['React', 'Tailwind CSS', 'ScrollTrigger'],
//           },
//           {
//             title: 'AI Chat Assistant UI',
//             description: 'A sleek, responsive UI for an AI-powered chatbot with floating button and modal logic.',
//             imageUrl: 'https://placehold.co/600x400/1a112b/4f3286?text=AI+Chat+UI',
//             alt: 'Screenshot of AI Chat Assistant UI',
//             liveUrl: '#',
//             repoUrl: '#',
//             tech: ['React', 'Tailwind CSS', 'React Feather'],
//           },
//         ]);
//       }
//     };

//     fetchProjects();
//   }, []);

//   return (
//     <section id="projects" data-section className="section py-24 bg-[#140c23] px-4 sm:px-6 lg:px-8">
//       <div className="max-w-screen-xl mx-auto">
//         {/* Section Heading */}
//         <h2 className="text-4xl font-bold text-center text-white mb-4 animate-fadeIn">
//           Featured <span className="text-purple-400">Projects</span>
//         </h2>
//         <p className="text-lg text-gray-300 text-center mb-16 max-w-2xl mx-auto animate-fadeIn delay-200">
//           A curated collection of full stack projects demonstrating my expertise in building modern, scalable, and interactive web applications.
//         </p>

//         {/* Projects Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map((project, index) => (
//             <div
//               key={index}
//               className={`bg-[#1a112b] rounded-lg overflow-hidden border border-purple-800/50 shadow-lg transition-all transform hover:scale-105 group cursor-pointer animate-fadeIn delay-${index * 100}`}
//               onClick={() => setSelectedProject(project)}
//             >
//               <img
//                 src={project.imageUrl}
//                 alt={project.alt || `Project: ${project.title}`}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
//                 <p className="text-gray-300 mb-4">{project.description}</p>
//                 {project.liveUrl && (
//                   <a
//                     href={project.liveUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     View Project <ArrowRight size={18} className="ml-1" />
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Modal Preview */}
//         {selectedProject && (
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//             <div className="bg-[#1a112b] rounded-lg overflow-hidden shadow-xl max-w-xl w-full relative animate-fadeIn">
//               <button
//                 onClick={() => setSelectedProject(null)}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-white"
//                 aria-label="Close modal"
//               >
//                 <X size={24} />
//               </button>
//               <img
//                 src={selectedProject.imageUrl}
//                 alt={selectedProject.alt}
//                 className="w-full h-auto object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
//                 <p className="text-gray-300 mb-4">{selectedProject.description}</p>
//                 <div className="flex gap-4 mb-4">
//                   <a
//                     href={selectedProject.liveUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
//                   >
//                     Live <ExternalLink size={16} className="ml-1.5" />
//                   </a>
//                   <a
//                     href={selectedProject.repoUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-400 hover:text-purple-400 font-medium inline-flex items-center"
//                   >
//                     Code <GitHub size={16} className="ml-1.5" />
//                   </a>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedProject.tech?.map((tech, i) => (
//                     <span
//                       key={i}
//                       className="bg-purple-800/30 text-purple-300 text-xs px-3 py-1 rounded-full"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Projects;




// import React, { useEffect, useState } from 'react';
// import { ArrowRight, ExternalLink, GitHub, X } from 'react-feather';
// import projectsData from '../Projects/projectsData';

// const techIcons = {
//   React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
//   'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
//   'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
//   MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
//   Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
//   MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
//   HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
//   CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
//   JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
//   ChartJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chartjs/chartjs-original.svg',
//   Cloudinary: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg',
//   Swing: 'https://www.qfs.de/fileadmin/Webdata/logos-icons/java-swing-schriftzug.png',
//   JDBC: 'https://static.admfactory.com/images/logos/jdbc.jpg',
//   JWT: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jwt/jwt-original.svg',
// };

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);

//   useEffect(() => {
//     setProjects(projectsData);
//   }, []);

//   return (
//     <section id="projects" data-section className="section py-24 bg-[#140c23] px-4 sm:px-6 lg:px-8">
//       <div className="max-w-screen-xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-white mb-4 animate-fadeIn">
//           Featured <span className="text-purple-400">Projects</span>
//         </h2>
//         <p className="text-lg text-gray-300 text-center mb-16 max-w-2xl mx-auto animate-fadeIn delay-200">
//           A curated collection of full stack projects demonstrating my expertise in building modern, scalable, and interactive web applications.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map((project, index) => (
//             <div
//               key={index}
//               className={`bg-[#1a112b] rounded-lg overflow-hidden border border-purple-800/50 shadow-lg transition-all transform hover:scale-105 group cursor-pointer animate-fadeIn delay-[${index * 100}ms]`}
//               onClick={() => setSelectedProject(project)}
//             >
//               <img
//                 src={project.imageUrl}
//                 alt={project.alt || `Project: ${project.title}`}
//                 className="w-full h-48 object-cover"
//                 loading="lazy"
//               />
//               <div className="p-6">
//                 <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
//                 <p className="text-gray-300 mb-4">{project.description}</p>
//                 {project.liveUrl && (
//                   <a
//                     href={project.liveUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     View Project <ArrowRight size={18} className="ml-1" />
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {selectedProject && (
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-fade">
//             <div className="bg-[#1a112b] rounded-lg overflow-hidden shadow-xl max-w-xl w-full relative animate-slideUp">
//               <button
//                 onClick={() => setSelectedProject(null)}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-white"
//                 aria-label="Close modal"
//               >
//                 <X size={24} />
//               </button>
//               <img
//                 src={selectedProject.imageUrl}
//                 alt={selectedProject.alt}
//                 className="w-full h-auto object-cover"
//                 loading="lazy"
//               />
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
//                 <p className="text-gray-300 mb-4">{selectedProject.description}</p>
//                 <div className="flex gap-4 mb-4">
//                   {selectedProject.liveUrl && (
//                     <a
//                       href={selectedProject.liveUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
//                     >
//                       Live <ExternalLink size={16} className="ml-1.5" />
//                     </a>
//                   )}
//                   <a
//                     href={selectedProject.repoUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-400 hover:text-purple-400 font-medium inline-flex items-center"
//                   >
//                     Code <GitHub size={16} className="ml-1.5" />
//                   </a>
//                 </div>

//                 {/* Tech Badges with Icons and Hover */}
//                 <div className="flex flex-wrap gap-2">
//                   {selectedProject.tech?.map((tech, i) => (
//                     <span
//                       key={i}
//                       className="tooltip group flex items-center gap-2 bg-purple-800/30 text-purple-300 text-xs px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition"
//                     >
//                       {techIcons[tech] && (
//                         <img src={techIcons[tech]} alt={tech} className="w-4 h-4" loading="lazy" />
//                       )}
//                       {tech}
//                       <span className="tooltip-text group-hover:scale-100">{tech}</span>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Projects;











import React, { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, GitHub, X } from 'react-feather';
import projectsData from '../Projects/projectsData';

const techIcons = {
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  ChartJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chartjs/chartjs-original.svg',
  Cloudinary: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg',
  Swing: 'https://www.qfs.de/fileadmin/Webdata/logos-icons/java-swing-schriftzug.png',
  JDBC: 'https://static.admfactory.com/images/logos/jdbc.jpg',
  JWT: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jwt/jwt-original.svg',
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setProjects(projectsData);
    const revealCards = () => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          card.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', revealCards);
    revealCards();
    return () => window.removeEventListener('scroll', revealCards);
  }, []);

  return (
    <section id="projects" data-section className="section py-24 bg-[#140c23] px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4 animate-fadeIn">
          Featured <span className="text-purple-400">Projects</span>
        </h2>
        <p className="text-lg text-gray-300 text-center mb-16 max-w-2xl mx-auto animate-fadeIn delay-200">
          A curated collection of full stack projects demonstrating my expertise in building modern, scalable, and interactive web applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card rounded-lg overflow-hidden border border-purple-800/50 shadow-lg transition-all transform group cursor-pointer delay-[${index * 100}ms]`}
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.imageUrl}
                alt={project.alt || `Project: ${project.title}`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Project <ArrowRight size={18} className="ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-fade">
            <div className="bg-[#1a112b] rounded-lg overflow-hidden shadow-xl max-w-xl w-full relative animate-slideUp">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-gray-300 mb-4">{selectedProject.description}</p>
                <div className="flex gap-4 mb-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
                    >
                      Live <ExternalLink size={16} className="ml-1.5" />
                    </a>
                  )}
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 font-medium inline-flex items-center"
                  >
                    Code <GitHub size={16} className="ml-1.5" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech?.map((tech, i) => (
                    <span
                      key={i}
                      className="tooltip group flex items-center gap-2 bg-purple-800/30 text-purple-300 text-xs px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition"
                    >
                      {techIcons[tech] && (
                        <img src={techIcons[tech]} alt={tech} className="w-4 h-4" loading="lazy" />
                      )}
                      {tech}
                      <span className="tooltip-text group-hover:scale-100">{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;