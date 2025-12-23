import { ENDPOINT } from "@/constant/api";
import axios from "axios";
import { POSTRegisterRequestT, POSTSigninRequestT } from "./types";

export const signIn = async (payload: POSTSigninRequestT) => {
  try {
    const endpoint = ENDPOINT.USER.signin;
    const response = await axios.post(endpoint, payload);

    return response;
  } catch (e:any) {
    throw e;
  }
};

export const register = async (payload: POSTRegisterRequestT) => {
  try {
    const endpoint = ENDPOINT.USER.register;
    const response = await axios.post(endpoint, payload);

    return response;
  } catch (e:any) {
    throw e;
  }
};