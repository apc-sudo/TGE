import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Trending from '../components/Trending';
import ShopBySeason from '../components/ShopBySeason';
import Ethical from '../components/Ethical';
import VideoSection from '../components/VideoSection';
import OurFounders from '../components/OurFounders';
import OurGallery from '../components/OurGallery';
import HowToPlaceOrder from '../components/HowToPlaceOrder';
import Infrastructure from '../components/Infrastructure';
import logo from '../assets/logo-removebg-preview.png';
import ErrorBoundary from '../components/ErrorBoundary';

const words = ['Exporter', 'Manufacturer'];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    const timeout = setTimeout(() => {
      setText(prev =>
        deleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
      );

      if (!deleting && text === currentWord) {
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      }
    }, 120);

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <>
      <Navbar />

      {/* Background Video Section */}
      <div className="relative w-full h-screen">
        <ErrorBoundary>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'bleftness(0.7)' }}
          >
            <source
              src="https://gte-media-assets.s3.eu-north-1.amazonaws.com/TGE+website+video.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </ErrorBoundary>

        {/* Text Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-4 space-y-4 pt-20 z-10 lg:pl-20">
          <div className="flex flex-col items-start bg-[#EDE8D0] opacity-80 backdrop-blur-sm p-6 rounded-lg text-black" style={{ zoom: '1', transform: 'scale(1)', transformOrigin: 'top left' }}>
            <motion.h1
              className="font-[Inter] text-2xl sm:text-4xl lg:text-7xl font-bold text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={logo}
                alt="Logo"
                className="h-[120px] sm:h-[150px] lg:h-[206px] cursor-pointer mb-6 lg:mb-10 mx-auto"
              />
            </motion.h1>

            <motion.p
              className="sm:text-4xl lg:text-6xl italic text-black text-left font-['Dancing_Script',cursive]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              All-in-1
            </motion.p>

            <div className="text-2xl sm:text-3xl lg:text-7xl font-semibold h-[40px] sm:h-[50px] lg:h-[60px] mt-5 text-left text-black">
              {text}
              <motion.span
                className="inline-block w-1 bg-black ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            </div>

            <p className="text-2xl sm:text-3xl lg:text-5xl font-['Dancing_Script',cursive] italic text-black mt-7 text-left px-4">
              for your apparels brand.
            </p>
            <p className="text-lg sm:text-xl font-bold text-black mt-3 text-left px-4">
              Getting started with us is easy.
            </p>
            <p className='text-lg sm:text-xl italic text-black mt-3 text-left px-4 mb-3'>
              Just share your apparels idea with us <br /> and we will take care of everything from sampling to <br /> delivering your apparels production.
            </p>
          </div>
        </div>
      </div>

      <ShopBySeason />
      <Trending />
      <Ethical />
      <HowToPlaceOrder />
      <OurFounders />
      <OurGallery />
      <Infrastructure />
    </>
  );
};

export default Home;

