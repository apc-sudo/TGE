import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { motion } from 'framer-motion';
const chunkSentences = (text, chunkSize = 3) => {
  const sentenceRegex = /(?<!\d)\. (?=[A-Z])/g;
  const sentences = text.split(sentenceRegex).map(s => s.trim()).filter(Boolean);

  const chunks = [];
  for (let i = 0; i < sentences.length; i += chunkSize) {
    const chunk = sentences.slice(i, i + chunkSize).join('. ').trim();
    const endsWithPunctuation = /[.!?]$/.test(chunk);
    chunks.push(endsWithPunctuation ? chunk : chunk + '.');
  }

  return chunks;
};

const BlogDetail = () => {
  const { slug } = useParams();
  const { state } = useLocation();
  const [blog, setBlog] = useState(state?.blog || null);

  // Fetch from API only if blog not passed via state
  useEffect(() => {
    if (!blog) {
      axiosInstance.get('/blogs/')
        .then(res => {
          const found = res.data.find(item =>
            item.blog_title &&
            item.blog_title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
          );
          setBlog(found);
        })
        .catch(err => console.error("Failed to fetch blog:", err));
    }
  }, [slug, blog]);

  if (!blog) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">Loading blog...</div>
    );
  }

  const formattedDate = blog.created_date
    ? new Date(blog.created_date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Date not available';

  return (
    <>
      <div className=" relative overflow-x-hidden">
   <motion.img
  src={blog.blog_image}
  alt={blog.blog_title}
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  className="w-full h-[350px] md:h-[550px] object-cover shadow-lg"
/>

        <div className="absolute inset-0 bg-black/50 flex flex-col gap-4 items-center justify-center text-white text-center px-4">
          <h2 className="text-4xl md:text-6xl font-semibold font-[Inter] mb-3">
            Blog Detail
          </h2>
          <p className="text-xl md:text-5xl font-bold capitalize font-['Dancing_Script',cursive]">
            {blog.blog_title}
          </p>
          <p className="text-2xl font-semibold">{formattedDate}</p>
        </div>
      </div>

   <div
  className="container  mx-auto px-4 py-8 bg-cover bg-center bg-no-repeat bg-[#c]"
>
  <h1 className="text-3xl md:text-6xl font-bold text-[#514747] mb-6 font-['Dancing_Script',cursive] capitalize text-center leading-relaxed">
    {blog.blog_title}
  </h1>

  <div className="max-w-4xl font-[Inter] mx-auto text-2xl leading-8 text-[#514747] bg-white/80 p-6 rounded-lg shadow-md">
    {chunkSentences(blog.blog_content, 3).map((para, i) => (
      <p key={i} className="mb-6">{para}</p>
    ))}
  </div>
</div>
    </>
  );
};

export default BlogDetail;
