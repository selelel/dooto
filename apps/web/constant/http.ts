export const PREFIX = "";

export const ENDPOINT = {
    USER: {
        signin: '/api/user/auth/signin/',
        register: '/api/user/auth/register/',
        logout: '/api/user/auth/logout/'
    }
}

export const ROUTES_CLIENT = {
  PUBLIC: {
    REGISTER: "/auth/register",
    SIGNIN: "/auth/signin",
  },
  PRIVATE: {
    HOME: "/",
    TODO: "/todo",
    TIMER: "/timer",
    HABITS: "/habits",
    MOOD: "/mood",
    SETTINGS: "/settings",
    SHOWCASE: "/showcase",
  }
};
