import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'flowbite-react';
import Button from './Button';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import logo from '../assets/logo-house.jpg'

const householdCollectionRef = collection(db, 'Household application');

const ModalAdd = ({ openModal, onCloseModal, getItems }) => {
	const [text, setText] = useState('');
	const [newIsChecked, setNewIsChecked] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const handleAddItem = async (event) => {
		event.preventDefault();
		setIsPending(true);
		try {
			await addDoc(householdCollectionRef, {
				Item1: text,
				isChecked: newIsChecked,
			});
			onCloseModal();
			if (getItems) getItems();
			window.location.reload();
			alert('Household item added successfully');
		} catch (error) {
			console.error('Error adding document: ', error);
			setError(error.message);
		}
		setText('');
	};

	return (
		<Modal
			show={openModal}
			size='md'
			onClose={onCloseModal}
			popup
			className='overflow-y-auto bg-gray-900 bg-opacity-50 flex flex-cols items-center justify-center p top-0'>
			<Modal.Header>
				<div>
					<img src={logo} alt='house appliance in a cart' className='w-14' />
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className='max-w-md mx-auto bg-white rounded-lg p-3'>
					<form onSubmit={handleAddItem}>
						<div className='mb-4'>
							<input
								id='text'
								value={text}
								onChange={(event) => setText(event.target.value)}
								className='input'
								placeholder='Type item...'
								required
							/>
						</div>
						<div className='mb-4 flex items-center'>
							<input
								type='checkbox'
								checked={newIsChecked}
								onChange={(event) => setNewIsChecked(event.target.checked)}
								className='mr-2'
							/>
						</div>
						{error && <div className='text-red-500'>{error}</div>}
						{!isPending && (
							<div className='flex justify-end'>
								<Button
									type='submit'
									className='bg-blue-700 text-white font-bold p-2 rounded-lg'
									value='Add Item'
								/>
							</div>
						)}
						{isPending && (
							<div className='flex justify-end'>
								<Button
									type='submit'
									className='bg-green-700 text-white font-bold p-2 rounded-lg'
									disabled
									value='Adding Item ...'
								/>
							</div>
						)}
					</form>
				</div>
			</Modal.Body>
		</Modal>
	);
};

ModalAdd.propTypes = {
	openModal: PropTypes.bool.isRequired,
	onCloseModal: PropTypes.func.isRequired,
	getItems: PropTypes.func,
};

export default ModalAdd;
