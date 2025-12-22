import { QueryKeys } from "@/constant/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signIn } from "./actions";
import { POSTSigninRequestT } from "./types";

export const useSignInUser = () => {
  return useMutation({
    mutationKey: QueryKeys.UserQueryKeys.actions('sign-in'),
    mutationFn: (value: POSTSigninRequestT) => signIn(value),
  });
};