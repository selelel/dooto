import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import { prisma } from "../lib/prisma";

export const UserService = {

  async register(data:any) {
    const hashed = await bcrypt.hash(data.password, 10);
    
    return prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: hashed,
        provider: "EMAIL",
      },
    });
  },

  async validateLogin(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) return null;

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return null;

    return user;
  },

  generateToken(user:any) {
    return jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
  },

//   async googleSignIn(profile) {
//     return prisma.user.upsert({
//       where: { email: profile.email },
//       update: {
//         name: profile.name,
//         provider: "GOOGLE",
//       },
//       create: {
//         name: profile.name,
//         username: profile.username,
//         email: profile.email,
//         provider: "GOOGLE",
//       },
//     });
//   },

//   async getById(id: string) {
//     return prisma.user.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         name: true,
//         username: true,
//         email: true,
//         provider: true,
//         createdAt: true,
//       },
//     });
//   }
};
