import { PrismaClient } from "@prisma/client";
import { Response , Request } from "express";
// import { Request } from "../types/types";


export const create = async (req: Request,  res: Response) => {
    try {
        const prisma = new PrismaClient();
        const {userId} = req.params
        const { note , title  } = req.body;
        console.log(userId , note , title);
        
        const notes = await prisma.note.create({
            data: {
                note,
                userId,
                title,

            },

        });
        console.log(notes);
        
        if (notes) {
            return res.status(200).json({
                success: true,
                message: "notes created successfully",
            });
        }
    } catch (e: any) {
        return res.status(500).json({
            success: false,
            message: "Internal serverl error",
            error: e.message,
        });
    }
};

export const getNotes = async (req: Request, res: Response) => {
    try {
        const prisma = new PrismaClient();
        
        const  {userId} = req.params;

        const user = await prisma.user.findUnique({
            where:{
                id : userId
            },
            select:{
                name:true,
                email:true 
            }
        })
        const notes = await prisma.note.findMany({
            where: {
                userId,
            }
        });

        if (notes) {
            return res.status(200).json({
                success: true,
                user,
                notes,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal serverl error",
            error: error.message,
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const prisma = new PrismaClient();
        const { id } = req.params;

        await prisma.note.delete({
            where: {
                id,
            },
        });

        return res.status(200).json({
            success: true,
            message: "note deleted successfully",
        });
    } catch (e: any) {
        return res.status(500).json({
            success: false,
            message: "Internal serverl error",
            error: e.message,
        });
    }
};
