import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { JwtPayload , AuthRequest } from "../types/types";

const JWT_SECRET = process.env.JWT_SECRET!;

const AuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token , JWT_SECRET) as JwtPayload;

        req.params.userId = decoded.id;
 
        next();
    } catch (e: any) {
        console.log(e);
    }
};

export default AuthMiddleware;
