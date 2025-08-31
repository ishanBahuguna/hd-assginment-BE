import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validateUser } from "../types/zod";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

let OTP : string = ""; // use map for otp and once otp verified clear the map
const JWT_SECRET = process.env.JWT_SECRET!;
export const otp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        let digits : string = "0123456789";
        OTP = "";

        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        const transporter = nodemailer.createTransport({
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
            text:OTP
        };


        transporter.sendMail(receiver , (error , emailResponse) => {
            if(error) {
                return res.status(400).json({
                    success:false,
                    message:"Error in sending OTP"
                })
            }

            console.log(emailResponse);
            
        })

        return res.status(200).json({
            success:true,
            message:"OPT send to email successfull"
        })


    } catch (e: any) {
        return res.status(500).json({
            success: false,
            message: "Interal server error",
            error: e.message,
        });
    }
};

export const signup = async (req: Request, res: Response) => {
    try {
        
        const prisma = new PrismaClient();
        const body = req.body;
        const { success } = validateUser.safeParse(body);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Inputs",
            });
        }

        const { name, email , otp } = req.body;

        if(otp !== OTP) {
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
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
        const token = jwt.sign({id} , JWT_SECRET)

        return res.status(201).json({
            success: true,
            message: "User creaated successfully",
            token
        });
    } catch (e: any) {
        return res.status(500).json({
            success: false,
            message: "Internal serverl error",
            error: e.message,
        });
    }
};




export const signin = async (req: Request, res: Response) => {
    try {
        const prisma = new PrismaClient();
        const body = req.body;
        const { success } = validateUser.safeParse(body);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Inputs",
            });
        }

        const { email , otp } = req.body;

        if(otp !== OTP) {
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist!",
            });
        }

        const id = user.id;
        const token = jwt.sign({id} , JWT_SECRET)

        return res.status(201).json({
            success: true,
            message: "User signi successfull",
            token
        });
    } catch (e: any) {
        return res.status(500).json({
            success: false,
            message: "Internal serverl error",
            error: e.message,
        });
    }
};






