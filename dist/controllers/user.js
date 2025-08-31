"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = exports.otp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("../types/zod");
const client_1 = require("@prisma/client");
const nodemailer_1 = __importDefault(require("nodemailer"));
let OTP = ""; // use map for otp and once otp verified clear the map
const JWT_SECRET = process.env.JWT_SECRET;
const otp = async (req, res) => {
    try {
        const { email } = req.body;
        let digits = "0123456789";
        OTP = "";
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        const receiver = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "OTP for Highway Delite Test",
            text: OTP
        };
        transporter.sendMail(receiver, (error, emailResponse) => {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "Error in sending OTP"
                });
            }
            console.log(emailResponse);
        });
        return res.status(200).json({
            success: true,
            message: "OPT send to email successfull"
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Interal server error",
            error: e.message,
        });
    }
};
exports.otp = otp;
const signup = async (req, res) => {
    try {
        const prisma = new client_1.PrismaClient();
        const body = req.body;
        const { success } = zod_1.validateUser.safeParse(body);
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Inputs",
            });
        }
        const { name, email, otp } = req.body;
        if (otp !== OTP) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        const user = await prisma.user.create({
            data: {
                email,
                name,
            },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Database error",
            });
        }
        const id = user.id;
        const token = jsonwebtoken_1.default.sign({ id }, JWT_SECRET);
        return res.status(201).json({
            success: true,
            message: "User creaated successfully",
            token
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal serverl error",
            error: e.message,
        });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const prisma = new client_1.PrismaClient();
        const body = req.body;
        const { success } = zod_1.validateUser.safeParse(body);
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Inputs",
            });
        }
        const { email, otp } = req.body;
        if (otp !== OTP) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist!",
            });
        }
        const id = user.id;
        const token = jsonwebtoken_1.default.sign({ id }, JWT_SECRET);
        return res.status(201).json({
            success: true,
            message: "User signi successfull",
            token
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal serverl error",
            error: e.message,
        });
    }
};
exports.signin = signin;
