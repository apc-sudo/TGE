import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import exh1 from "../assets/exh1.JPG";
import exh2 from "../assets/exh2.png";
import exh3 from "../assets/exh3.png";
import exh4 from "../assets/exh4.png";
import exh5 from "../assets/exh5.JPG";
import exh6 from "../assets/exh6.jpg";
import exh7 from "../assets/exh7.png";
import exh8 from "../assets/exh8.png";
import exh9 from "../assets/exh9.png";

const cards = [exh1, exh2, exh3, exh4, exh5, exh6, exh7, exh8, exh9];

const Gallery = () => {
  const [index, setIndex] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getImageAt = (offset) => {
    return cards[(index + offset + cards.length) % cards.length];
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="py-10 w-full">
   
      

      <div className="relative w-full flex items-center justify-center">
        <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden">

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-8 top-1/2 -translate-y-1/2 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-md z-50 hover:bg-gray-100"
          >
            {"<"}
          </button>

          {/* Cards with fixed layout and only image transitions */}
          {[ -2, -1, 0, 1, 2 ].map((offset, i) => {
            const position = offset;
            const zIndex = 10 - Math.abs(position);
            const translateX = isMobile ? 0 : position * 80;

            // Fixed sizes (same as before)
            const width = position === 0 ? "400px" : "300px";
            const height =
              position === 0
                ? "400px"
                : position === -1 || position === 1
                ? "300px"
                : "260px";

            const imageSrc = getImageAt(offset);

            return (
              <div
                key={i}
                className="absolute rounded-xl overflow-hidden shadow-md p-2 transition-all duration-500"
                style={{
                  transform: `translateX(${translateX}%)`,
                  zIndex,
                  width,
                  height,
                  backgroundColor: "white", // fallback only
                }}
              >
                <motion.img
                  key={imageSrc} // forces image transition
                  src={imageSrc}
                  alt={`Exhibition`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
              </div>
            );
          })}

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-md z-50 hover:bg-gray-100"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Gallery;

