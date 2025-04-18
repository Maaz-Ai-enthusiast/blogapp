"use client";

import React, { useState,useEffect } from 'react';
import { assets, blog_data } from '@/assets/assets';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = ({ params }) => {
  // console.log("params: ", params.id);

  const [data, setdata] = useState("");
  // console.log("selected blog data --- -------------------- > : ", data);


  const fetchBlog = async () => {

    try {
      const response = await axios.get('/api/blogs', {
        params: {
          id: params.id,
        },
      });
      
      const data = await response.data.blog;
      setdata(data);
      toast.success( "Blog fetched successfully");
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error( "Failed to fetch blog");
    }
  };

  useEffect(() => {
   fetchBlog();
  }, []);

  return (
data?<>

    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>

      <div className='flex justify-between items-center'>

<Link href={"/"}>
<Image src={assets.logo} alt='' width={180} className = 'w-[130px] sm:w-auto'/>
</Link>
 <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get started
  <Image src={assets.arrow} alt=''/>
 </button>
      </div>
      
<div className='text-center my-24'>

  <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
<Image className='mx-auto mt-6 border border-white rounded-full' src={data.author_img} width={60} height={60} alt=''/>
<p className='mt-1 pb-2 text-lg max-w-[740] mx-auto'>{data.author}</p>
</div>
 

    </div>

<div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10 '>
<Image className='border-4 border-white' src={data.image} width={1280} height={720} alt=''/>
<h1 className='my-8 text-[26px] font-semibold'>Introduction : </h1>
<p>{data.description}</p>
<h3 className='my-5 text-[18px] font-semibold'>Step 1: Self-Reflection</h3>
<p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of your goals.</p>
<p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of your goals.</p>

<h3 className='my-5 text-[18px] font-semibold'>Step 2: Self-Reflection</h3>
<p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of your goals.</p>
<p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of your goals.</p>

<h3 className='my-5 text-[18px] font-semibold'>Step 3: Self-Reflection</h3>
<p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of your goals.</p>
<p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of your goals.</p>

<h3 className='my-5 text-[18px] font-semibold'>Conclusion:</h3>
<p className='my-3'>Managing your lifestyle is a journey that requires commitment and consistency.</p>


<div className='my-24'>
<p className='text-black font font-semibold my-4'>Share this article on social media</p>

<div className='flex'>


<Image src={assets.facebook_icon} width={50} alt=''/>
<Image src={assets.twitter_icon} width={50} alt=''/>
<Image src={assets.googleplus_icon} width={50} alt=''/>

</div>
</div>
</div>
<Footer/>
    </>
    :<></>
  );
};

export default Page;

