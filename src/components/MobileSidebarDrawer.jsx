// components/MobileSidebarDrawer.jsx
import React, { useState } from 'react';
import { slugify } from '../utils/slugify.jsx';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAccessoryCategories } from '../hooks/useAccessoryCategories.js';

const seasons = [
  "Valentine’s Day", "Crawfish Boil", "Mardi Gras", "Back to school", "Rodeo/Derby",
  "Summer", "Cancer Awareness", "Sorority", "Game Day", "High School/Collegiate",
  "Easter", "4th July", "Ramadan/Eid", "Queen’s B’day", "Disney/Swiftie",
  "Thanksgiving", "St. Patrick’s Day", "Halloween", "Christmas", "New Year",
  "Baby Shower", "Mother’s Day"
];
const MobileSidebarDrawer = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { categories } = useAccessoryCategories();

  const selectedCategory = categories.find((c) => c.slug === type);
  const selectedSeason = seasons.find(season => slugify(season) === type);

  return (
    <div className="md:hidden">
      {/* Trigger Button */}
      <div className="p-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center space-x-2 border px-6 py-2 rounded text-base font-medium"
        >
          <FiMenu size={20} />
          <span>Browse by Category</span>
        </button>
      </div>

      {/* Drawer and Backdrop */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0  bg-opacity-60 z-40 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
            className="fixed top-24 left-0 w-3/4 bottom-0 bg-white z-50 p-6 overflow-y-auto max-h-[calc(100vh-6rem)]"

            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Browse by</h2>
                <button onClick={() => setDrawerOpen(false)}><FiX size={28} /></button>
              </div>

              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2 text-[#514747] font-['Dancing_Script',cursive]">Categories</h3>
                <ul className="space-y-1 text-base">
                  {categories.map((cat) => (
                    <li
                      key={cat.slug}
                      className={`cursor-pointer px-1 py-1 rounded ${
                        selectedCategory?.slug === cat.slug ? 'font-bold' : ''
                      }`}
                      onClick={() => {
                        navigate(`/accessories/${encodeURIComponent(cat.slug)}`);
                        setDrawerOpen(false);
                      }}
                    >
                      {cat.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2 text-[#514747] font-['Dancing_Script',cursive]">Shop by Season</h3>
                <ul className="space-y-1 text-base">
                  {seasons.map(season => (
                    <li
                      key={season}
                      className={`cursor-pointer px-1 py-1 rounded ${
                        slugify(selectedSeason || '') === slugify(season) ? 'font-bold' : ''
                      }`}
                      onClick={() => {
                        navigate(`/accessories/${slugify(season)}`);
                        setDrawerOpen(false);
                      }}
                    >
                      {season}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-2 text-[#514747] font-['Dancing_Script',cursive]">Custom Requests</h3>
                <ul className="text-base">
                  <li className="cursor-pointer hover:font-medium">Custom Packaging</li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSidebarDrawer;
