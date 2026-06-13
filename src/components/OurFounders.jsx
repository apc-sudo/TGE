import React from 'react';
import swati from '../assets/swatiImg.png';
import kamal from '../assets/founder1.jpg';
import { FaLinkedin } from "react-icons/fa";

const OurFounders = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#ffffff]">

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-24 lg:px-20">
        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-bold font-[Inter] text-[#8B7355] text-center mb-12"
          style={{ fontSize: '80px' }}>
          Meet <span className="font-['Dancing_Script',cursive]">the Founders</span>
        </h2>

        {/* Founder Images with Hover Overlay */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-14">
          {/* Swati */}
          <div className="relative group w-72 h-[450px] border-4 border-[#514747] overflow-hidden">
            <img
              src={swati}
              alt="Swati"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-70 transition-opacity duration-300">
              <h3 className="text-3xl font-bold">Swati Piplani</h3>
              <p className="text-xl mb-2">Co-Founder</p>
              <div className='w-[96%] h-[2px] bg-[#FDF5E6] mb-2'></div>
              <p className="text-xl mb-2">swati.june100@gmail.com</p>
              <a
                href='https://www.linkedin.com/in/akansha-ahuja-23272673/'
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FDF5E6] rounded-full p-3 flex items-center justify-center hover:bg-[#F5DEB3] transition-colors"
              >
                <FaLinkedin size={20} className="text-blue-700" />
              </a>
            </div>
          </div>

          {/* Kamal */}
          <div className="relative group w-72 h-[450px] border-4 border-[#514747] overflow-hidden">
            <img
              src={kamal}
              alt="Kamal"
              className="w-full h-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-70 transition-opacity duration-300">
              <h3 className="text-3xl font-bold">Kamal Piplani</h3>
              <p className="text-xl mb-2">Co-Founder</p>
              <div className='w-[96%] h-[2px] bg-[#FDF5E6] mb-2'></div>
              <p className="text-xl mb-2">piplani.kamal@gmail.com</p>
              <a
                href='https://www.linkedin.com/in/kamal-piplani-562693373/'
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FDF5E6] rounded-full p-3 flex items-center justify-center hover:bg-[#F5DEB3] transition-colors"
              >
                <FaLinkedin size={20} className="text-blue-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="text-center max-w-4xl text-[#8B7355]">
          <h3 className="text-7xl font-['Dancing_Script',cursive] mb-4">Our Story</h3>
          <p className="text-2xl font-[Inter] leading-relaxed text-[#000000]">
            Founded in 2018 by Akansha and Kamal Piplani, The Glitter Export began with a bold
            vision to merge fashion with purpose and style with social impact. What started as a
            shared dream is now a globally recognized label known for its handcrafted excellence,
            conscious design, and community empowerment. Every piece tells a story of craft, care,
            and culture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurFounders;
