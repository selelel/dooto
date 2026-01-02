import { ENDPOINT } from "@/constant/http";
import axios from "axios";
import { Category, POSTRegisterRequestT, POSTSigninRequestT } from "./types";
import { logger } from "@/lib/logger";

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

export const getCategories = async () :Promise<{categories: Category[]}> => {
  try {
    const endpoint = ENDPOINT.USER.category;
    const response = await axios.get<{categories: Category[]}>(endpoint);

    return response.data;
  } catch (e:any) {
    throw e;
  }
};