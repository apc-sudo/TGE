import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import axiosInstance from '../utils/axiosInstance'; // Axios instance with baseURL

// Import blog images
import blog1 from '../assets/blog1.jpg';
import blog2 from '../assets/blog2.jpg';
import blog3 from '../assets/blog3.jpg';
import blog4 from '../assets/blog4.png';

// Static blog data
const staticBlogs = [
  {
    id: 'static-1',
    blog_title: 'A Global Journey: Tracing the Export Success of The Glitter Export',
    blog_image: blog1,
    created_date: '2024-01-15',
    blog_content: 'Discover how The Glitter Export has successfully expanded its handcrafted apparels to over 30+ countries worldwide, building a global network of satisfied customers and international recognition.',
    is_static: true
  },
  {
    id: 'static-2',
    blog_title: 'The Rise of Artisan Accessories: Celebrating Traditional Craftsmanship in Modern Fashion',
    blog_image: blog2,
    created_date: '2024-01-10',
    blog_content: 'Explore the renaissance of artisan-made apparels and how traditional craftsmanship techniques are finding their place in contemporary fashion trends.',
    is_static: true
  },
  {
    id: 'static-3',
    blog_title: 'Quality and Craftsmanship: The The Glitter Export Promise',
    blog_image: blog3,
    created_date: '2024-01-05',
    blog_content: 'Learn about our commitment to exceptional quality and the meticulous craftsmanship process that goes into every The Glitter Export accessory.',
    is_static: true
  },
  {
    id: 'static-4',
    blog_title: 'How to Style Beaded Apparels for Every Occasion – Expert Advice',
    blog_image: blog4,
    created_date: '2024-01-01',
    blog_content: 'Get expert styling tips on how to incorporate beaded apparels into your wardrobe for different occasions, from casual outings to formal events.',
    is_static: true
  }
];

// Utility to convert blog title into slug
const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Blog card with animation
const BlogCard = ({ blog, delay, direction, onBlogClick }) => {
  const controls = useAnimation();
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          controls.set({ opacity: 0, x: direction === 'left' ? -100 : 100 });
          await controls.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, delay },
          });
        } else {
          controls.set({ opacity: 0, x: direction === 'left' ? -100 : 100 });
        }
      },
      { threshold: 0.3 }
    );

    const node = ref.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [controls, delay, direction]);

  // Format created_date safely
  const formattedDate = blog.created_date
    ? new Date(blog.created_date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    : 'Date unavailable';

  return (
    <div className="cursor-pointer">
      <motion.div
        ref={ref}
        animate={controls}
        initial={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
        className="bg-white shadow-lg overflow-hidden h-[500px] flex flex-col"
        onClick={() => onBlogClick(blog)}
      >
        <div className="h-[350px] relative group">
          <img
            src={blog.blog_image}
            alt={blog.blog_title}
            className="w-full h-full object-cover object-top transition duration-300 group-hover:blur-sm"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-[#EEDCC6] px-4 py-2 rounded text-white font-semibold cursor-pointer">
              READ »
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base mt-auto font-semibold leading-snug mb-3 line-clamp-4">
            {blog.blog_title}
          </h3>
          <p className="text-[#018A8C] font-semibold">{formattedDate}</p>
        </div>
      </motion.div>
    </div>
  );
};

// Modal component for static blogs
const BlogModal = ({ blog, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !blog) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
          >
            ×
          </button>
          <img
            src={blog.blog_image}
            alt={blog.blog_title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-[#514747] mb-4">
              {blog.blog_title}
            </h2>
            <p className="text-[#018A8C] font-semibold mb-4">
              {new Date(blog.created_date).toLocaleDateString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              })}
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              {blog.blog_content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState(staticBlogs); // Initialize with static blogs
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDirection = (rowIndex) => (rowIndex % 2 === 0 ? 'left' : 'right');

  const handleBlogClick = (blog) => {
    if (blog.is_static) {
      setSelectedBlog(blog);
      setIsModalOpen(true);
    } else {
      const slug = slugify(blog.blog_title);
      window.location.href = `/blog/${slug}`;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  useEffect(() => {
    axiosInstance
      .get('/blogs/')
      .then((res) => {
        // Combine static blogs with API blogs
        const combinedBlogs = [...staticBlogs, ...res.data];
        setBlogs(combinedBlogs);
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err);
        // Keep static blogs even if API fails
        setBlogs(staticBlogs);
      });
  }, []);

  return (
    <div
      className="px-4 py-12 mt-10 overflow-x-hidden bg-cover bg-center min-h-screen bg-[#d6c2aa]">
      <div className="relative z-10 flex flex-col items-center px-4 py-5 lg:px-20">
        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-bold font-[Inter] text-[#514747] text-center ">
          The Blogs

        </h2>

      </div>
      <div className="max-w-[1400px] mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const direction = getDirection(row);
            const delay = direction === 'left' ? col : 2 - col;

            return (
              <BlogCard
                key={blog.id}
                blog={blog}
                delay={delay * 0.3}
                direction={direction}
                onBlogClick={handleBlogClick}
              />
            );
          })}
        </div>
      </div>
      <BlogModal
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Blogs;