import { useEffect, useState } from "react";
import { getTimeSince } from "../_utils";

export function useSinceTimer(startDate: Date) {
  const [time, setTime] = useState(() => getTimeSince(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeSince(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return time;
}
