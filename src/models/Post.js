import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: String
 } , {timestamps: true});


 const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type:{
        type: String,
        enum: ["text", "image", "video", "article"],
        required: true,
    },
    text: {
        text: String,
        default: "",
    },
    articleHtml:{
        type: String,
        default: ""
    },
    mediaUrl : String,
    mediaType:{
        type: String,
        enum: [null, "image", "video"],
        default:null
    },
    likes: [{type:mongoose.Schema.Types.ObjectId, ref: "User"}],
    comments:[commentSchema],
 }, {timestamps:true});

 export default mongoose.model("Post", postSchema);