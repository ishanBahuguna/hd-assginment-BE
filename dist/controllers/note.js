"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getNotes = exports.create = void 0;
const client_1 = require("@prisma/client");
// import { Request } from "../types/types";
const create = async (req, res) => {
    try {
        const prisma = new client_1.PrismaClient();
        const { userId } = req.params;
        const { note, title } = req.body;
        console.log(userId, note, title);
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
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal serverl error",
            error: e.message,
        });
    }
};
exports.create = create;
const getNotes = async (req, res) => {
    try {
        const prisma = new client_1.PrismaClient();
        const { userId } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true
            }
        });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal serverl error",
            error: error.message,
        });
    }
};
exports.getNotes = getNotes;
const remove = async (req, res) => {
    try {
        const prisma = new client_1.PrismaClient();
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
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal serverl error",
            error: e.message,
        });
    }
};
exports.remove = remove;
