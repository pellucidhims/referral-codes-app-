import ErrorImage from "./ErrorImage";

interface ErrorPageProps {
  errorMessage: string;
}

const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <ErrorImage errorText="Something Broke on Our End"/>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
