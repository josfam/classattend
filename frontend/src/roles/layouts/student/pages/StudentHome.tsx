import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SuccessToast } from "@/components/Toasts";

const StudentHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showSuccessToast) {
      SuccessToast({ message: location.state.message });
    }
  }, [location.state]);

  useEffect(() => {
    // clear state
    navigate(location.pathname, { replace: true });
  }, [location.pathname, navigate]);

  return <h1 className="text-3xl">Your student homepage</h1>;
};

export default StudentHome;
