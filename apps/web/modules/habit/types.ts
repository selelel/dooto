
export type POSTHabitRequest = Omit<POSTHabitResponse, 'id' | 'createdAt' | 'userId' | 'contributions'>

export type POSTHabitResponse = {
  id: string,
  habitName: string,
  details: string,
  categoryId?: string,
  category?: Category,
  createdAt:string,
  userId: string
  contributions: Contribution[]
}

export type Contribution = {
  habitId: string,
  date: string,
  completed: boolean,
  createdAt: string
}

export type Category = {
      id:string,
      userId: string,
      name: string,
      createdAt: string
    }