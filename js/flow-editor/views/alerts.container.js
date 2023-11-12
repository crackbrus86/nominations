import Alert from '../../components/alert/alert';
import { useFlowServices } from '../services/flow.services.context';

const AlertsContainer = () => {
	const { alert } = useFlowServices();

	return <Alert alert={alert} />;
};

export default AlertsContainer;
