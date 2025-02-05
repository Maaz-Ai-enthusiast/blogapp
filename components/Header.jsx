"use client"
import axios from 'axios'
import { useState } from 'react'
import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'


const Header = () => {

const [email,setEmail] = useState('')
 

const onSubmitHander  =  async (e) => {

e.preventDefault()

const formData = new FormData();

formData.append('email',email)
const response =  await axios.post('/api/email',formData)
 if(response.data.message){
  toast.success('Email sent successfully!')
  setEmail('')
 }
 else{
  toast.error('Failed to send email!')
 }


}

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      
<div
className='flex justify-between items-center'
>
    <Image  src = {assets.logo}  className='w-[130px] sm:w-auto'/>
<button
className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] '
>Get started <Image src={assets.arrow} /></button>
</div>


<div className='text-center my-8'>
<h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
<p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio et expedita officia nostrum veniam enim beatae, recusandae mollitia magni harum quo eum, culpa odit, animi a ex fugit corrupti totam!</p>

<form
className='flex justify-between max-w-[500px]  scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000] '
>

<input
  type="email"
  placeholder="Enter your email"
  onChange={(e) => setEmail(e.target.value)}
  value={email}
  className="pl-10 outline-none focus:outline-none focus:ring-0"
/>

<button type='submit' onClick={onSubmitHander}  className='border-1 border-black p-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
</form>

</div>

    </div>
  )
}

export default Header
