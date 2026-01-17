import { QueryKeys } from "@/constant/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUser, exportAllData, getCategories, getMe, register, signIn, signOut, updateUser } from "./actions";
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

export const useGetMe = () => {
  return useQuery({
    queryKey: QueryKeys.UserQueryKeys.item('get-me'),
    queryFn: () => getMe(),
  });
};

export const useExportAllData = () => {
   return useMutation({
    mutationKey: QueryKeys.UserQueryKeys.item('export-all-data'),
    mutationFn: () => exportAllData(),
  });
};

export const useUpdateUser= () => {
  return useMutation({
    mutationKey: QueryKeys.UserQueryKeys.actions('update-user'),
    mutationFn: (data: Partial<POSTRegisterRequestT>) => updateUser(data),
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: QueryKeys.UserQueryKeys.actions('delete-user'),
    mutationFn: () => deleteUser(),
  });
};
