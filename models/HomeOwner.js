import mongoose from "mongoose";

const HomeOwnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: "",
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            default: null,
        },
        birthDate: {
            type: Date,
        },
        address: {
            type: String,
        },
        sex: {
            type: String,
        },
        nid: {
            type: Number,
            required: true,
            default: null,
        },
        profileImage: {
            type: String,
        },
        verifyIdImage: {
            type: String,
            required: true,
            default: '',
        },
        receivedRequests: {
            type: Array,
            default: [],
        },
        contractImg: {
            type: String,
            default: "",
        },
        reviews: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Student", HomeOwnerSchema);