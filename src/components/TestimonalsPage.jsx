import React from 'react';
import { motion } from 'framer-motion';
import client1 from '../assets/client1.jpg';
import client2 from '../assets/client2.jpg';
import client3 from '../assets/client3.jpg';
import client4 from '../assets/client4.jpg';
import client5 from '../assets/client5.jpg';
import client6 from '../assets/client6.jpg';
import client7 from '../assets/client7.jpg';
import client8 from '../assets/client8.jpg';
import client9 from '../assets/client9.jpg';
import client10 from '../assets/client10.webp';
import TestimonialCards from './TestimonalCards';

const TestimonalsPage = () => {
  const testimonials = [
    {
      content: "As a boutique owner, my experience with THE GLITTER EXPORTS has been excellent. The jerseys, T-shirts, and sweatshirts were beautifully made with great attention to detail, premium-quality fabrics, and clean finishing.",
      image: client1,
      name: "Samantha",
      role: "Client",
    },
    {
      content: "Our ordering experience was seamless from beginning to end. Communication was easy, the delivery was right on schedule, and everything arrived safely and perfectly packed. It really added a special touch to our day.",
      image: client2,
      name: "Heather",
      role: "Client",
    },
    {
      content: "I discovered this exporter through a friend and then checked out their Instagram and Alibaba pages. I was instantly impressed by their collection — the craftsmanship is beautiful, with detailed work, high-quality finishing, and a special character in each garment.",
      image: client3,
      name: "Ashley",
      role: "Client",
    },
    {
      content: "THE GLITTER EXPORTS is a reliable and detail-oriented exporter. Their free mockup service was very helpful, and the final apparel we received was perfectly finished and exactly as described. We’re very satisfied and look forward to placing more orders.",
      image: client4,
      name: "Katherine",
      role: "Client",
    },
    {
      content: "This was my first time ordering handcrafted apparels from India and I couldn’t be happier with the experience. The quality and detailing were impressive, and you could tell the pieces were made with care. I had a few questions at the start but the team at The Glitter Export was helpful and responsive throughout. Would definitely recommend them to anyone looking for something unique and thoughtfully made.",
      image: client5,
      name: "Linda",
      role: "Client",
    },
    {
      content: "Beautiful hand-worked apparel, super-soft and comfortable T-shirts (kid-friendly too!), and very budget-friendly. Exactly what we were looking for!",
      image: client6,
      name: "Brittany",
      role: "Client",
    },
    {
      content: "I ordered sequin T-shirts from India for the first time and absolutely loved them! The quality and detailing are amazing, and you can tell they were made with real care.",
      image: client7,
      name: "Kimberly",
      role: "Client",
    },
    {
      content: "Their free mockup service was extremely helpful, and the staff was very supportive and understanding. They showed us our products being stitched through video calls, and once we approved them, they shipped the final apparel. Fully satisfied with their service.",
      image: client8,
      name: "Magnolia",
      role: "Client",
    },
    {
      content: "The communication and service were excellent. They kept us updated at every stage and ensured everything was customized exactly as per our requirements.",
      image: client9,
      name: "Hannah",
      role: "Client",
    },
    {
      content: "Very reliable and customer-focused company. They listened carefully to our needs and delivered high-quality apparel with perfect customization",
      image: client10,
      name: "Holly",
      role: "Client",
    }
  ];

  return (
    <div
      className="px-2 mt-24 overflow-x-hidden bg-cover bg-center bg-[#EDE8D0]"
    >
      <div className="relative z-10 flex flex-col items-center px-4 py-5 lg:px-20">
        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-bold font-[Inter] text-[#000000] text-center"
          style={{ fontSize: '80px' }}
        >
          What our {' '}
          <span className="font-['Dancing_Script',cursive]">Client Say</span>
        </h2>

      </div>
      {testimonials.map((t, index) => (
        <TestimonialCards
          key={index}
          {...t}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
};

export default TestimonalsPage;
