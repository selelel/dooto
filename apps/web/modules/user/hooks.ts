import { QueryKeys } from "@/constant/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories, register, signIn, signOut } from "./actions";
import { POSTRegisterRequestT, POSTSigninRequestT } from "./types";

export const useSignInUser = () => {
  return useMutation({
    mutationKey: QueryKeys.UserQueryKeys.actions('sign-in'),
    mutationFn: (value: POSTSigninRequestT) => signIn(value),
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationKey: QueryKeys.UserQueryKeys.actions('sign-out'),
    mutationFn: () => signOut(),
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: QueryKeys.UserQueryKeys.actions('register'),
    mutationFn: (value: POSTRegisterRequestT) => register(value),
  });
};

export const useGetCategory = () => {
  return useQuery({
    queryKey: QueryKeys.UserQueryKeys.item('category'),
    queryFn: () => getCategories(),
  });
};