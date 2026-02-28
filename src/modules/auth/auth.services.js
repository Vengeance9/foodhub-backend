
import { Request, Response } from "express";
import { auth as betterAuth } from "../../lib/auth.js";
import { prisma } from '../../lib/prisma.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const secret = process.env.BETTER_AUTH_SECRET;

const signUp = async (userdata) => {
    const user = await prisma.user.findUnique({
        where: {
            email: userdata.email,
        },
    })
    if (user) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(userdata.password, 6);
    const newUser = await prisma.user.create({
        data:{
            email: userdata.email,
            password: hashedPassword,
            name: userdata.name,
        }
    })
    const {password, ...userData} = newUser;
    return userData;
}

    const login = async (userdata) => {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email: userdata.email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const match = await bcrypt.compare(userdata.password, user.password);
      if (!match) {
        throw new Error("Invalid password");
      }
      const userData = {
        id: user.id,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        email: user.email,
      };

      const token = jwt.sign(userData, secret, { expiresIn: "1d" });

      return {
        token,
        user,
      };
    };

    const getMe = async (userId) => {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
        },
      });
      return user;
    };

export const authService = {login,signUp,getMe}
