import { lazy,Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// To improve the performance of the application (code-splitting)
const LoadingPage = lazy(() => import('./components/LoadingPage'));
const Home = lazy(() => import('./components/Home'))
const EditItem = lazy(() => import('./components/EditItem'))

const App = () => {
	return (
		<>
			<Suspense fallback={<h1 className="text-center font-bold text-2xl">Coming up...</h1>}>
				<Routes>
					<Route path='/' element={<LoadingPage />} />
					<Route path='/home' element={<Home />} />
					<Route path='/edit/:id' element={<EditItem />} />
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
