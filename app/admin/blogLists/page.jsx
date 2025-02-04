"use client"

import BlogTableItem from '@/components/AdminComponents/BlogTableItem'
import React from 'react'
import axios from 'axios'

import { useState, useEffect } from'react'
import { toast } from 'react-toastify'

const Page = () => {

const [blogs,setBlogs] = useState([]);

const fetchBlogs =  async () => {

  const response = await axios.get('/api/blogs');
  const data = await response.data.blogs;
  setBlogs(data);
  console.log("this is all blogs data received from the server",data); 

}

const deleteBlog = async (mongoId) => {
  
  const response = await axios.delete('/api/blogs',{

    params: {
      id: mongoId,
    },

  });
  toast.success(response.data.message);
  
  fetchBlogs();

}


useEffect(() => {
  fetchBlogs();
  }, []);


  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400'>
        <table className='w-full text-sm text-gray-500 border-collapse'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>Author Name</th>
              <th scope='col' className='px-6 py-3'>Blog Title</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {

              blogs.map((blog,index) => {
                return <BlogTableItem mongoId={blog._id} key={index} author={blog.author} title={blog.title} authorImg={blog.author_img} date={blog.date}
                deleteBlog = {deleteBlog}
                />
              })
            }
           
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
