import Alert from "../components/alert/alert";
import { useEventsServices } from './events.services.context';

const AlertsContainer = () => {
    const { alert } = useEventsServices()

    return <Alert alert={alert} />
}

export default AlertsContainer;