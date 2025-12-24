
export type PATCHTasksCollectionRequestT = {
  tasksName: string
  details: string
  date: Date
  tasksId: string
}

export type POSTTasksCollectionRequestT = Omit<PATCHTasksCollectionRequestT, 'tasksId'>
export type POSTTasksCollectionResponseT = {
  tasksId: string
  tasksName: string
  details: string
  due: Date
  created: Date
  updated: Date
  userId: string
  tasks: Task[]
}

export enum TaskStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING'
}

export type Task = {
  taskId: string
  tasksId: string
  taskName: string
  created: Date
  due: Date
  updated: Date
  status: TaskStatus
  tags: string[]
  details: string | null
  subClassId: string | null
}

export type POSTTaskRequest = {
  taskName: string,
  details: string,
  due?: string,
  tasksId: string,
  status: string
}