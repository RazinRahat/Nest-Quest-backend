import crypto from 'crypto';
const ErrorResponse = require("../utils/errorResponse");
const Student = require("../models/Student");
const HomeOwner = require("../models/HomeOwner");
const sendEmail = require("../utils/sendEmail");

// @desc    Login student
exports.loginStudent = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        // Check that user exists by email
        const student = await Student.findOne({ email }).select("+password");

        if (!student) {
        return next(new ErrorResponse("Invalid credentials", 401));
        }

        // Check that password match
        const isMatch = await student.matchPassword(password);

        if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Login home owner
exports.loginHomeOwner = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        // Check that user exists by email
        const homeOwner = await HomeOwner.findOne({ email }).select("+password");

        if (!homeOwner) {
        return next(new ErrorResponse("Invalid credentials", 401));
        }

        // Check that password match
        const isMatch = await homeOwner.matchPassword(password);

        if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Register student
exports.registerStudent = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const student = await Student.create({
        name,
        email,
        password,
        });

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Register home owner
exports.registerHomeOwner = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const homeOwner = await HomeOwner.create({
        name,
        email,
        password,
        });

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Forgot Password Student Initialization
exports.forgotPasswordStudent = async (req, res, next) => {
    // Send Email to email provided but first check if user exists
    const { email } = req.body;

    try {
        const student = await Student.findOne({ email });

        if (!student) {
        return next(new ErrorResponse("No email could not be sent", 404));
        }

        // Reset Token Gen and add to database hashed (private) version of token
        const resetToken = student.getResetPasswordToken();

        await student.save();

        // Create reset url to email to provided email
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        // HTML Message
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try {
        await sendEmail({
            to: student.email,
            subject: "Password Reset Request",
            text: message,
        });

        res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
        console.log(err);

        student.resetPasswordToken = undefined;
        student.resetPasswordExpire = undefined;

        await student.save();

        return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (err) {
        next(err);
    }
};

// @desc    Forgot Password HomeOwner Initialization
exports.forgotPasswordHomeOwner = async (req, res, next) => {
    // Send Email to email provided but first check if user exists
    const { email } = req.body;

    try {
        const homeOwner = await HomeOwner.findOne({ email });

        if (!HomeOwner) {
        return next(new ErrorResponse("No email could not be sent", 404));
        }

        // Reset Token Gen and add to database hashed (private) version of token
        const resetToken = homeOwner.getResetPasswordToken();

        await homeOwner.save();

        // Create reset url to email to provided email
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        // HTML Message
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try {
        await sendEmail({
            to: homeOwner.email,
            subject: "Password Reset Request",
            text: message,
        });

        res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
        console.log(err);

        homeOwner.resetPasswordToken = undefined;
        homeOwner.resetPasswordExpire = undefined;

        await homeOwner.save();

        return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (err) {
        next(err);
    }
};

// @desc    Reset User Password Student
exports.resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    try {
        const student = await Student.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
        });

        if (!student) {
        return next(new ErrorResponse("Invalid Token", 400));
        }

        student.password = req.body.password;
        student.resetPasswordToken = undefined;
        student.resetPasswordExpire = undefined;

        await student.save();

        res.status(201).json({
        success: true,
        data: "Password Updated Success",
        token: student.getSignedJwtToken(),
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Reset User Password Home Owner
exports.resetPasswordHomeOwner = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    try {
        const homeOwner = await HomeOwner.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
        });

        if (!homeOwner) {
        return next(new ErrorResponse("Invalid Token", 400));
        }

        homeOwner.password = req.body.password;
        homeOwner.resetPasswordToken = undefined;
        homeOwner.resetPasswordExpire = undefined;

        await homeOwner.save();

        res.status(201).json({
        success: true,
        data: "Password Updated Success",
        token: homeOwner.getSignedJwtToken(),
        });
    } catch (err) {
        next(err);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
};