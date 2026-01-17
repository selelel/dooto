import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import { prisma } from "../lib/prisma";
import { POSTCreateCategoryT } from "../dtos";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const UserService = {
  async deleteAccount(id: string) {
  try {
    await prisma.user.delete({ where: { id } })
  } catch (error) {
    throw error;
  }
},
async updateAccount(id: string, data: Partial<{ name: string; username: string; email: string; password: string }>) {
  try {
    const updateData: any = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    const { password, ...safeUser } = updatedUser;

    return safeUser;
  } catch (error) {
    throw error;
  }
},
async exportAllData(id: string) {
  try {
    const userData = await prisma.user.findUnique({
      where: { id },
      include: {
        tasksCollections: {
          include: {
            tasks: {
              include: {
                subTasks: true,
              },
            },
          },
        },
        habits: {
          include: {
            contributions: true,
            category: true,
          },
        },
        badHabits: true,
        categories: true,
        moodJournal: true,
      },
    });

    if (!userData) {
      throw new Error("User not found");
    }

    const { password, ...safeUserData } = userData;
    return safeUserData;
  } catch (error) {
    throw error;
  }
},


  
async register(data: any) {
    try {
      const hashed = await bcrypt.hash(data.password, 10);
      
      return await prisma.user.create({
        data: {
          name: data.name,
          username: data.username,
          email: data.email,
          password: hashed,
          provider: "EMAIL",
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Unique constraint failed on the fields: email or username');
        }
      }

      throw error;
    }
  },

  async createCategory(data:POSTCreateCategoryT['body'] & {userId : string}) {
    const { category, userId } = data;
    const existing = await prisma.category.findFirst({
      where: {
        userId,
        name: category,
      },
    });

    if (existing) {
      throw new Error(`Category '${category}' already exists for this user.`);
    }

    return prisma.category.create({
      data: {
        name: category,
        userId,
      },
    });
  },
  
  async getAllCategory(userId : string) {
    return prisma.category.findMany({
      where: {
        userId,
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

  async getById(id: string) {
  try {
    const userData = await prisma.user.findUnique({
      where: { id },
    });

    if (!userData) {
      throw new Error("User not found");
    }

    const { password, ...safeUserData } = userData;
    return safeUserData;
  } catch (error) {
    throw error;
  }
}
}
