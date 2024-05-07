import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsTrash3Fill } from 'react-icons/bs';

const toastCSS = {
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'light',
};


const Delete = ({ getItems, item }) => {
	const deleteHousehold = async (id) => {
		try {
			await deleteDoc(doc(db, 'Household application', id));
			window.confirm('Are you sure this item is to be deleted?');
			getItems(); // Refresh items after deletion
			toast.success('Item deleted successfully');
		} catch (error) {
			toast.error('Error deleting item:', error);
		}
	};

	return (
		<div>
			<BsTrash3Fill
				className='bg-red-700 text-white rounded-md p-1 mr-4 shadow-lg'
				onClick={() => deleteHousehold(item.id)} 
			/>
			<ToastContainer style={{ toastCSS }} />
		</div>
	);
};

Delete.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired, 
};

export default Delete;
