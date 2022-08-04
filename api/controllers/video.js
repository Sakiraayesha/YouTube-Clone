import User from "../models/User.js"
import Video from "../models/Video.js"
import { createError } from "../error.js"

//add
export const addVideo = async (req, res, next) => {
    const newVideo = new Video({userId: req.user.id, ...req.body})
    try{
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    }
    catch(err){
        next(err)
    }  
}

//update
export const update = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "Video not found!"))
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                { $set: req.body }, 
                { new : true }
            )
            res.status(200).json(updatedVideo)
        }
        else{
            return next(createError(403, "You can update only your own video"))
        }
    }
    catch(err){
        next(err)
    }
}

//delete
export const deleteVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "Video not found!"))
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("Video has been deleted.")
        }
        else{
            return next(createError(403, "You can delete only your own video"))
        }
    }
    catch(err){
        next(err)
    }
}

//get
export const getVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "Video not found."))
        res.status(200).json(video)
    }
    catch(err){
        next(err)
    }
}

//Views
export const addView = async (req, res, next) => {
    try{
        await Video.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } }, 
        )
        res.status(200).json("View has been increased.")
    }
    catch(err){
        next(err)
    }
}

//Channel Videos
export const channelVideos = async (req, res, next) => {
    try{
        const videos = await Video.find({userId: req.params.id})
        res.status(200).json(videos.flat().sort((a,b) => b.createdAt - a.createdAt))
    }
    catch(err){
        next(err)
    }
}

//Random
export const random = async (req, res, next) => {
    try{
        const videos = await Video.aggregate([{$sample : { size: 40 }}])
        res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}

//Trending
export const trending = async (req, res, next) => {
    try{
        const videos = await Video.find().sort({ views: -1 }).limit(40)
        res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}

//Subscriptions
export const subscriptions = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedChannels

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await Video.find({userId: channelId})
            })
        )

        res.status(200).json(list.flat().sort((a,b) => b.createdAt - a.createdAt))
    }
    catch(err){
        next(err)
    }
}

//Tags
export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(',');
    try{
        const videos = await Video.find({ tags: { $in: tags }}).limit(20)
        res.status(200).json(videos.flat().sort((a,b) => b.createdAt - a.createdAt))
    }
    catch(err){
        next(err)
    }
}

//Search
export const search = async (req, res, next) => {
    const query = req.query.search
    try{
        const videos = await Video.find({ title: { $regex: query, $options: "i" }}).limit(40)
        res.status(200).json(videos.flat().sort((a,b) => b.createdAt - a.createdAt))
    }
    catch(err){
        next(err)
    }
}

//User Latest Video
export const getLatestVideo = async (req, res, next) => {
    try{
        const video = await Video.find({userId: req.params.userId}).sort({ _id: -1 }).limit(1);
        res.status(200).json(video[0])
    }
    catch(err){
        next(err)
    }
}

//User Top Videos
export const topVideos = async (req, res, next) => {
    try{
        const videos = await Video.find({userId: req.params.userId}).sort({ views: -1 }).limit(3)
        res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}