import { Request, Response } from "express";
import { auth as betterAuth } from "../../lib/auth.js";

const getServerSession = async (req: Request, res: Response) => {
    const session = await betterAuth.api.getSession({
        headers: req.headers as any,
    })

    return res.status(200).json({
        success: true,
        session,
    })
};

export const sessionController = {getServerSession}
