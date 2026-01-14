export const PREFIX = "";

export const ENDPOINT = {
    USER: {
        signin: '/api/user/auth/signin/',
        register: '/api/user/auth/register/',
        logout: '/api/user/auth/logout/',
        category: '/api/user/category/'
    },
    TASKS : {
      tasks_collection: '/api/tasks/tasks-collection/',
      task: '/api/tasks/task/'
    },
    HABIT : {
      habit: '/api/habit/',
      contribution: '/api/habit/contribution/'
    },
    TIMER : {
      timer: '/api/timer/',
    },
    MOOD: {
      mood: "/api/mood-journal",
    },
    SERVER: {
      health: "/api/server",
    }
}

export const ROUTES_CLIENT = {
  PUBLIC: {
    REGISTER: "/auth/register",
    SIGNIN: "/auth/signin",
  },
  PRIVATE: {
    HOME: "/",
    TASKS: "/tasks",
    TIMER: "/timer",
    HABITS: "/habits",
    MOOD: "/mood-journal",
    SETTINGS: "/settings",
    SHOWCASE: "/showcase",
  }
};
