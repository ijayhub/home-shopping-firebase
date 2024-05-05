import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase'; 
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditItem = () => {
	const [editedText, setEditedText] = useState(""); 
	const [pending, setPending] = useState(false)
	const { id } = useParams(); 
	const navigate = useNavigate()

	const handleEdit = async (event) => {
		event.preventDefault();
		setPending(true)
		try {
			await updateDoc(doc(db, 'Household application', id), {
				Item1: editedText
			});

			// alert message
			alert(`Item updated successfully: ${editedText}`);
			// Clear the input field
			setEditedText('');
			navigate('/home')

		} catch (error) {
			console.error('Error updating item:', error);
		}
	};

	return (
		<div className='heroCover pt-6'>
			<div className='max-w-3xl lg:mx-auto mx-5 bg-white rounded-lg p-3'>
				<h1 className='lg:text-3xl text-center  text-gray-600 hover:text-blue-600 mb-8'>
					Update An Item 
				</h1>
				<form onSubmit={handleEdit}>
					<div className='mb-4 items-start'>
						<input
							id='text'
							value={editedText}
							onChange={(event) => setEditedText(event.target.value)}
							placeholder='Edit household item'
							className='p-3 block w-full border border-gray-300 rounded-md outline-none'
							required
						/>
					</div>
					<div className='flex justify-center'>
						{!pending && (
							<Button
								className='bg-green-700 text-white font-bold p-2 rounded-md'
								type='submit'
								value='Update item'
							/>
						)}
					</div>
					<div className='flex justify-center'>
						{pending && (
							<Button
								className='bg-blue-700 text-white font-bold p-2 rounded-md'
								disable
								type='submit'
								value='Update item...'
							/>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

EditItem.propTypes = {
	getItems: PropTypes.func, // Make getItems prop optional
	// item: PropTypes.object.isRequired,
};

export default EditItem;
