import { useState } from "react";
import { CirclesWithBar } from 'react-loader-spinner'
import Home from "../components/Home";


const LandingPage = () => {
	const [isLoading, setIsLoading] = useState(true);

	setTimeout(() => {
		setIsLoading(false);
	}, 3000);
	return (
		<>
			<main className='bg-gray-300'>
				{isLoading && (
					<div className='flex flex-col pt-54 justify-center items-center h-screen '>
						<CirclesWithBar
							height='100'
							width='100'
							color='gray'
							outerCircleColor='gray'
							innerCircleColor='gray'
							barColor='gray'
							ariaLabel='circles-with-bar-loading'
							wrapperStyle={{}}
							wrapperClass=''
							visible={true}
						/>
						<div className='mb-6'>
							<p className='text-3xl font-bold text-gray-700 '>Loading...</p>
						</div>
					</div>
				)}
			</main>
			<div>{!isLoading && <Home />}</div>
		</>
	);
}

export default LandingPage
