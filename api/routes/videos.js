import express from "express"
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, subscriptions, trending, update } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router()

//Add video
router.post("/", verifyToken, addVideo);

//Update video
router.put("/:id", verifyToken, update);

//Delete video
router.delete("/:id", verifyToken, deleteVideo);

//find video
router.get("/find/:id", getVideo);

//Add view
router.put("/view/:id", addView);

//Random videos
router.get("/random", random);

//Trending videos
router.get("/trending", trending);

//Subscribed channel videos
router.get("/subscriptions", verifyToken, subscriptions);

//Search by tags
router.get("/tags", getByTag);

//Search
router.get("/search", search);

export default router