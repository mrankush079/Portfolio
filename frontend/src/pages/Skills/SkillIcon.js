import React from 'react';
import { User, GitHub, Code } from 'react-feather';

const SkillIcon = ({ name }) => {
  const iconStyle = 'w-12 h-12';
  const defaultClass = iconStyle;

  const icons = {
    Html5: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      alt: 'HTML5',
    },
    Css3: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      alt: 'CSS3',
    },
    Javascript: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      alt: 'JavaScript',
    },
    React: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      alt: 'React',
    },
    Nodejs: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      alt: 'Node.js',
    },
    Express: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      alt: 'Express.js',
    },
    MongoDB: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      alt: 'MongoDB',
    },
    MySQL: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      alt: 'MySQL',
    },
    Java: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      alt: 'Java',
    },
    SpringBoot: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      alt: 'Spring Boot',
    },
    SpringAI: {
      src: 'https://docs.spring.io/spring-ai/reference/_images/spring_ai_logo_with_text.svg',
      alt: 'Spring AI',
    },
    Git: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      alt: 'Git',
    },
    Github: {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      alt: 'GitHub',
    },
    Agile: {
      src: 'https://logodix.com/logo/1760622.png',
      alt: 'Agile',
    },
JIRA: {
  src: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png',
  alt: 'JIRA',
},
    RESTAPI: {
      src: 'https://www.iconpacks.net/icons/free-icons-6/free-rest-api-blue-logo-icon-22099-thumb.png',
      alt: 'REST API',
    },
    Postman: {
      src: 'https://cdn.freelogovectors.net/wp-content/uploads/2020/12/postman-logo.png',
      alt: 'Postman',
    },

    // Soft Skills
    DesignUnderstanding: {
      src: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
      alt: 'Design Understanding',
    },
    TeamCollaboration: {
      src: 'https://cdn-icons-png.flaticon.com/512/942/942748.png',
      alt: 'Team Collaboration',
    },
    ProblemSolving: {
      src: 'https://cdn-icons-png.flaticon.com/512/3523/3523063.png',
      alt: 'Problem Solving',
    },
    VisualDesign: {
      src: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
      alt: 'Visual Design',
    },
  };

  if (icons[name]) {
    const { src, alt, className } = icons[name];
    return <img src={src} alt={alt} className={className || defaultClass} loading="lazy" />;
  }

  if (name === 'PenTool') return <User className={defaultClass} />;
  if (name === 'GithubIcon') return <GitHub className={defaultClass} />;

  return <Code className={defaultClass} />;
};

export default SkillIcon;