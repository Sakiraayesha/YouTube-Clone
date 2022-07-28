import Comment from "../models/Comment.js"
import Video from "../models/Video.js"
import { createError } from "../error.js"

//add
export const addComment = async (req, res, next) => {
    const newComment = new Comment({userId: req.user.id, ...req.body})
    try{
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(err){
        next(err)
    }  
}

//delete
export const deleteComment = async (req, res, next) => {
    try{
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(comment.videoId)
        if(!comment) return next(createError(404, "Comment not found!"))
        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment has been deleted.")
        }
        else{
            return next(createError(403, "You can delete only your own comment!"))
        }
    }
    catch(err){
        next(err)
    }
}

//get
export const getComments = async (req, res, next) => {
    try{
        const comments = await Comment.find({ videoId: req.params.videoId})
        res.status(200).json(comments)
    }
    catch(err){
        next(err)
    }
}