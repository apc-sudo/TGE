import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TestimonialCards = ({ content, image, name, role, reverse }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

 useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setInView(entry.isIntersecting);
    },
    { threshold: 0.3 }
  );

  if (ref.current) observer.observe(ref.current);
  return () => {
    if (ref.current) observer.unobserve(ref.current);
  };
}, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row ${
        reverse ? 'md:flex-row-reverse' : ''
      } items-center justify-between my-12 px-2 md:px-0 overflow-hidden`}
    >
      {/* Image */}
      <motion.div
        initial={{ x: reverse ? 100 : -100, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0"
      >
        <img
          src={image}
          alt={name}
          className="w-44 h-44 md:w-72 md:h-72 rounded-full object-cover shadow-lg  border-white"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ x: reverse ? -100 : 100, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full md:w-full p-6 max-w-full bg-[#ffffff] shadow-md   backdrop-blur-sm"
      >
        <p className="text-gray-700  text-xl mb-4 whitespace-pre-line">{content}</p>
        <div className="text-2xl text-gray-900 font-semibold">{name}</div>
        <div className="text-lg text-gray-500">{role}</div>
      </motion.div>
    </div>
  );
};

export default TestimonialCards;
