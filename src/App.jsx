import EditItem from './components/EditItem';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';

const App = () => {
	return (
		<div className=''>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/home' element={<Home />} />
				<Route path='/edit/:id' element={<EditItem />} />
			</Routes>
		</div>
	);
};

export default App;
