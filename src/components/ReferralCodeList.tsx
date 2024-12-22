"use client";

import { ReferralContent } from "@/types";
import ReferralCard from "./ReferralCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchReferrals } from "@/utils/hooks/useFetchReferrals";
import Loader from "./Loader";
import ErrorPage from "./ErrorPage";
import { debounce, searchByRegex } from "@/utils";

const ReferralCodeListLoader = ({
  loaderMessage = "Fetching referral coupons...",
}: {
  loaderMessage?: string;
}) => (
  <div className="flex gap-2 items-center justify-center p-50">
    <Loader size={"16"} color="blue" />
    <span>{loaderMessage}</span>
  </div>
);

export function ReferralCodeList(props: { initialData: ReferralContent[] | null }) {
  const [search, setSearch] = useState("");
  const {
    data: referralCodes = props.initialData || [],
    isLoading,
    isError,
    isSuccess,
  } = useFetchReferrals(props.initialData);
  const [filteredData, setFilteredData] = useState<ReferralContent[]>([]);

  useEffect(() => {
    console.log('1 use effect referralCodes: ', referralCodes)
    const filteredReferralCodes: ReferralContent[] = searchByRegex(
      search,
      referralCodes,
      "company"
    );

    setFilteredData(filteredReferralCodes);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referralCodes]);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      const filteredReferralCodes: ReferralContent[] = searchByRegex(
        searchTerm,
        referralCodes,
        "company"
      );

      setFilteredData(filteredReferralCodes);
    },
    [referralCodes]
  );

  const debouncedSearch = useMemo(
    () => debounce((searchTerm: string) => handleSearch(searchTerm), 500),
    [handleSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  if (isError) {
    return <ErrorPage errorMessage="Dangnabit! Something went wrong." />;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center sticky top-[0px] bg-black p-2 z-10">
        Referral Codes
      </h1>
      <input
        type="text"
        placeholder="Search by company name..."
        value={search}
        onChange={handleInputChange}
        className="sticky top-[45px] w-full p-2 my-4 border rounded-lg text-white disabled:cursor-not-allowed bg-black z-10"
        disabled={isLoading || isError}
      />
      {isLoading ? (
        <ReferralCodeListLoader />
      ) : isSuccess && filteredData?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredData?.map((referral: ReferralContent) => (
            <ReferralCard
              key={referral.id}
              id={referral.id}
              company={referral.company}
              code={referral.code}
              link={referral.link}
              logo={referral.logo}
            />
          ))}
        </div>
      ) : search.length ? (
        <div className="text-center">{`Oops! No results found for "${search}"`}</div>
      ) : (
        <ReferralCodeListLoader loaderMessage="Loading..." />
      )}
    </main>
  );
}
