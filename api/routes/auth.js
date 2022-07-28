import express from "express"
import { signup, signin, googleAuth } from "../controllers/auth.js"

const router = express.Router()

//Create a user
router.post("/signup", signup)

//Sign in
router.post("/signin", signin)

//Google authentication
router.post("/google", googleAuth)

export default router