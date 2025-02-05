import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';




const SubTableItem = ({email,mongoId,date,deleteEmail}) => {

  const emailData = new Date(date)  




  

  return (
    <tr className='border-b bg-white text-left  '>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {email ?email : "no email"}
      </th>
      <td className='px-6 py-4 hidden sm:block'>{emailData.toDateString}</td>
      <td  onClick={()=>deleteEmail(mongoId)}  className='px-6 py-4 cursor-pointer'> x</td>
    </tr>
  )
}

export default SubTableItem
