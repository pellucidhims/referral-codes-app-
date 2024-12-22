import { ReferralContent } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { API_END_POINT } from "../constants";



export const useFetchReferrals = (initialData?: ReferralContent[] | null) => {
  return useQuery({
    queryKey: ["referrals"],
    queryFn: async () => {
      const response = await fetch(API_END_POINT);
      if (!response.ok) throw new Error("Failed to fetch referrals");
      const data = await response.json();
      console.log('returning useFetchReferrals data: ', data)
      return data.content;
    },
    initialData,
  });
};
