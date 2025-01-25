import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      
<div
className='flex justify-between items-center'
>
    <Image  src = {assets.logo}  className='w'/>

</div>

    </div>
  )
}

export default Header
