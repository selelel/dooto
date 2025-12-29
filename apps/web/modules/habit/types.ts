
export type POSTHabitRequest = Omit<POSTHabitResponse, 'id' | 'createdAt' | 'userId'>

export type POSTHabitResponse = {
  id: string,
  habitName: string,
  details: string,
  categoryId: string,
  createdAt:string,
  userId: string
  contribution: Contribution[]
}

export type Contribution = {
  habitId: string,
  date: string,
  completed: boolean,
  createdAt: string
}