import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    image: {
        type: String,
        default: "/assets/defaultDP.png"
    },
    banner: {
        type: String,
    },
    subrcribers: {
        type: Number,
        default: 0
    },
    subscribedChannels: {
        type: [String]
    },
    fromGoogle: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String
    }
}, 
{
    timestamps: true
})

export default mongoose.model("User", UserSchema)