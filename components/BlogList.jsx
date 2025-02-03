"use client"; // Add this directive as the first line

import { blog_data } from '@/assets/assets';
import React, { useState } from 'react';
import BlogItem from './BlogItem.jsx';
import axios from 'axios';
import { useEffect } from 'react';

const BlogList = () => {
  const [menu, setMenu] = useState('All');

  const [blog_data, setBlog_data] = useState([]);

  const fetchAllBlogs =  async () => {

    try {
      const response = await axios.get('/api/blog');
      const data = await response.data.blogs;
      setBlog_data(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error("error fetching blogs:", error);
    }
  };

  // const fetchFilteredBlogs = async (category) => {
  //   try {
  //     const response = await axios.get(`/api/blog/${category}`);
  //     const data = await response.json();
  //     setBlog_data(data);
  //   } catch (error) {
  //     console.error('Error fetching blogs:', error);
  //     toast.error("error fetching blogs:", error);
  //   }
  // };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const filteredBlogs = menu === 'All' ? blog_data : blog_data.filter((item) => item.category === menu);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu('All')}
          className={menu === 'All' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}
        >
          All
        </button>
        <button
          onClick={() => setMenu('Technology')}
          className={menu === 'Technology' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}
        >
          Technology
        </button>
        <button
          onClick={() => setMenu('Startup')}
          className={menu === 'Startup' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}
        >
          Startup
        </button>
        <button
          onClick={() => setMenu('Lifestyle')}
          className={menu === 'Lifestyle' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}
        >
          Lifestyle
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-6 mb-16 xl:mx-24">
        {blog_data.map((item, index) => (
          <BlogItem key={index} title={item.title} id={item._id} description={item.description} category={item.category} image={item.image} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
