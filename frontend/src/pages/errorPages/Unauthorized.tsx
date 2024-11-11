import { redirectDuration } from "@/utils/errors/errorConstants";

const UnauthorizedPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-sky-50">
      <div className="flex h-fit w-fit flex-col gap-2 rounded-lg bg-red-200 p-8">
        <p className="text-2xl text-red-700">
          You are not authorized to view this page
        </p>
        <p className="text-2xl text-red-700">
          Redirecting you back in {`${redirectDuration / 1000}`} seconds...{" "}
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
