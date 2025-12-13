import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";
const passport = require('passport');
import { Strategy as LocalStrategy } from 'passport-local';
import * as bcrypt from 'bcrypt';

// Configure Local Strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // tell passport to use email instead of username
  async function verify(email: string, password: string, done: any) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      // Compare hashed password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password!);
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize only user ID into session
passport.serializeUser((user: User, done: any) => {
  done(null, user.id);
});

// Deserialize user by ID from session
passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return done(null, false);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export { passport as passportLocal };
