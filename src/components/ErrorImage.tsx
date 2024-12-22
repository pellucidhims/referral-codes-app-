const ErrorImage = ({
  errorText = "Something broke on our end.",
}: {
  errorText?: string;
}) => {
  return (
    <div className="w-50 h-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="none"
        className="w-full h-auto"
      >
        <rect width="512" height="512" fill="#0a0a0a" />
        <path
          d="M306.5 262c-6.9 0-12.5-5.6-12.5-12.5v-97c0-6.9 5.6-12.5 12.5-12.5h30c6.9 0 12.5 5.6 12.5 12.5v97c0 6.9-5.6 12.5-12.5 12.5h-30zM175.5 262c-6.9 0-12.5-5.6-12.5-12.5v-97c0-6.9 5.6-12.5 12.5-12.5h30c6.9 0 12.5 5.6 12.5 12.5v97c0 6.9-5.6 12.5-12.5 12.5h-30z"
          fill="#D9534F"
        />
        <circle cx="256" cy="128" r="64" fill="#5bc0de" />
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          fontFamily="'Arial', sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="#fff"
        >
          {errorText}
        </text>
      </svg>
    </div>
  );
};

export default ErrorImage;
