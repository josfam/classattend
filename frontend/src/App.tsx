import {
	BrowserRouter as Router,
	Route,
	Routes
 } from 'react-router-dom'
import SignupForm from './pages/SignUpForm';
import './App.css'
import './base.css'

const App = () => {
  return (
	<div className='app-content w-full h-full p-8 flex items-center justify-center bg-slate-200
	overflow-y-scroll'>
		<Router>
			<Routes>
				<Route
					path='/'
					element={<SignupForm/>}/>
			</Routes>
		</Router>
	</div>
  );
}

export default App
