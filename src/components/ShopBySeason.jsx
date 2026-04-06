import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import VideoCarousel from "./VideoCarousel";
const seasons = [
  { name: "Valentine's Day", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" },
  { name: "Crawfish Boil", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" },
  { name: "Mardi Gras", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" },
  { name: "Easter", image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80" },
  { name: "4th July", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" },
  { name: "Ramadan/Eid", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" },
  { name: "Halloween", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" },
  { name: "Christmas", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" },
  { name: "New Year", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" },
];

const ShopBySeason = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const mobileRef = useRef(null);
  const desktopRef = useRef(null);

  const controlsMobile = useAnimation();
  const controlsDesktop = useAnimation();

  const inViewMobile = useInView(mobileRef, { threshold: 0.2 });
  const inViewDesktop = useInView(desktopRef, { threshold: 0.3 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (inViewMobile) controlsMobile.start("visible");
    else controlsMobile.start("hidden");
  }, [inViewMobile]);

  useEffect(() => {
    if (inViewDesktop) controlsDesktop.start("visible");
    else controlsDesktop.start("hidden");
  }, [inViewDesktop]);

  const radius = 340;
  const containerWidth = 900;
  const containerHeight = 500;
  const centerX = containerWidth / 2;
  const centerY = radius + 20;
  const total = seasons.length;

  const desktopVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      x: -50,
      transition: {
        duration: 0.5,
        delay: (total - i - 1) * 0.25,
        ease: "easeInOut",
      },
    }),
  };

  const mobileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: Math.floor(i / 3) * 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div
         className="bg-cover bg-center py-16 bg-white"
       >
         <div className="text-center mb-12">
           <h2 className="text-6xl font-bold font-[Inter] text-[#000000]"
           style={{fontSize: '80px'}}>
         Shop by <span className="font-['DanHoricing_Script',cursive] text-[#000000]">Season & Theme</span>
        </h2>
        </div>
     
<VideoCarousel/>
    
    </div>
  );
};

export default ShopBySeason;
