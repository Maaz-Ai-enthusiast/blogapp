import mongoose from "mongoose";
import { Schema } from "mongoose";

const blogSchema = new Schema({

    title  : {
        type:String,
         required:true
        },
    description : {
        type:String,
        required:true
    },
    image : {
        type:String,
        required:true
    },
    category : {
        type:String,
        required:true
    },
    author : {
        type:String,
        required:true
    },
    author_img : {
        type:String,
        required:true
    },
    date : {
        type:Date,
        default:Date.now()
    }

})

const blogModel =mongoose.model.blog ||  mongoose.model('blog',blogSchema);

export default blogModel;