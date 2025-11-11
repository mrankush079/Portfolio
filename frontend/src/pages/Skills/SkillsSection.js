import React from 'react';
import skillsData from './SkillsData'; // Adjust path if needed
import SkillIcon from './SkillIcon';
import AnimatedCounter from './AnimatedCounter'; // Ensure this file exists

const Skills = () => {
  return (
    <section id="skills" data-section className="py-24 bg-[#140c23] px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-center text-white mb-16 animate-fadeIn">
          My <span className="text-purple-400">Skills</span>
        </h2>

        {/* Grouped Skills */}
        <div className="space-y-16">
          {skillsData.map((group, groupIndex) => (
            <div key={groupIndex} className="animate-fadeIn delay-100">
              {/* Category Title */}
              <h3 className="text-2xl font-semibold text-white mb-6">{group.category}</h3>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {group.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-[#1a112b] p-6 rounded-lg border border-purple-800/50 shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-2 flex flex-col items-center animate-fadeIn"
                  >
                    {/* Icon */}
                    <div className={`mb-4 ${skill.color}`}>
                      <SkillIcon name={skill.icon} />
                    </div>

                    {/* Label */}
                    <h3 className="text-xl font-semibold text-white mb-2 text-center">{skill.name}</h3>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${skill.level}%` }}
                        aria-label={`${skill.name} proficiency ${skill.level}%`}
                      ></div>
                    </div>

                    {/* Animated Percentage */}
                    <span
                      className="text-sm text-gray-400 mt-2"
                      aria-label={`${skill.name} proficiency animated to ${skill.level}%`}
                    >
                      <AnimatedCounter value={skill.level} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;