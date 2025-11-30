
import React, { useEffect, useState } from 'react';
import { Download } from 'react-feather';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const orbitIcons = [
    'react',
    'nodejs',
    'mongodb',
    'java',
    'spring',
    'mysql',
    'github',
    'postman'
  ];

  const handleDownload = () => {
    fetch('/Full-Stack-dev.Ankush.pdf')
      .then((res) => {
        if (!res.ok) throw new Error('File not found');
        const link = document.createElement('a');
        link.href = '/Full-Stack-dev.Ankush.pdf';
        link.download = 'Ankush_Choudhary_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => alert('CV not available. Please try again later.'));
  };

  return (
    <section
      id="home"
      data-section
      className="section px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-48 md:pb-32 flex flex-col md:flex-row items-center min-h-screen relative"
    >
      {/* --- Left Content --- */}
      <div className="md:w-3/5 text-center md:text-left mb-12 md:mb-0 animate-fadeIn z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Hi, I'm <span className="text-purple-400 drop-shadow-[0_0_10px_#a855f7]">ANKUSH</span> —
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Full Stack Developer
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0">
          Building full stack SaaS products with React, Java, and MongoDB — from animated dashboards to secure admin panels and support portals
        </p>

        {/* --- CTA Buttons --- */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <a
            href="#contact"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg text-center"
            aria-label="Hire Me"
          >
            Hire Me
          </a>
          <button
            onClick={handleDownload}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
            aria-label="Download CV"
          >
            <Download size={20} className="mr-2" />
            Download CV
          </button>
        </div>
      </div>

      {/* --- Right Avatar / Animation --- */}
      <div className="md:w-2/5 flex justify-center items-center animate-fadeIn delay-200 z-10">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96">
          {/* Outer tech ring */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-500 animate-spin-slow"></div>
          {/* Inner pulse ring */}
          <div className="absolute inset-4 rounded-full border-2 border-indigo-500 animate-pulse"></div>

          {/* Orbiting Tech Icons */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative w-full h-full orbit-group">
              {orbitIcons.map((src, i) => (
                <img
                  key={src}
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${src}/${src}-original.svg`}
                  alt={src}
                  title={src}
                  className={`absolute w-8 orbit-icon ${
                    i === 0 ? 'top-0 left-1/2 -translate-x-1/2' :
                    i === 1 ? 'right-0 top-1/2 -translate-y-1/2' :
                    i === 2 ? 'bottom-0 left-1/2 -translate-x-1/2' :
                    i === 3 ? 'left-0 top-1/2 -translate-y-1/2' :
                    i === 4 ? 'top-4 left-4' :
                    i === 5 ? 'bottom-4 right-4' :
                    i === 6 ? 'top-4 right-4' :
                    'bottom-4 left-4'
                  }`}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/media/images/ankush3.jpg"
              alt="Ankush Choudhary"
              className="rounded-full shadow-2xl w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x300?text=Ankush';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

