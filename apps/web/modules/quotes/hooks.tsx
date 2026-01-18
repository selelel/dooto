import { QueryKeys } from "@/constant/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getQoute } from "./action";
import { GetQuoteParams } from "./types";

export const useGetQoutes = (params?: GetQuoteParams) => {
  return useQuery({
    queryKey: QueryKeys.QoutesQueryKeys.parent(
      "get-quotes",
      params || "without-params",
    ),
    queryFn: () => getQoute(params),
  });
};
