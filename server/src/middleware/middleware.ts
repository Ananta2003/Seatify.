import type { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import type { AuthenticatedRequest } from "../types/index.js";
dotenv.config()


export function middleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {

    const token = req.headers['authorization'] ?? "";
    const JWT_PASSWORD: string = process.env.JWT_PASSWORD as string

    const decoded = jwt.verify(token, JWT_PASSWORD)
    if (decoded) {
        // @ts-ignore: TODO: Fix this
        req.userId = decoded.userId;
        // @ts-ignore
        req.role = decoded.role;
        
        next();
    } else {
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}