import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMenu3Line } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { slugify } from '../utils/slugify.jsx';
import { ACCESSORY_MENU_GROUPS } from '../config/accessoryMenuGroups.js';
import { useAccessoryCategories } from '../hooks/useAccessoryCategories.js';

const navLinkStyle = ({ isActive }) =>
  `font-[Inter] text-[#514747] font-normal text-sm xl:text-base 2xl:text-lg leading-[100%] pb-1 border-b-2 transition-all duration-200 ${isActive ? ' border-[#514747]' : 'border-transparent text-[#514747]'
  }`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [infrastructureDropdownOpen, setInfrastructureDropdownOpen] = useState(false);
  const { categories, slugSet, loading, error } = useAccessoryCategories();

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => a.label.localeCompare(b.label));
  }, [categories]);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <div className={`fixed top-0 left-0 z-50 w-full h-[90px] px-4 sm:px-6 md:px-12 lg:px-20 transition-all duration-300 bg-white shadow-md`}>

      <div className="flex items-center justify-between w-full h-full">
        <a href="/" className="text-lg sm:text-xl md:text-4xl font-bold font-[Inter]">The <span className="font-['Dancing_Script',cursive] font-bold">Glitter Export</span></a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-4 xl:gap-6 2xl:gap-8 items-center h-full">
          <li><NavLink to="/" className={navLinkStyle}>Apparels </NavLink></li>
          {/* Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <NavLink to="/accessories" className={navLinkStyle}>Accessories</NavLink>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-8 left-20 -translate-x-1/2 mt-2 bg-white shadow-lg rounded-md z-50 w-[90vw] max-w-[1000px] p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-4 lg:gap-6"
                >
                  <div className="lg:border-r lg:pr-6 lg:min-w-[200px]">
                    <h4 className="font-semibold text-2xl font-['Dancing_Script',cursive] text-[#514747] mb-2">Catalog</h4>
                    <ul className="space-y-1 pl-2 font-[Inter] text-[20px] text-[#514747]">
                      <li><NavLink to="/products" className="font-medium text-[#8B7355]">View all products</NavLink></li>
                    </ul>
                  </div>
                  <div className="flex-1">
                    <ul className="space-y-1 pl-2 font-[Inter] text-[20px] text-[#514747] columns-2 lg:columns-3 gap-8">
                      {sortedCategories.map((cat) => (
                        <li key={cat.slug}>
                          <NavLink to={`/accessories/${cat.slug}`}>{cat.label}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          {/* About Us Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <NavLink to="/aboutus" className={navLinkStyle}>About Us</NavLink>
            <AnimatePresence>
              {aboutDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-8 left-0 mt-2 z-50 w-64 p-2 bg-white shadow-lg rounded-md"
                >
                  <ul className="space-y-3 font-[Inter] text-[18px] text-[#514747] hover:text-[#EEDCC6]">
                    <li><NavLink to="/aboutus">Our Story</NavLink></li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          {/* Infrastructure Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setInfrastructureDropdownOpen(true)}
            onMouseLeave={() => setInfrastructureDropdownOpen(false)}
          >
            <NavLink to="/infrastructure" className={navLinkStyle}>Infrastructure</NavLink>
            <AnimatePresence>
              {infrastructureDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-8 left-0 mt-2 z-50 w-64 p-2 bg-white shadow-lg rounded-md"
                >
                  <ul className="space-y-3 font-[Inter] text-[18px] text-[#514747] hover:text-[#EEDCC6]">
                    <li><NavLink to="/infrastructure/ethical-manufacturing">Ethical Manufacturing</NavLink></li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li><NavLink to="/trending" className={navLinkStyle}>Trending</NavLink></li>
          <li><NavLink to="/testimonals" className={navLinkStyle}>Testimonials</NavLink></li>
          <li><NavLink to="/blogs" className={navLinkStyle}>Blogs</NavLink></li>
          <li><NavLink to="/faq" className={navLinkStyle}>FAQs</NavLink></li>
          <li>
            <NavLink
              to="/contact"
              className="bg-gradient-to-r from-[#8B7355] to-[#EEDCC6] hover:from-[#6B4E31] hover:to-[#D2B48C] border-0 italic px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full text-white font-[Inter] text-xs sm:text-sm lg:text-md leading-[100%] whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Book an Appointment
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden text-2xl sm:text-3xl cursor-pointer">
          <RiMenu3Line onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col px-6 py-10"
          >
            <div className="absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={toggleMenu}>
              <motion.div
                initial={{ rotate: 0, y: -6 }}
                animate={{ rotate: 45, y: 0 }}
                className="absolute w-8 h-[2px] bg-black"
              />
              <motion.div
                initial={{ rotate: 0, y: 6 }}
                animate={{ rotate: -45, y: 0 }}
                className="absolute w-8 h-[2px] bg-black"
              />
            </div>

            <div className="mt-20 flex flex-col items-start gap-6 font-[Inter] text-[24px] leading-[100%]">
              {[
                { to: "/", label: "Apparels " },
                { to: "/products", label: "All products" },
                { to: "/accessories", label: "Our Products" },
                { to: "/aboutus", label: "About Us" },
                { to: "/aboutus/our-story", label: "Our Story" },
                { to: "/infrastructure", label: "Infrastructure" },
                { to: "/infrastructure/ethical-manufacturing", label: "Ethical Manufacturing" },
                { to: "/trending", label: "Trending" },
                { to: "/blogs", label: "Blogs" },
                { to: "/testimonals", label: "Testimonials" },
                { to: "/faq", label: "FAQ" }
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-[#EEDCC6] pb-1 border-b-2 ${isActive ? 'border-[#EEDCC6]' : 'border-transparent'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-transparent px-5 py-2 rounded-md text-white"
              >
                Book an Appointment
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
