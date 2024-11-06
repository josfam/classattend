import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import SignupForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import HomePage from "./pages/HomePage";
import StudentHome from "./roles/layouts/student/pages/StudentHome";
import LecturerHome from "./roles/layouts/lecturer/pages/LecturerHome";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" /> {/* toast messages */}
      <div className="app-content flex h-full w-full items-center justify-center overflow-y-scroll bg-neutral-50 p-8">
        <Router>
          <Routes>
            {/* public routes */}
            <Route index element={<HomePage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />

            {/* student-specific routes */}
            <Route path="/student/*">
              <Route index element={<StudentHome />}></Route>
            </Route>

            {/* lecturer-specific routes */}
            <Route path="/lecturer/*">
              <Route index element={<LecturerHome />}></Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
