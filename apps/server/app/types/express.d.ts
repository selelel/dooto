import {Request as ExpressRequest, Response as ExpressResponse} from 'express'
import { User } from '../generated/prisma/client';

export type Request = ExpressRequest & {
  isAuthenticated?: () => boolean;
  user?: User;
  session?: {
    passport?: {
      user?: unknown;
    };
  };
};

export type Response = ExpressResponse