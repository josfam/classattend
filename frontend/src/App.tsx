import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import SignupForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import HomePage from "./pages/HomePage";
import StudentHome from "./roles/layouts/student/pages/StudentHome";
import StudentLayout from "./roles/layouts/student/StudentLayout";
import LecturerHome from "./roles/layouts/lecturer/pages/LecturerHome";
import MainLayout from "./roles/layouts/MainLayout";
import LecturerLayout from "./roles/layouts/lecturer/LecturerLayout";
import { loginPath, signupPath } from "./utils/urlPaths/appUrlPaths";
import ProtectedRoute from "./components/ProtectedRoute";
import { Role } from "./utils/schemas/SchemaConstants";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" /> {/* toast messages */}
      {/* <div className="app-content flex h-full w-full items-center justify-center overflow-y-scroll bg-neutral-50 p-8"> */}
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={`${signupPath}`} element={<SignupForm />} />
            <Route path={`${loginPath}`} element={<LoginForm />} />
          </Route>

          {/* protected student-specific routes */}
          <Route element={<ProtectedRoute allowedRoles={[Role.Student]} />}>
            <Route path="/student/*" element={<StudentLayout />}>
              {/* nested routes for Outlet */}
              <Route index element={<StudentHome />} />
            </Route>
          </Route>

          {/* protected lecturer-specific routes */}
          <Route element={<ProtectedRoute allowedRoles={[Role.Lecturer]} />}>
            <Route path="/lecturer/*" element={<LecturerLayout />}>
              <Route index element={<LecturerHome />}></Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
