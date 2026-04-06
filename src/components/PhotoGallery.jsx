import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import infra1 from '../assets/infra1.png'
import infra2 from '../assets/infra2.jpeg'
import infra3 from '../assets/infra3.jpeg'
import infra4 from '../assets/infra4.jpeg'
// Sample gallery images (replace with your actual image imports or URLs)
const galleryImages = [
  infra1,
  infra2,
  infra3,
  infra4,
];

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="px-4 py-12 bg-[#d6c2aa] max-w-screen-xl mx-auto">
        <h2 className="text-6xl font-semibold text-center mb-8 font-['Inter'] text-[#514747]">Infrastructure of <span className="font-['Dancing_Script',cursive]">The Glitter Export</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => setSelectedImage(img)}
            >
              <img src={img} alt={`Gallery ${index}`} className="w-full h-72 object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <FaPlus className="text-white text-4xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full px-4">
              <img src={selectedImage} alt="Large" className="w-full max-h-[90vh] object-contain rounded-md" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-9 text-white bg-black bg-opacity-60 w-10 h-10 rounded-full text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

    </>
  );
};
export default PhotoGallery;