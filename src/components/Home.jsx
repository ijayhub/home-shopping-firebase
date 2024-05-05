import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import HouseholdList from './HouseholdList';


const householdCollectionRef = collection(db, 'Household application');

const Home = () => {
	const [items, setItems] = useState([]);
	
  const getItems = async () => {
		try {
			const data = await getDocs(householdCollectionRef);
			const showData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setItems(showData);
		} catch (err) {
			console.error(err);
		
		}
	};

	useEffect(() => {
		getItems();
	}, []);

  return (
		<div>
			<div>
				{' '}
				<HouseholdList items={items} getItems={getItems} />
			</div>
			
		</div>
	);
};



export default Home;
