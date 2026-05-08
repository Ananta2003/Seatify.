import type { NextFunction , Response} from "express";
import type { AuthenticatedRequest } from "../types/index.js";

export function adminMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    // @ts-ignore
    if (req.role !== "admin") {
        return res.status(403).json({
            message: "Admins only"
        });
    }

    next();
}