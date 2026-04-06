// components/AccessorySidebar.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { slugify } from '../utils/slugify.jsx';
import { useAccessoryCategories } from '../hooks/useAccessoryCategories.js';
import { useAccessoryFestivals } from '../hooks/useAccessoryFestivals.js';

const AccessorySidebar = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { categories } = useAccessoryCategories();
  const { festivals } = useAccessoryFestivals();

  const selectedCategory = categories.find((c) => c.slug === type);
  const selectedFestival = festivals.find(f => f.slug === type);

  return (
    <div className="hidden md:block w-1/6 p-6 border-r text-[#514747]">
      <h2 className="text-4xl font-poppins font-medium mb-2 text-[#666]">Browse by</h2>
      <hr className="mb-2" />

      <div className="mb-6">
        <h3 className="text-3xl font-bold mb-2 text-[#514747] font-['Dancing_Script',cursive]">Categories</h3>
        <hr className="mb-2" />
        <ul className="space-y-1 text-lg max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {categories.map((cat) => (
            <li
              key={cat.slug}
              className={`cursor-pointer font-sans px-1 py-1 hover:font-medium rounded ${
                selectedCategory?.slug === cat.slug ? 'font-bold' : ''
              }`}
              onClick={() => navigate(`/accessories/${encodeURIComponent(cat.slug)}`)}
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
  );
};

export default AccessorySidebar;
