
import React from 'react';
import { ArrowRight } from 'react-feather';

const About = () => {
  return (
    <section id="about" data-section className="section py-24 bg-[#140c23] px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-12 animate-fadeIn">
          About <span className="text-purple-400">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12 animate-fadeIn delay-200">
{/* Avatar with Orbiting Tech Icons */}
<div className="md:w-1/3 flex justify-center">
  <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg perspective-3d">
    {/* Orbiting Icons */}
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="relative w-full h-full orbit-group">
        {[
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', class: 'orbit-react' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js', class: 'orbit-node' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB', class: 'orbit-mongo' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', alt: 'Java', class: 'orbit-java' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', alt: 'Spring Boot', class: 'orbit-spring' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', alt: 'MySQL', class: 'orbit-mysql' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', alt: 'GitHub', class: 'orbit-github' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', alt: 'Postman', class: 'orbit-postman' },
        ].map((icon, i) => (
          <img
            key={i}
            src={icon.src}
            alt={icon.alt}
            title={icon.alt}
            className={`absolute orbit-icon ${icon.class}`}
          />
        ))}
      </div>
    </div>

    {/* Avatar Image */}
    <img
      src="/media/images/ankush3.jpg"
      alt="Ankush- Avatar"
      className="w-full h-full rounded-full object-cover z-10"
    />
  </div>
</div>

          {/* Bio & Stats */}
          <div className="md:w-2/3 text-center md:text-left">
            <p className="text-base sm:text-lg text-gray-300 mb-6">
              I'm a Full Stack Developer passionate about building dynamic, user-friendly web applications. I specialize in the MERN stack (MongoDB, Express, React, Node.js) Java/Spring Boot. and have a strong foundation in both frontend and backend development.
            </p>
            <p className="text-base sm:text-lg text-gray-300 mb-8">
              I specialize in responsive UI/UX with Tailwind CSS and Framer Motion, secure RESTful APIs, and scalable backend logic. My toolkit includes MongoDB, MySQL, GitHub, Postman, and Agile workflows and always eager to tackle new challenges.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-8">
              {[
                { label: 'Years Experience', value: '1+' },
                { label: 'Projects Completed', value: '20+' },
                { label: 'Client Satisfaction', value: '95%' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="block text-3xl font-bold text-purple-400">{stat.value}</span>
                  <span className="text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#skills"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
              aria-label="Go to Skills Section"
            >
              My Skills <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;