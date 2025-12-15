import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";
const passport = require("passport");
import { Strategy as LocalStrategy } from "passport-local";
import * as bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async function verify(email: string, password: string, done: any) {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password!);
        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: User, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const _user_ = await prisma.user.findUnique({ where: { id } });
    if (!_user_) return done(null, false);
    const { password, ...user } = _user_;
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export { passport as passportLocal };