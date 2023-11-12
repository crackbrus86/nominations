import './alert.scss';

const AlertSuccess = ({ message }) => {
	return (
		<div className="alert alert-success alert-absolute" role="alert">
			{message}
		</div>
	);
};
export default AlertSuccess;
