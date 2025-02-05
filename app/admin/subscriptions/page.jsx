"use client"

import SubTableItem from '@/components/AdminComponents/SubTableItem';
import React from 'react';
import { useState } from 'react';

import { useEffect } from'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






const Page = () => {
  const [emails,setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const res = await axios.get('/api/email');
      setEmails(res.data.emails);
      toast.success('Emails fetched successfully');
    } catch (error) {
      toast.error('Failed to fetch emails');
      console.error('Error fetching emails:', error);
    }
  };

  const deleteEmail = async (mongoId) => {
    try {
      const res = await axios.delete('/api/email', {
        params: {
          id: mongoId,
        },
      });
      toast.success(res.data.message);
      fetchEmails();
    } catch (error) {
      toast.error('Failed to delete email');
      console.error('Error deleting email:', error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []); 


  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-hidden border border-gray-400 scrollbar-hide">
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 text-uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Email Subscriptions
              </th>
              <th scope='col' className='px-6 py-3 hidden sm:block'  >
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
               Action
              </th>
            </tr>
          </thead>
          <tbody>
           
           {

emails.map((email,index) => ( <SubTableItem email={email.email} key={index}  mongoId = {email._id} deleteEmail={deleteEmail}/>))



           }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
