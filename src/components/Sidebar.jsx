// pages/AccessorySidebar.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { slugify } from '../utils/slugify';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessoryCategories } from '../hooks/useAccessoryCategories.js';
import { useAccessoryFestivals } from '../hooks/useAccessoryFestivals.js';

const Sidebar = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { categories } = useAccessoryCategories();
  const { festivals } = useAccessoryFestivals();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const matchedCategory = categories.find(cat => cat.slug === type);
    const matchedFestival = festivals.find(f => f.slug === type);
    if (matchedCategory) {
      setSelectedCategory(matchedCategory);
      setSelectedFestival(null);
    } else if (matchedFestival) {
      setSelectedFestival(matchedFestival);
      setSelectedCategory(null);
    }
  }, [type, categories, festivals]);

  const DrawerContent = () => (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full w-3/4 bg-white z-50 p-6 shadow-lg overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Browse by</h2>
        <button onClick={() => setDrawerOpen(false)}><FiX size={28} /></button>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Categories</h3>
        <ul className="space-y-1 text-base">
          {categories.map(cat => (
            <li
              key={cat.slug}
              className={`cursor-pointer px-1 py-1 rounded ${
                selectedCategory?.slug === cat.slug ? 'font-bold' : ''
              }`}
              onClick={() => {
                setDrawerOpen(false);
                navigate(`/accessories/${cat.slug}`);
              }}
            >
              {cat.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Shop by Season</h3>
        <ul className="space-y-1 text-base">
          {festivals.map(festival => (
            <li
              key={festival.slug}
              className={`cursor-pointer px-1 py-1 rounded ${
                selectedFestival?.slug === festival.slug ? 'font-bold' : ''
              }`}
              onClick={() => {
                setDrawerOpen(false);
                navigate(`/accessories/${festival.slug}`);
              }}
            >
              {festival.label}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-2">Custom Requests</h3>
        <ul className="text-base">
          <li className="cursor-pointer hover:font-medium">Custom Packaging</li>
        </ul>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Mobile Trigger Button */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center space-x-2 border px-6 py-2 rounded text-base font-medium"
        >
          <FiMenu size={20} />
          <span>Browse by Category</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setDrawerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <DrawerContent />
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-1/6 p-6 border-r  text-[#514747]">
        <h2 className="text-4xl font-poppins font-medium mb-2 text-[#666]">Browse by</h2>
        <hr className="mb-2" />
        {/* same category + season lists here */}
        <div className="mb-6">
          <h3 className="text-3xl font-bold mb-2 text-[#514747] font-['Dancing_Script',cursive]">Categories</h3>
          <hr className="mb-2" />
          <ul className="space-y-1 text-lg max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {categories.map(cat => (
              <li
                key={cat.slug}
                className={`cursor-pointer font-sans px-1 py-1 hover:font-medium rounded ${
                  selectedCategory?.slug === cat.slug ? 'font-bold' : ''
                }`}
                onClick={() => navigate(`/accessories/${cat.slug}`)}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <hr className="mb-2" />
          <h3 className="text-3xl font-bold mb-2 text-[#514747] font-['Dancing_Script',cursive]">Shop by Season</h3>
          <hr className="mb-2" />
          <ul className="space-y-1 text-lg max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {festivals.map(festival => (
              <li
                key={festival.slug}
                className={`cursor-pointer font-sans px-1 py-1 rounded hover:font-medium ${
                  selectedFestival?.slug === festival.slug ? 'font-bold' : ''
                }`}
                onClick={() => navigate(`/accessories/${festival.slug}`)}
              >
                {festival.label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <hr className="mb-2" />
          <h3 className="text-3xl font-bold mb-2 text-[#514747] font-['Dancing_Script',cursive]">Custom Requests</h3>
          <hr className="mb-2" />
          <ul className="text-lg">
            <li className="cursor-pointer font-sans hover:font-medium">Custom Packaging</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;