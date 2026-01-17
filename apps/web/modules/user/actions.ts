import { ENDPOINT } from "@/constant/http";
import axios from "axios";
import { Category, POSTRegisterRequestT, POSTRegisterResponseT, POSTSigninRequestT } from "./types";
import { logger } from "@/lib/logger";

export const signIn = async (payload: POSTSigninRequestT) => {
  try {
    const endpoint = ENDPOINT.USER.signin;
    const response = await axios.post(endpoint, payload);

    return response;
  } catch (e:any) {
    logger.trace(e)
    throw e;
  }
};

export const signOut = async () => {
  try {
    const endpoint = ENDPOINT.USER.logout;
    const response = await axios.post(endpoint);

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

export const getMe = async () :Promise<POSTRegisterResponseT> => {
  try {
    const endpoint = ENDPOINT.USER.me;
    const response = await axios.get(endpoint);

    return response.data;
  } catch (e:any) {
    throw e;
  }
};

export const exportAllData = async ():Promise<any> => {
  try {
      const response = await fetch(ENDPOINT.USER.exportAllData, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `user-data.json`;

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
};

export const updateUser = async (data: Partial<POSTRegisterRequestT>):Promise<POSTRegisterResponseT> => {
  try {
    const endpoint = ENDPOINT.USER.user;
    const response = await axios.patch(endpoint, data);

    return response.data;
  } catch (e:any) {
    throw e;
  }
};

//! this is not good code, lol, I'm just to sleepy for this.
export const deleteUser = async () :Promise<POSTRegisterResponseT> => {
  try {
    const endpoint = ENDPOINT.USER.user;
    const response = await axios.delete(endpoint);
    console.log(response)

    return response.data;
  } catch (e:any) {
    throw e;
  }
};

