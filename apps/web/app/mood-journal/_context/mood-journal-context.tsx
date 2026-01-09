import { QueryKeys } from "@/constant/queryKeys";
import {
  useCreateMoodJournal,
  useDeleteMoodJournal,
  useGetMoodJournalById,
  useGetMoodJournals,
  useUpdateMoodJournal,
} from "@/modules/mood-journal/hooks";
import {
  PATCHMoodJournal,
  POSTMoodJournalRequest,
  POSTMoodJournalResponse,
} from "@/modules/mood-journal/types";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface MoodJournalContextValue {
  data: POSTMoodJournalResponse[];
  handleCreateMoodJournal: (d: POSTMoodJournalRequest) => void;
  handleUpdateMoodJournal: (d: PATCHMoodJournal) => void;
  handleDeleteMoodJournal: (d: string) => void;
}

const MoodJournalContext = createContext<MoodJournalContextValue | null>(null);

export function MoodJournalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const { data: moodJournalData } = useGetMoodJournals();
  const { mutate: createMoodJournal } = useCreateMoodJournal();
  const { mutate: updateMoodJournal } = useUpdateMoodJournal();
  const { mutate: deleteMoodJournal } = useDeleteMoodJournal();

  const onSuccessRefetch = {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.MoodJournalQueryKeys.parent("get-mood-journals"),
      });
    },
  };

  const handleCreateMoodJournal = (data: POSTMoodJournalRequest) => {
    createMoodJournal(data, onSuccessRefetch);
  };

  const handleUpdateMoodJournal = (data: PATCHMoodJournal) => {
    updateMoodJournal(data, onSuccessRefetch);
  };

  const handleDeleteMoodJournal = (id: string) => {
    deleteMoodJournal(id, onSuccessRefetch);
  };

  return (
    <MoodJournalContext.Provider
      value={{
        data: moodJournalData || [],
        handleCreateMoodJournal,
        handleUpdateMoodJournal,
        handleDeleteMoodJournal,
      }}
    >
      {children}
    </MoodJournalContext.Provider>
  );
}

export function useMoodJournal() {
  const context = useContext(MoodJournalContext);
  if (!context) {
    throw new Error("useMoodJournal must be used within a MoodJournalProvider");
  }
  return context;
}
