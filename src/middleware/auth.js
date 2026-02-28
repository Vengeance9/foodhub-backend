import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma";

export const secret = process.env.BETTER_AUTH_SECRET;
export const UserRole = {
  ADMIN : "ADMIN",
  PROVIDER : "PROVIDER",
  CUSTOMER : "CUSTOMER",
}


const auth = (...roles) => {
  return async (req, res, next) => {
    try {
    
      let token = req.headers.authorization;

      if (!req.headers.authorization) {
        token = req.cookies.token;
      }

      if (!token) {
        throw new Error("Token not found!!");
      }

      const decoded = jwt.verify(token, secret)

      const userData = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      if (!userData) {
        throw new Error("Unauthorized!");
      }

      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("Unauthorized!!!");
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
