import React from 'react';
import swatiImg from '../assets/swatiImg.png';
import kamalImg from '../assets/founder1.jpg';
import group from '../assets/team_photo.png';
import Slider from "react-slick";
import about1 from '../assets/about1.jpg';
import about2 from '../assets/about2.jpg';
import about3 from '../assets/about3.jpg';
import about4 from '../assets/about4.png';
import about5 from '../assets/about5.png';

import asso1 from '../assets/asso1.png';
import asso2 from '../assets/asso2.png';
import asso3 from '../assets/asso3.jpg';
// Inside AboutUs component
const teamImages = [
  about1,
  about2,
  about3,
  about4,
  about5,
];
const AboutUs = () => {
  return (
    <div className="overflow-x-hidden mt-[90px]">

      <div className="relative ">

        <img
          src={group}
          alt="Group of Employees"
          className="w-full h-[350px] md:h-full shadow-lg"
        />
        <div className='inset-0 bg-black/50 absolute '>
          <div className="absolute bottom-4 md:bottom-32 left-4 md:left-32 w-full text-left">

            <h2 className="text-6xl font-semibold font-[Inter] text-white mb-3">
              About Us
            </h2>
            <p className="text-3xl p-2 md:p-0 md:text-5xl  mb-10 text-white font-['Dancing_Script',cursive] ">
              The People Who Make It Happen - Founders and Founders' Story
            </p>
          </div>
        </div>
      </div>
      <div
        className="overflow-x-hidden bg-no-repeat bg-cover bg-fixed"
      >
        <h2 className="text-6xl font-semibold font-[Inter] text-center mt-10  text-[#514747] mb-5">
          Meet Our <span className="font-['Dancing_Script',cursive]">Founders</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-28 items-center mb-20 px-10">

          <div
            className="relative flex justify-center w-full"
          >
            <div className="relative">
              <img
                src={swatiImg}
                alt="swatipiplani"
                className="w-[600px] h-[550px] object-cover object-center"
              />
              {/* Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform flex ">
                <div className="bg-[#d6c2aa] text-black p-4 shadow-md w-36 text-center">
                  <p className="text-3xl font-bold">1K+</p>
                  <p className="text-l text-center">projects succeeded</p>
                </div>
                <div className="bg-[#1a1a1a] text-white p-4 shadow-md w-36 text-center">
                  <p className="text-3xl font-bold">8yrs+</p>
                  <p className="text-l text-center">of professional experience</p>
                </div>
              </div>
            </div>
          </div>


          {/* Right side description */}
          <div className="text-lg font-[Inter] text-[#514747] leading-relaxed">
            <h3 className="text-5xl font-semibold font-[Inter] text-[#514747] mb-1">Swati Piplani</h3>
            <p className="font-[Inter] text-[#514747] mb-4 text-2xl">Co-Founder</p>
            <p className="mb-4 text-2xl">
              Swati Piplani is an MBA Finance professional who transitioned from a corporate career to becoming a successful woman entrepreneur. Her journey began with a strong desire to build something of her own, where she could invest her time and effectively utilize the skills she gained through six years of corporate experience working with prestigious organizations such as JP Morgan Chase, Tata, CBRE, and Boston Consulting Group. These experiences instilled in her the confidence to build a team and work tirelessly toward creating her own venture.
            </p>
            <p className="mb-4 text-2xl">
              Today, she is the founder of a fashion export brand where Indian craftsmanship seamlessly blends with modern global trends. Swati takes immense pride in delivering handcrafted Indian apparel to clients across the world, gaining recognition and appreciation for quality and design. The brand now caters to over 15 countries, including the United States, Australia, and the Middle Eas
            </p>
          </div>
        </div>

        {/* Kamal Section */}
        <div className="grid md:grid-cols-2 gap-28 items-center mb-20 px-10">
          {/* Left text block */}
          <div className="text-lg font-[Inter] text-[#514747] leading-relaxed">
            <h3 className="text-5xl font-semibold font-[Inter] text-[#514747] mb-1">Kamal Piplani</h3>
            <p className="font-[Inter] text-[#514747] mb-4 text-2xl">Co-Founder</p>
            <p className="mb-4  text-2xl">
              Kamal Piplani, a BBA graduate from Symbiosis and MBA from IMT Ghaziabad, co-founded The Glitter Export in 2018 alongside Akansha. With a strategic mindset, he focuses on business growth, international expansion, and driving operational excellence for the brand.
            </p>
            <p className="mb-4  text-2xl">
              His sharp business acumen complements the creative foundation of the company, helping scale it into a globally respected name in fashion accessories. Kamal continues to steer The Glitter Export with a vision rooted in quality, purpose, and sustainable impact.
            </p>
          </div>
          {/* Image with overlay */}
          <div
            className="relative w-full  order-1 md:order-2"
          >
            <img
              src={kamalImg}
              alt="Kamal Piplani"
              className="w-full h-[750px] object-cover object-center object-top"
            />
            <div className="absolute bottom-4  flex left-1/2 transform -translate-x-1/2 ">
              {/* Box 1 - Red */}
              <div className="bg-[#d6c2aa] text-black p-4 text-center shadow-md w-36">
                <p className="text-3xl text-center font-bold">1K+</p>
                <p className="text-l text-center">projects succeeded</p>
              </div>

              {/* Box 2 - Dark (Black or Dark Gray) */}
              <div className="bg-[#1a1a1a] text-white p-4 text-center shadow-md w-36">
                <p className="text-3xl font-bold">12yrs+</p>
                <p className="text-l text-center">of professional experience</p>
              </div>
            </div>

          </div>
        </div>

        {/* Video Section */}
        {/* Video Section */}
        {/* Our Story Section */}
        {/* Our Story Section */}
        <div className="mt-20 px-4 pt-10 sm:px-8 bg-[#d6c2aa]">
          <h3 className="text-4xl md:text-6xl font-semibold text-center font-['Dancing_Script',cursive] text-[#514747] mb-2">
            <span className="font-['Inter']">Our </span> Story
          </h3>
          <p className="text-center font-[Inter] text-[#514747] text-lg font-medium mb-10">
            The Glitter Export – a legacy of design, detail & dedication in accessories
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-start py-10">
            {/* Left Image Slider */}
            <div className="w-full md:w-1/2">
              <Slider
                dots={true}
                infinite={true}
                speed={1000}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={3000}
                arrows={false}
                pauseOnHover={false}
              >
                {teamImages.map((src, index) => (
                  <div key={index}>
                    <img
                      src={src}
                      alt={`Story Image ${index + 1}`}
                      className="w-full h-[600px] object-cover object-fit shadow-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Right Single Content Block */}
            <div
              className="w-full md:w-1/2 bg-white shadow-xl p-4 md:p-6 h-auto md:h-[600px] overflow-y-auto"
            >
              <p className="font-[Inter] text-[#514747] text-sm md:text-base leading-relaxed">
                Our journey to becoming India's top-rated and trending apparels manufacturer and exporter began in 2016, when our co-founder and creative director <strong>Akansha Piplani</strong> completed her post-graduation in fashion design. Early work with international fashion labels revealed an essential truth: a great design deserves a great manufacturer.<br /><br />

                This insight led her to start a small-batch setup called <strong>The Glitter Export®</strong> in 2018, with one mission: to honour every design through super-specialized production. The guiding principle was simple—whatever we make must be extraordinary.<br /><br />

                Building on this strong foundation, <strong>The Glitter Export</strong> emerged as a brand for handcrafted fashion accessories. Born out of passion and bolstered by family support, the brand secured its first international order within just three months of starting its business.<br /><br />

                <strong>The Glitter Export®</strong> is a process-oriented, highly quality-conscious apparels manufacturer with great understanding of design technicality, colour code, cut & finish, tailoring, fabric selection and its relevance to your design and brand, printing techniques and outstanding hand-works which are essential for effective work on your custom design.<br /><br />

                We have dedicated ourselves to providing state-of-the-art, technology-equipped production factories in 3 rural areas to meet the fast-changing fashion industry line in accessories, with a capacity of producing more than <strong>50,000+ apparels monthly</strong>. Be it headbands, clutches, tote bags, bag straps, earrings, or any other product—we possess great know-how to surprise with our exquisite workmanship at the most affordable price in all lines of accessories!
              </p>
            </div>
          </div>
        </div>




        <div className="mt-20 mb-10">
          <h3 className="text-3xl md:text-5xl font-semibold text-center font-[Inter] text-[#514747] mb-2"
            style={{ fontSize: '50px' }}
          >
            Association
          </h3>
          <div className='flex flex-col md:flex-row justify-center gap-16 items-center mt-10'>
            <img src={asso1} alt='asso1' className='w-102 h-90 object-contain' />
            <img src={asso2} alt='asso2' className='w-102 h-90 object-contain' />
            <img src={asso3} alt='asso3' className='w-102 h-90 object-contain' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
