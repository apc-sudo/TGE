import React, { useRef, useState, useMemo } from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import { useAccessoryFestivals } from '../hooks/useAccessoryFestivals.js';
import { slugify } from '../utils/slugify.jsx';

const videoMap = {
  "valentine's day": 'https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/valentine.mp4',
  "summer": 'https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/summer.mp4',
  "mardi gras": 'https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/mardi.mp4',
  "easter": 'https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/easter.mp4',
  "4th july": 'https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/4th.mp4',
  "ramadan/eid": 'https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/ramadan.mp4',
  "halloween": 'https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/halloween.mp4',
  "christmas": 'https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/christmas.mp4',
  "new year": 'https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/newyear.mp4',
};

const fallbackVideo = 'https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/summer.mp4';

const VideoCarousel = () => {
  const { festivals } = useAccessoryFestivals();
  const [isDragging, setIsDragging] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);
  const marqueeRef = useRef(null);

  const seasons = useMemo(() => {
    return festivals.map(festival => ({
      name: festival.label,
      video: videoMap[festival.label.toLowerCase()] || fallbackVideo,
      url: `/accessories/${festival.slug}`
    }));
  }, [festivals]);

  // Handle mouse down for drag start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsUserInteracting(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    e.preventDefault();
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up for drag end
  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-scroll after a delay
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 10000);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Handle wheel scroll
  const handleWheel = (e) => {
    e.preventDefault();
    setIsUserInteracting(true);
    scrollContainerRef.current.scrollLeft += e.deltaY;
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 10000);
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsUserInteracting(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000);
  };

  return (
    <div className="w-full flex items-center justify-center h-[500px] py-6 relative">
      {/* Manual Scroll Container */}
      <div
        ref={scrollContainerRef}
        className={`w-full h-full overflow-x-auto overflow-y-hidden ${isUserInteracting ? 'block' : 'hidden'}`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-4 px-4" style={{ width: 'max-content' }}>
          {seasons.map((item, index) => (
            <Link key={index} to={item.url} className="flex-shrink-0 min-w-[200px] text-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="cursor-pointer rounded-xl w-[300px] h-[400px] object-cover shadow-lg pointer-events-none"
                title={item.name}
              >
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="mt-2 text-3xl font-[Inter] text-[#514747] font-bold select-none">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Auto-scroll Marquee */}
      <div className={`w-full h-full ${isUserInteracting ? 'hidden' : 'block'}`}>
        <Marquee 
          ref={marqueeRef}
          direction="right" 
          gradient={false} 
          speed={45} 
          pauseOnHover={true}
        >
        {seasons.map((item, index) => (
            <Link 
              key={index} 
              to={item.url}
              className="mx-4 min-w-[200px] text-center"
              onMouseEnter={() => setIsUserInteracting(true)}
              onMouseLeave={() => {
                setTimeout(() => setIsUserInteracting(false), 1000);
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="cursor-pointer rounded-xl w-[300px] h-[400px] object-cover shadow-lg"
                title={item.name}
                onClick={() => {
                  setIsUserInteracting(true);
                  setTimeout(() => setIsUserInteracting(false), 5000);
                }}
              >
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="mt-2 text-3xl font-[Inter] text-[#514747] font-bold">{item.name}</p>
            </Link>
          ))}
        </Marquee>
      </div>

      {/* Scroll Indicators */}
      {isUserInteracting && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          </div>
        </div>
      )}

      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VideoCarousel;
