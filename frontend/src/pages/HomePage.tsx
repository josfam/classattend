/** Homepage, i.e. the / route */

import { useNavigate } from "react-router-dom";
import { loginPath, signupPath } from "@/utils/urlPaths/appUrlPaths";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[500px] w-full flex-col items-center rounded-lg rounded-br-xl rounded-tr-xl border-2 border-slate-200 shadow-xl shadow-slate-200 lg:w-5/6 xl:flex xl:flex-row xl:bg-slate-800">
      <div className="hidden h-full min-w-[500px] flex-grow flex-col items-center justify-center gap-6 rounded-bl-lg rounded-tl-lg px-8 xl:flex">
        <img
          src="/classattend-logo-tagline.png"
          alt="Picture of the classattend full logo with the tagline 'elegant attendance-taking'"
          className="h-28 w-auto"
        />
      </div>
      <div className="flex h-full min-w-[300px] flex-grow flex-col items-center justify-start gap-12 rounded-lg bg-white lg:min-w-[500px] xl:justify-center xl:p-8">
        <div className="flex h-fit w-full items-center justify-center gap-4 rounded-tl-lg rounded-tr-lg bg-slate-800 py-8 xl:hidden">
          <img src="/classattend-symbol-logo.svg" alt="" className="w-16" />
          <p className="text-2xl text-emerald-400">classattend</p>
        </div>
        <h1 className="text-3xl text-emerald-800">👋 Welcome</h1>
        <div className="flex w-2/3 flex-col gap-4">
          <button className="btn-pri" onClick={() => navigate(`${signupPath}`)}>
            SignUp
          </button>
          <button className="btn-pri" onClick={() => navigate(`${loginPath}`)}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
