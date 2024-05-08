import PropTypes from 'prop-types';

const Button = ({ value, className, type, onClick }) => {
	return (
		<div>
			<button onClick={onClick} type={type} className={className}>
				{value}
			</button>
		</div>
	);
};

Button.propTypes = {
	value: PropTypes.string.isRequired,
	className: PropTypes.string,
	type: PropTypes.oneOf(['button', 'submit', 'reset']), 
	onClick: PropTypes.func,
};

export default Button;

