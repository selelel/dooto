
export type POSTMoodJournalRequest = Omit<POSTMoodJournalResponse, 'id' | 'createdAt' | 'userId' | 'updatedAt'>

export type POSTMoodJournalResponse = {
  id: string,
  userId: string,
  note: string,
  mood: MOOD,
  createdAt: string,
  updatedAt: string,
  date: string
}

export type MOOD =  "HAPPY" | "SAD" | "ANGRY" | "ANXIOUS" | "EXCITED" | "CALM"
