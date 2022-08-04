import User from "../models/User.js"
import Video from "../models/Video.js"
import { createError } from "../error.js"

//update
export const update = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body }, 
                { new : true }
            )

            res.status(200).json(updatedUser)
        }
        catch(err){
            next(err)
        }
    }
    else{
        return next(createError(403, "You can update only your own account"))
    }
}

//delete
export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Channel has been deleted.")
        }
        catch(err){
            next(err)
        }
    }
    else{
        return next(createError(403, "You can delete only your own account"))
    }
}

//get
export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user) return next(createError(404, "Channel not found."))
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}

//subscribe
export const subscribe = async (req, res, next) => {
    try{
        await User.findByIdAndUpdate(req.user.id, 
            {$push : {subscribedChannels: req.params.id}})
        await User.findByIdAndUpdate(req.params.id, 
            {$inc : {subrcribers: 1}})

        res.status(200).json("Subscribed!")
    }
    catch(err){
        next(err)
    }
}

//unsubscribe
export const unsubscribe = async (req, res, next) => {
    try{
        await User.findByIdAndUpdate(req.user.id, 
            {$pull : {subscribedChannels: req.params.id}})
        await User.findByIdAndUpdate(req.params.id, 
            {$inc : {subrcribers: -1}})

        res.status(200).json("Unsubscribed!")
    }
    catch(err){
        next(err)
    }
}

//like
export const like = async (req, res, next) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    try{
        await Video.findByIdAndUpdate(videoId, 
            {
                $addToSet: {likes: userId},
                $pull : {dislikes: userId}
            })

        res.status(200).json("Video has been liked!") 
    }
    catch(err){
        next(err)
    }
}

//dislike
export const dislike = async (req, res, next) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    try{
        await Video.findByIdAndUpdate(videoId, 
            {
                $addToSet: {dislikes: userId},
                $pull : {likes: userId}
            })

        res.status(200).json("Video has been disliked!")
    }
    catch(err){
        next(err)
    }
}

//Subscribed Channels
export const getSubscribedChannels = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        const subscribedChannels = user.subscribedChannels

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await User.find({_id: channelId})
            })
        )

        res.status(200).json(list.flat())
    }
    catch(err){
        next(err)
    }
}

//Subscription Stats
export const subscriptionStats = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));

    try{
        const stats = await Video.count( { createdAt: { $gte: lastMonth }, userId: req.params.id } ); 
        res.status(200).json(stats);
    }
    catch(err){
        res.status(500).json(err);
    }
}