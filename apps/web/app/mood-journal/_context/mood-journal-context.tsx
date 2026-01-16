import { QueryKeys } from "@/constant/queryKeys";
import {
  useCreateMoodJournal,
  useDeleteMoodJournal,
  useGetMoodJournalById,
  useGetMoodJournals,
  useUpdateMoodJournal,
} from "@/modules/mood-journal/hooks";
import { useMoodJournalStore } from "@/modules/mood-journal/store";
import {
  PATCHMoodJournal,
  POSTMoodJournalRequest,
  POSTMoodJournalResponse,
} from "@/modules/mood-journal/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface MoodJournalContextValue {
  data: POSTMoodJournalResponse[];
  handleCreateMoodJournal: (d: POSTMoodJournalRequest) => void;
  handleUpdateMoodJournal: (d: PATCHMoodJournal) => void;
  handleDeleteMoodJournal: (d: string) => void;
  setView: Dispatch<SetStateAction<"list" | "calendar">>;
  view: "list" | "calendar";
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
  currentMonth: Date;
}

const MoodJournalContext = createContext<MoodJournalContextValue | null>(null);

export function MoodJournalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    setJournals,
    addJournal,
    updateJournal,
    getJournalById,
    removeJournal,
    journals: moodJournalData,
  } = useMoodJournalStore();
  const { data } = useGetMoodJournals();
  const { mutate: createMoodJournal } = useCreateMoodJournal();
  const { mutate: updateMoodJournal } = useUpdateMoodJournal();
  const { mutate: deleteMoodJournal } = useDeleteMoodJournal();
  const [view, setView] = useState<"list" | "calendar">("list");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (!!data) {
      setJournals(data);
    }
  }, [data]);

  const handleCreateMoodJournal = (data: POSTMoodJournalRequest) => {
    createMoodJournal(data, {
      onSuccess: (d) => {
        addJournal(d);
      },
    });
  };

  const handleUpdateMoodJournal = (data: PATCHMoodJournal) => {
    const prev = getJournalById(data.id);

    if (!prev) return;
    const prevSnapshot: POSTMoodJournalResponse = structuredClone(prev);
    updateJournal(data);
    updateMoodJournal(data, {
      onError: () => {
        updateJournal(prevSnapshot);
      },
    });
  };

  const handleDeleteMoodJournal = (id: string) => {
    const prev = getJournalById(id);

    if (!prev) return;
    const prevSnapshot: POSTMoodJournalResponse = structuredClone(prev);
    removeJournal(id);
    deleteMoodJournal(id, {
      onError: () => {
        updateJournal(prevSnapshot);
      },
    });
  };

  return (
    <MoodJournalContext.Provider
      value={{
        data: moodJournalData || [],
        handleCreateMoodJournal,
        handleUpdateMoodJournal,
        handleDeleteMoodJournal,
        view,
        setView,
        currentMonth,
        setCurrentMonth,
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
