"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.post("/signup", user_1.signup);
router.post("/otp", user_1.otp);
router.post("/signin", user_1.signin);
exports.default = router;
