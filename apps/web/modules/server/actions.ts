import { ENDPOINT } from "@/constant/http";
import axios from "axios";

export type HealthState =
  | { state: "online" }
  | { state: "offline" };


export const getHealth = async (): Promise<HealthState> => {
  try {
    const { data } = await axios.get(ENDPOINT.SERVER.health, {
      timeout: 3000,
    });

    if (data?.message === "online") {
      return { state: "online" };
    }

    return { state: "offline" };
  } catch {
    return { state: "offline" };
  }
};
