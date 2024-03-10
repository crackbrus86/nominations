import { createContext, useContext, useState } from 'react';
import moment from 'moment';

const FlowServicesContext = createContext();

const FlowServicesContextProvider = ({ children }) => {
	const MESSAGES_TIMEOUT = 3000;
	const flowAPIBaseUrl = '../wp-content/plugins/nominations/api/flows/';
	const [isLoading, setIsLoading] = useState(false);
	const [alert, setAlert] = useState({ error: null, success: null });

	const showSuccess = (successAlert) => {
		setAlert({ ...alert, success: successAlert });
		setTimeout(() => {
			setAlert({ ...alert, success: null });
		}, MESSAGES_TIMEOUT);
	};

	const showError = (errorAlert) => {
		setAlert({ ...alert, error: errorAlert });
		setTimeout(() => {
			setAlert({ ...alert, error: null });
		}, MESSAGES_TIMEOUT);
	};

	const sendPostRequest = async ({ url, body }) => {
		return await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
	};

	const sendGetRequest = async ({ url, query = null }) => {
		const getUrl =
			query != null ? `${url}?${new URLSearchParams(query)}` : url;
		return await fetch(getUrl);
	};

	const sendRequest = async ({ url, method, request }) => {
		setIsLoading(true);

		try {
			let response;
			switch (method) {
				case 'POST': {
					response = await sendPostRequest({ url, body: request });
					break;
				}
				case 'GET': {
					response = await sendGetRequest({ url, query: request });
					break;
				}
				default:
					console.error('Unknown http method called');
			}

			setIsLoading(false);

			const result = await response.json();

			switch (result.status) {
				case 'Success': {
					if (result.message !== null) showSuccess(result.message);
					if (result.data !== null) return result.data;
					break;
				}
				case 'Error': {
					showError(result.message);
					break;
				}
				default:
					console.error(`Unknown response status: ${result.status}`);
			}
		} catch (err) {
			setIsLoading(false);
			console.error(`Finished with error: ${err}`);
		}
	};

	const getEvents = async ({ filter }) => {
		const url = flowAPIBaseUrl + 'GetEvents.php';
		return await sendRequest({ url, method: 'GET', request: { filter } });
	};

	const createFlow = async ({ flow }) => {
		const url = flowAPIBaseUrl + 'CreateFlow.php';
		const request = {
			event_id: flow.eventId,
			day_of_flow: moment(flow.dayOfFlow).format('YYYY-MM-DD'),
			weight_classes: [].concat(flow.weightClasses),
		};
		return await sendRequest({ url, method: 'POST', request });
	};

	const getAllRegionsNames = async () => {
		const url = flowAPIBaseUrl + 'GetAllRegionNames.php';
		return await sendRequest({ url, method: 'GET' });
	};

	const getEventReferees = async ({ eventId }) => {
		const url = flowAPIBaseUrl + 'GetEventReferees.php';
		return await sendRequest({ url, method: 'GET', request: { eventId } });
	};

	const getEventFlows = async ({ eventId }) => {
		const url = flowAPIBaseUrl + 'GetEventFlows.php';
		return await sendRequest({ url, method: 'GET', request: { eventId } });
	};

	const getRefereeWeightClassesBusy = async ({ eventId }) => {
		const url = flowAPIBaseUrl + 'GetRefereeWeightClassesBusy.php';
		return await sendRequest({ url, method: 'GET', request: { eventId } });
	};

	const updateFlow = async ({ flow }) => {
		const url = flowAPIBaseUrl + 'UpdateFlow.php';
		const request = {
			flowId: flow.flowId,
			weight_classes: [].concat(flow.weightClasses),
		};
		return await sendRequest({ url, method: 'POST', request });
	};

	const deleteFlow = async (flowId) => {
		const url = flowAPIBaseUrl + 'DeleteFlow.php';
		const request = {
			flowId: flowId,
		};
		return await sendRequest({ url, method: 'POST', request });
	};

	const saveRefereeRecord = async ({ flowId, refereeId, refereeStatus }) => {
		const url = flowAPIBaseUrl + 'SaveRefereeRecord.php';
		const request = {
			flowId,
			refereeId,
			refereeStatus,
		};
		return await sendRequest({ url, method: 'POST', request });
	};

	const value = {
		isLoading,
		alert,
		getEvents,
		createFlow,
		getAllRegionsNames,
		getEventReferees,
		getEventFlows,
		updateFlow,
		deleteFlow,
		saveRefereeRecord,
		getRefereeWeightClassesBusy,
	};
	return (
		<FlowServicesContext.Provider value={value}>
			{children}
		</FlowServicesContext.Provider>
	);
};

const useFlowServices = () => {
	const context = useContext(FlowServicesContext);
	if (context === undefined)
		throw new Error(
			'useFlowServices must be used within FlowServicesContext'
		);
	return context;
};

export { useFlowServices, FlowServicesContextProvider };
