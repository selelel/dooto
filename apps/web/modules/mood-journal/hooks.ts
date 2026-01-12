import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constant/queryKeys";
import { createMoodJournal, deleteMoodJournal, getMoodJournal, getMoodJournalByDate, getMoodJournals, updateMoodJournal } from "./actions";
import { PATCHMoodJournal, POSTMoodJournalRequest } from "./types";

export const useCreateMoodJournal = () => {
  return useMutation({
    mutationKey: QueryKeys.MoodJournalQueryKeys.parent("create-mood-journal"),
    mutationFn: (payload: POSTMoodJournalRequest) => createMoodJournal(payload),
  });
};

export const useGetMoodJournals = () => {
  return useQuery({
    queryKey: QueryKeys.MoodJournalQueryKeys.parent("get-mood-journals"),
    queryFn: () => getMoodJournals()
  });
};

export const useGetMoodJournalByDate = (dataRange: {to: string , from: string}) => {
  return useQuery({
    queryKey: QueryKeys.MoodJournalQueryKeys.parent("get-mood-journal-date"),
    queryFn: () => getMoodJournalByDate(dataRange)
  });
};

export const useGetMoodJournalById = (id: string) => {
  return useQuery({
    queryKey: QueryKeys.MoodJournalQueryKeys.parent("get-mood-journals"),
    queryFn: () => getMoodJournal(id)
  });
};

export const useDeleteMoodJournal = () => {
  return useMutation({
    mutationKey: QueryKeys.MoodJournalQueryKeys.parent("delete-mood-journals"),
    mutationFn: (id: string) => deleteMoodJournal(id),
  });
};

export const useUpdateMoodJournal = () => {
  return useMutation({
    mutationKey: QueryKeys.MoodJournalQueryKeys.parent("update-mood-journal"),
    mutationFn: (payload: PATCHMoodJournal) => updateMoodJournal(payload),
  });
};