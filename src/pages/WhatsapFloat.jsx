import React from 'react';
import whatsappIcon from '../assets/whatsappicon.svg';

// Replace 'YOUR_PHONE_NUMBER' with your WhatsApp number in international format, e.g., '1234567890' for +1 234 567 890
const whatsappNumber = 'YOUR_PHONE_NUMBER'; // <-- Put your WhatsApp number here
const message = 'Hello! I would like to know more about your products.';

const WhatsappFloat = () => {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[1000] bg-[#25D366] rounded-full w-15 h-15 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 no-underline"
      aria-label="Chat on WhatsApp"
    >
      <img 
        src={whatsappIcon} 
        alt="WhatsApp" 
        className="w-8 h-8" 
      />
    </a>
  );
};

export default WhatsappFloat; 