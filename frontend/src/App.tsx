import {
	BrowserRouter as Router,
	Route,
	Routes
 } from 'react-router-dom'
import SignupForm from './pages/SignUpForm';

const App = () => {
  return (
	<div className='app-content w-full h-full p-8 flex items-center justify-center bg-neutral-50
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
