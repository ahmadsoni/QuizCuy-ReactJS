import '../assets/styles/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './login/LoginPage';
import Quiz from './Quiz';

export default function App() {
	return (

		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/quiz/*' element={<Quiz />} />
			</Routes>
		</Router>
	);
}

