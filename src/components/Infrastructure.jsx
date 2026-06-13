import React from 'react';
import { useNavigate } from 'react-router-dom';
import factory from '../assets/infra1.png'; // Replace with your actual image

const Infrastructure = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div
      className="relative bg-cover bg-center py-16 px-4 bg-white"
    >
      <div className="text-center mb-12">
        <h2 className="text-6xl font-bold font-[Inter] text-[#000000]"
          style={{ fontSize: '80px' }}>
          Trusted overseas <span className="font-['Dancing_Script',cursive]">apparels manufacturer</span>
        </h2>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">

        {/* Image Left */}
        <div className="md:w-1/3 w-full ">
          <img src={factory} alt="Factory" className="rounded-lg w-full h-[400px] object-cover" />
        </div>

        {/* Middle Text */}
        <div className="md:w-1/3 w-full text-left text-[#000000] font-medium">
          <h3 className="text-3xl font-bold font-[Inter] text-[#514747]">Turning your idea into reality.</h3><br />
          <p className="font-['Dancing_Script',cursive] text-[#514747] text-4xl leading-relaxed">
            Just fill the contact form with your details along with your apparels requirements
            <br />
            and we’ll get back to you within 24hrs.
          </p>
        </div>

        {/* Right Highlight Text with green circular background */}
        <div className="md:w-1/3 w-full relative flex justify-center items-center">
          <div
            className="rounded-full px-6 py-8 text-center w-[400px] h-[400px] flex flex-col items-center justify-center gap-4"
            style={{
              background: '#EDE8D0',
              clipPath: 'circle(50% at center)',
              overflow: 'hidden'
            }}
          >
            <h3 className="text-8xl font-bold font-[Inter] text-[#000000]">24X7</h3>
            <button
              onClick={handleContactClick}
              className="bg-[#000000] text-white px-4 py-2 rounded-full hover:bg-[#333333] transition-colors duration-300 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
