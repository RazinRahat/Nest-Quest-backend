const express = require("express");
const router = express.Router();

// Controllers
const {
    loginStudent,
    loginHomeOwner,
    registerStudent,
    registerHomeOwner,
    forgotPasswordStudent,
    forgotPasswordHomeOwner,
    resetPasswordStudent,
    resetPasswordHomeOwner,
} = require("../controllers/auth");

router.route("/registerStudent").post(registerStudent);

router.route("/registerHomeOwner").post(registerHomeOwner);

router.route("/loginStudent").post(loginStudent);

router.route("/loginHomeOwner").post(loginHomeOwner);

router.route("/forgotPasswordStudent").post(forgotPasswordStudent);

router.route("/forgotPasswordHomeOwner").post(forgotPasswordHomeOwner);

router.route("/resetPasswordStudent/:resetToken").put(resetPasswordStudent);

router.route("/resetPasswordHomeOwner/:resetToken").put(resetPasswordHomeOwner);

module.exports = router;