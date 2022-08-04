import express from "express"
import { verifyToken } from "../verifyToken.js"
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update, getSubscribedChannels, subscriptionStats } from "../controllers/user.js"

const router = express.Router()

//Update user account
router.put("/:id", verifyToken, update)

//Delete user account
router.delete("/:id", verifyToken, deleteUser)

//Find Channel
router.get("/find/:id", getUser)

//Subscribe channel
router.put("/subscribe/:id", verifyToken, subscribe)

//Unsubscribe channel
router.put("/unsubscribe/:id", verifyToken, unsubscribe)

//Like video
router.put("/like/:videoId", verifyToken, like)

//Dislike video
router.put("/dislike/:videoId", verifyToken, dislike)

//Subscribed Channels
router.get("/subscriptions/:id", getSubscribedChannels)

//Subscription Stats
router.get("/stats/:id", subscriptionStats)

export default router 