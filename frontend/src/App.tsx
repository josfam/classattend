import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import SignupForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import HomePage from "./pages/HomePage";
import StudentHome from "./roles/layouts/student/pages/StudentHome";
import StudentLayout from "./roles/layouts/student/StudentLayout";
import LecturerHome from "./roles/layouts/lecturer/pages/LecturerHome";
import MainLayout from "./roles/layouts/MainLayout";
import LecturerLayout from "./roles/layouts/lecturer/LecturerLayout";
import {
  loginPath,
  signupPath,
  classroomsPath,
} from "./utils/urlPaths/appUrlPaths";
import ProtectedRoute from "./components/ProtectedRoute";
import { Role } from "./utils/schemasAndTypes/SchemaConstants";
import { AiFillExclamationCircle, AiFillCheckCircle } from "react-icons/ai";
import AddClassroom from "./roles/layouts/lecturer/pages/AddClassroom";
import ClassroomPage from "./roles/layouts/lecturer/pages/ClassroomPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// tanstack client instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      {/* toast messages */}
      <Toaster
        richColors
        position="top-right"
        icons={{
          error: <AiFillExclamationCircle />,
          success: <AiFillCheckCircle />,
        }}
        visibleToasts={4}
      />
      {/* wrapping app in a tanstack query client provider */}
      <QueryClientProvider client={queryClient}>
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
                <Route
                  index
                  element={<Navigate to={`${classroomsPath}`} replace />}
                ></Route>
                <Route
                  path={`${classroomsPath}`}
                  element={<StudentHome />}
                ></Route>
              </Route>
            </Route>
            {/* protected lecturer-specific routes */}
            <Route element={<ProtectedRoute allowedRoles={[Role.Lecturer]} />}>
              <Route path="/lecturer/*" element={<LecturerLayout />}>
                <Route
                  index
                  element={<Navigate to={`${classroomsPath}`} replace />}
                ></Route>
                <Route
                  path={`${classroomsPath}`}
                  element={<LecturerHome />}
                ></Route>
                <Route
                  path={`${classroomsPath}/add`}
                  element={<AddClassroom />}
                ></Route>
                <Route
                  path={`${classroomsPath}/:id`}
                  element={<ClassroomPage />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
};

export default App;
