
export type POSTTimerRequest = Omit<POSTTimerResponse, 'id' | 'createdAt' | 'userId' | 'lastRelapseAt' | 'longestStreakSeconds' | 'relapsesCount'>

export type POSTTimerResponse = {
    id: string,
    userId: string,
    habitName: string,
    details: string,
    createdAt: string,
    lastRelapseAt: string,
    longestStreakSeconds: number,
    relapsesCount: number
  }

export type UpdateTimerT = Partial<POSTTimerRequest> & { id: string }
