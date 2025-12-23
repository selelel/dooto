import { QueryKeys } from "@/constant/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { register, signIn } from "./actions";
import { POSTRegisterRequestT, POSTSigninRequestT } from "./types";

export const useSignInUser = () => {
  return useMutation({
    mutationKey: QueryKeys.UserQueryKeys.actions('sign-in'),
    mutationFn: (value: POSTSigninRequestT) => signIn(value),
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: QueryKeys.UserQueryKeys.actions('register'),
    mutationFn: (value: POSTRegisterRequestT) => register(value),
  });
};