import {Request as ExpressRequest} from 'express'

export type Request = ExpressRequest & {
  isAuthenticated?: () => boolean;
  user?: unknown;
  session?: {
    passport?: {
      user?: unknown;
    };
  };
};
