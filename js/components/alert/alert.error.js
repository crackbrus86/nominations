import './alert.scss';

const AlertError = ({ message }) => {
	return (
		<div className="alert alert-danger alert-absolute" role="alert">
			{message}
		</div>
	);
};
export default AlertError;
