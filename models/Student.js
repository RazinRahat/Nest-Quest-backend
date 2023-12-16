import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
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
            min: 6,
        },
        phoneNumber: {
            type: Number,
            required: true,
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
        university: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        batch: {
            type: String,
            required: true,
        },
        studentId: {
            type: Number,
            required: true,
        },
        profileImage: {
            type: String,
            default: "",
        },
        verifyIdImage: {
            type: String,
            default: "",
        },
        sentRequests: {
            type: Array,
            default: [],
        },
        contractImg: {
            type: String,
            default: "",
        },
        premiumStatus: {
            type: Boolean,
        },
        currentStatus: {
            type: Boolean,
            required: true,
            default: false,
        },
        reviews: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);