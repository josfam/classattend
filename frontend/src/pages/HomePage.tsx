/** Homepage, i.e. the / route */

import { useNavigate } from "react-router-dom";
import { loginPath, signupPath } from "@/utils/urlPaths/appUrlPaths";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl">👋 Welcome to classattend</h1>
      <div className="flex flex-col gap-4">
        <button className="btn-pri" onClick={() => navigate(`${signupPath}`)}>
          SignUp
        </button>
        <button className="btn-pri" onClick={() => navigate(`${loginPath}`)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
