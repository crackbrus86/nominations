import AlertError from './alert.error';
import AlertSuccess from './alert.success';

const Alert = ({ alert = { success: null, error: null } }) => {
	if (alert.error) return <AlertError message={alert.error} />;

	if (alert.success) return <AlertSuccess message={alert.success} />;

	return null;
};

export default Alert;
