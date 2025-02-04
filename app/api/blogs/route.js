import { connectDB } from "@/lib/config/db";
import blogModel from "@/lib/models/BlogModel.js";


const { NextResponse } = require("next/server");

import { writeFile } from 'fs/promises';

import fs from 'fs';




const loadDb = async () => {
    

await connectDB();
console.log("DB connected successfully");

}

// api endpoint for getting all blogs
export async function GET(request){

    await loadDb();

const blogId =  request.nextUrl.searchParams.get("id");

if (blogId) {

const blog = await blogModel.findById(blogId);

if (!blog) {
    return NextResponse.json({message:"Blog not found"}, {status:404});
}
else {
    
    return NextResponse.json({message:"Blog fetched successfully", blog:blog}, {status:200});

}


}
else {

    const blogs = await blogModel.find({});


    return  NextResponse.json({message:"All blogs fetched successfully", blogs:blogs}, {status:200});
}




}



// api endpoint for uploading blogs
export async function POST(request) {

    await loadDb();

    const formData = await request.formData();
    const timestamp = Date.now();

    // Handle main image
    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageByteData);
    const imagePath = `./public/uploads/${timestamp}_${image.name}`;
    await writeFile(imagePath, imageBuffer);
    const imageUrl = `/uploads/${timestamp}_${image.name}`;

    // Handle author image (optional)
    let authorImageUrl = null;
    const authorImg = formData.get("author_img");
    if (authorImg) {
        const authorImgByteData = await authorImg.arrayBuffer();
        const authorImgBuffer = Buffer.from(authorImgByteData);
        const authorImgPath = `./public/uploads/${timestamp}_${authorImg.name}`;
        await writeFile(authorImgPath, authorImgBuffer);
        authorImageUrl = `/uploads/${timestamp}_${authorImg.name}`;
    }

    console.log("Image URL: ", imageUrl);
    console.log("Author Image URL: ", authorImageUrl);

    const blogData = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        author: formData.get("author"),
        author_img: authorImageUrl, // Store processed image URL
        image: imageUrl,
    };

    await blogModel.create(blogData);
    console.log("Blog data created successfully");

    return NextResponse.json({
        message: "Blog created successfully",
        blogData: blogData,
    }, { status: 201 });
}


//  api to delete the blog

export async function DELETE(request) {

    await loadDb();

    const blogId =await  request.nextUrl.searchParams.get("id");

    if (!blogId) {
        return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
    }

    const blog = await blogModel.findByIdAndDelete(blogId);

    if (!blog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    fs.unlink(`./public/uploads${blog.image}`,()=>{

    })
    

    await blogModel.findByIdAndDelete(blog);


    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
}