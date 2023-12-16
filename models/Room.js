import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        homeOwnerId: {
            type: String,
            required: true,
        },
        seatNumber: {
            type: Number,
            required: true,
        },
        seatRemaining: {
            type: Number,
            required: true,
        },
        tenants: {
            type: Array,
            required: true,
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);