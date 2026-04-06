import React, { useState, useRef, useEffect } from 'react';

const VideoSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        console.log('Video loaded successfully');
        setVideoLoaded(true);
        setIsLoading(false);
      };

      const handleError = (e) => {
        console.error('Video loading error:', e);
        setVideoError(true);
        setIsLoading(false);
      };

      const handleLoadStart = () => {
        console.log('Video loading started');
        setIsLoading(true);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      video.addEventListener('loadstart', handleLoadStart);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadstart', handleLoadStart);
      };
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Video Unavailable</h2>
            <p className="text-xl mb-4">Unable to load the video content</p>
            <p className="text-sm opacity-70">Please check your internet connection</p>
          </div>
        </div>
      )}

      {/* Video Container */}
      <div className="w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          style={{ minHeight: '100vh' }}
        >
          <source
            src="https://apc-assets-2025.s3.ap-northeast-1.amazonaws.com/apc_videos/AP+CURATED+COUTURE.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Info Overlay */}
      {videoLoaded && (
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-2xl md:text-4xl font-bold font-[Inter] mb-2">
            The Glitter Export
          </h2>
          <p className="text-lg md:text-xl font-['Dancing_Script',cursive]">
            Experience Our Craftsmanship
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoSection; 