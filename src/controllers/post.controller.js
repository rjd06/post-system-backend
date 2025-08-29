import Post from "../models/Post.js"
import {asyncHandler} from "../middleware/asyncHandler.js"

export const createPost = asyncHandler(async(req, res)=>{
    const {type, text, articleHtml} = req.body;
    let mediaUrl = null, mediaType= null;

    if(req.file){
        mediaUrl = req.file.path;
        mediaType = req.file.mimetype.startsWith("video")?"video":"image";
    };

    const post = await Post.create({
        userId: req.user._id,
        type,
        text,
        articleHtml,
        mediaUrl,
        mediaType
    });

    res.status(201).json(post);
});

export const getPosts = asyncHandler(async (_req, res)=>{
    const posts = await Post.find()
    .sort({createdAt: -1})
    .limit(100)
    .populate("userId", "name avatar")
    .lean();

    res.json(posts);
});

export const getPostById = asyncHandler(async(req, res)=>{
    const post = await Post.findById(req.params.id);

    if(!post) return res.status(404).json({message: "Not found"});

    res.json(post);
});


export const likeToggle = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    const userId = req.user._id;
    const post = await Post.findById(id);

    if(!post) return res.status(404).json({message: "Not found"});

    const idx = post.likes.findIndex(u=>String(u) === String(userId));

    if(idx >=0)post.likes.splice(idx, 1);
    else post.likes.push(userId);
    await post.save();

    res.json({likes: post.likes.length});
});

export const addComment = asyncHandler(async(req , res)=>{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({message: "Not found"});
   
    post.comments.push({
        userId:req.user._id,
        text: req.body.text,
    });

    await post.save();
    res.status(201).json(post.comments[post.comments.length - 1]);
});