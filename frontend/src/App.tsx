import {
	BrowserRouter as Router,
	Route,
	Routes
 } from 'react-router-dom'
import SignupForm from './pages/SignUpForm';
import 'react-toastify/dist/ReactToastify.css'; // toast styling
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
  <>
    <ToastContainer></ToastContainer> {/* toast messages */}
    <div className='app-content w-full h-full p-8 flex items-center justify-center bg-neutral-50
    overflow-y-scroll'>
      <Router>
        <Routes>
          <Route path='/' element={<SignupForm/>}/>
        </Routes>
      </Router>
    </div>
  </>
  );
}

export default App
