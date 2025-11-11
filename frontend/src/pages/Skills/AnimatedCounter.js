import { useEffect, useState } from 'react';

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 1000;
    const increment = end / (duration / 10);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(counter);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 10);

    return () => clearInterval(counter);
  }, [value]);

  return <span className="text-purple-400 font-bold">{count}%</span>;
};

export default AnimatedCounter;