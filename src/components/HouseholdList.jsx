import { useState } from 'react';
import PropTypes from 'prop-types'; 
import { MdEditNote } from 'react-icons/md';
import ModalAdd from './ModalAdd';
import Delete from './Delete';
import { Link } from 'react-router-dom';
import Button from './Button';
import logo from '../assets/logo-house.jpg'
import house from '../assets/home shopping.png'



const HouseholdList = ({ items, getItems }) => {
	const [openModal, setOpenModal] = useState(false);
	const [checkedItems, setCheckedItems] = useState({});

	const handleCheckboxChange = (itemId) => {
		setCheckedItems((prevCheckedItems) => ({
			...prevCheckedItems,
			[itemId]: !prevCheckedItems[itemId],
		}));
	};

	return (
		<div className='heroCover '>
			<div className='overlay'>
				<div className='bg-white w-[100%] max-w-4xl lg:mx-auto mx-1 rounded-lg px-2 border-2 border-yellow-700 '>
					<div className='flex justify-between items-center'>
						<div>
							<img
								src={logo}
								alt='house appliance in a cart'
								className='w-8 lg:w-14'
							/>
						</div>
						<div>
							<Button
								onClick={() => setOpenModal(true)}
								value='Add Item'
								className='addBtn'
							/>
						</div>
					</div>
					<div className='p-2'>
						<h1 className='flex justify-center items-center mb-8 lg:mb-16'>
							<img src={house} alt="person with bags" className='w-20 lg:w-56' />
						</h1>
						<hr />
						{items.map((item) => (
							<div key={item.id} className='flex justify-between items-center'>
								<div className='flex items-center'>
									<input
										type='checkbox'
										className='p-2 mr-4'
										checked={checkedItems[item.id]}
										onChange={() => handleCheckboxChange(item.id)}
									/>
									<h2
										className={
											checkedItems[item.id] ? 'text-lg line-through' : 'text-lg'
										}>
										{item.Item1}
									</h2>
								</div>
								<div className='flex mt-3 text-md lg:text-xl'>
									<Link to={`/edit/${item.id}`}>
										<MdEditNote
											type='submit'
											className='bg-gray-500 text-white
										rounded-md p-1 mr-4'
										/>
									</Link>
									<Delete getItems={getItems} item={item} />
								</div>
							</div>
						))}
					</div>
					<div>
						<ModalAdd
							openModal={openModal}
							onCloseModal={() => setOpenModal(false)}
							getItems={getItems} // Fixed prop name to getItems
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

// Prop validation
HouseholdList.propTypes = {
	items: PropTypes.array.isRequired,
	getItems: PropTypes.func.isRequired,
};

export default HouseholdList;
