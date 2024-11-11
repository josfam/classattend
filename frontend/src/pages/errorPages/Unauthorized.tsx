import { redirectDuration } from "@/utils/errors/errorConstants";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-sky-50">
      <div className=" flex flex-col gap-2 w-fit h-fit p-8 bg-red-200 rounded-lg">
        <p className="text-2xl text-red-700"> You are not authorized to view this page</p>
        <p className="text-2xl text-red-700"> Redirecting you back in {`${redirectDuration / 1000}`} seconds... </p>
      </div>
    </div>
  )
}

export default UnauthorizedPage;
