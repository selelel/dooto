export const PREFIX = "";

export const ENDPOINT = {
    USER: {
        user: "/api/user/",
        signin: '/api/user/auth/signin/',
        register: '/api/user/auth/register/',
        logout: '/api/user/auth/logout/',
        category: '/api/user/category/',
        me: '/api/user/me/',
        exportAllData: '/api/user/export-all-data/'

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
    },
    QOUTES: {
      qoutes: "/api/qoutes",
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
