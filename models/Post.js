import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
            max: 500,
        },
        imgUrl: {
            type: String,
            required: true,
        },
        video: {
            type: String,
        },
        videoImage: {
            type: String,
            required: true,
        },
        mealStatus: {
            type: Boolean,
            required: true,
        },
        furnishedStatus: {
            type: Boolean,
            required: true,
        },
        seatNumber: {
            type: Number,
            required: true,
        },
        reviews: {
            type: Array,
            default: [],
        },
        ratings: {
            type: Number,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);