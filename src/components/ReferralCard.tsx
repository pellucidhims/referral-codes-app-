import { ReferralContent } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import Snackbar from "./Snackbar";

const ReferralCard: React.FC<ReferralContent> = ({
  company,
  code,
  link,
  logo,
}) => {
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // alert(`Copied ${code} to clipboard!`);
    setIsCodeCopied(true);
  };

  const handleClose = () => {
    setIsCodeCopied(false);
  };

  return (
    <div className="card-appear flex flex-col items-center p-4 border rounded-lg shadow-md gap-4">
      <Image
        //   className="dark:invert"
        src={logo}
        alt={`${company} logo`}
        width={180}
        height={38}
        className="w-16 h-16 rounded-full"
        priority
      />
      <div className="flex flex-col items-center flex-grow">
        <h3 className="text-lg font-bold text-blue-500">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {company}
          </a>
        </h3>
        <button
          onClick={() => copyToClipboard(code)}
          className="mt-2 font-bold text-yellow-300 hover:text-white hover:font-bold"
        >
          {code}
        </button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={isCodeCopied}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <div className="text-center">{`Referral code copied to clipboard!`}</div>
        </Snackbar>
      </div>
    </div>
  );
};

export default ReferralCard;
