import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true,
        },
        receiverId: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        acceptStatus: {
            type: String,
            enum: ["pending", "accepted", "movingIn"],
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Video", RequestSchema);