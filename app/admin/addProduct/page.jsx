"use client";

import { assets } from "@/assets/assets";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import styles

const Page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "John Doe",
    author_img: "/author_img.png",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("author_img", image);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blogs", formData);
    
      // Check if the response contains the success message
      if (response.data && response.data.message) {
        toast.success(response.data.message); // Show the success message from the backend

        // Reset the form fields
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "John Doe",
          author_img: "/author_img.png",
        });

        // Reset the uploaded image
        setImage(null);
        
      } else {
        toast.error("Error submitting blog");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error while submitting form:", error); // Log error details for debugging
    }
    
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16 ">
        <p className="text-xl">Upload Thumbnail</p>

        {/* <label htmlFor="image"> */}
        <Image
  className="mt-4 inline-block"
  src={!image ? assets.upload_area : URL.createObjectURL(image)}
  width={140}
  height={70}
  alt="Uploaded thumbnail"
  onClick={() => document.getElementById("image").click()} // Trigger file input when image is clicked
/>
        {/* </label> */}

        <input
  onChange={(e) => setImage(e.target.files[0])}
  type="file"
  id="image"
  hidden
  required
/>
        <p className="text-xl mt-4">Blog title</p>
        <input
  className="w-full sm:w-[500px] px-4 py-3 mt-4 border border-black"
  type="text"
  placeholder="Type here"
  required
  name="title"
  onChange={onChangeHandler}
  value={data.title}
/>
        <p className="text-xl mt-4">Blog Description</p>
        <textarea
  name="description"
  onChange={onChangeHandler}
  value={data.description}
  className="w-full sm:w-[500px] px-4 py-3 mt-4 border border-black"
  placeholder="Write content here"
  rows={6}
  required
/>
        <p className="text-xl mt-4">Blog category</p>
        <select
          onChange={onChangeHandler}
          value={data.category}
          name="category"
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button className="mt-8 w-40 h-12 bg-black text-white" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default Page;
