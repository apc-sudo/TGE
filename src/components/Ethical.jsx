import React from 'react';
import centerImg from '../assets/onestop.png'; // Replace with your actual image

const Ethical = () => {
  return (
    <div className="relative w-full h-auto">
      {/* Background Image */}
      <div className="w-full h-full object-cover absolute top-0 left-0 z-0 bg-white" />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center py-20 px-4 md:px-12 lg:px-20">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-bold font-[Inter] text-[#000000] text-center mb-20"
          style={{ fontSize: '80px' }}>
          Flexible & {' '}
          <span className="font-['Dancing_Script',cursive] text-[#000000]">
            Fair Practices
          </span>
        </h2>

        {/* Figma-style content section */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-12 ">
          {/* Left Text Section */}
          <div className="flex-1">
            <h3 className="text-5xl md:text-5xl lg:text-6xl font-[Inter] font-semibold text-[#8B7355] mb-4">
              An Ethical <span className="font-['Dancing_Script',cursive]">overseas accessories</span> manufacturer.
            </h3>
            <p className="font-[Inter] text-xl text-[#514747] leading-relaxed mb-3">
              At <strong>The Glitter Export</strong>, we believe apparels should feel good —
              not just on your skin, but in your conscience too.
            </p>
            <p className="text-[#514747] font-[Inter]  text-xl leading-relaxed mb-3">
              We ensure every garment is ethically produced in line with fair trade standards.
              We are committed to empowering women by providing equal opportunities at every level
              of our organization.
            </p>
            <p className="text-xl font-[Inter] font-semibold text-[#514747]">Ensuring flexible & fair practices</p>
          </div>

          {/* Center Image */}
          <div className="flex-1 flex justify-center">
            <div className="text-center">
              <img src={centerImg} alt="Chair" className="w-[300px] h-[400px]  mb-2" />
              <p className="font-[Inter] text-2xl font-bold text-[#514747] leading-relaxed">Your One Stop Solution</p>
            </div>
          </div>

          {/* Right Icon + Text */}
          <div className="flex-1 text-center lg:text-left">
            <h4 className="text-4xl md:text-4xl lg:text-5xl font-bold text-[#8B7355] mb-2">ETHICAL MANUFACTURING & SOURCING</h4>
            <p className="text-[#514747] text-xl leading-relaxed">
              Its your responsibility too! Source from an Ethical Apparels Manufacturer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ethical;
