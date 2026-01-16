import { useEffect, useState } from "react";
import { getHealth, HealthState } from "./actions";

const INTERVAL = 10_000;

export function useServerHealth() {
  const [health, setHealth] = useState<HealthState>({
    state: "offline",
  });

  useEffect(() => {
    const check = async () => {
      const result = await getHealth();
      setHealth(result);
    };

    check();
    const id = setInterval(check, INTERVAL);

    return () => clearInterval(id);
  }, []);

  return health;
}
