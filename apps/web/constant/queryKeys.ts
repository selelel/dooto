const UserQueryKeys = {
    actions: (params:any) => ["user", "actions", params],
    item: (params:any) => ["user", "item", params],
}

const TasksQueryKeys = {
    parent: (params:any) => ["tasks", "tasks-collection", "parent", params],
    item: (params:any) => ["tasks", "tasks-collection", "item", params],
}

const HabitQueryKeys = {
    parent: (key: string | any[]) =>
      ["habit", ...(Array.isArray(key) ? key : [key])],
  }

const TimerQueryKeys = {
    parent: (key: string | any[]) =>
      ["timer", ...(Array.isArray(key) ? key : [key])],
  }

const MoodJournalQueryKeys = {
parent: (key: string | any[]) =>
    ["mood-journal", ...(Array.isArray(key) ? key : [key])],
}



export const QueryKeys = {
    UserQueryKeys,
    TasksQueryKeys,
    HabitQueryKeys,
    TimerQueryKeys,
    MoodJournalQueryKeys
}