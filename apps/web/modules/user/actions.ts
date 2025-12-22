import { ENDPOINT } from "@/constant/api";
import axios from "axios";
import { POSTSigninRequestT } from "./types";
import { logger } from "@/lib/logger";

export const signIn = async (payload: POSTSigninRequestT) => {
  try {
    const endpoint = ENDPOINT.USER.signin;
    const response = await axios.post(endpoint, payload);

    return response;
  } catch (e) {
    logger.info("Error:", e);
    throw e;
  }
};