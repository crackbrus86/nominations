import { createContext, useContext, useState } from 'react';

import { useFlows } from '../../../../flows.context';
import { useFlowForm } from '../flow.form/flow.form.context';
import { useFlowServices } from '.././../../../../services/flow.services.context';
import { useRefereeSchedule } from '../referee.schedule.context';

const AddFlowModalContext = createContext();

const AddFlowModalContextProvider = ({ children }) => {
	const { currentEvent } = useFlows();
	const { onInit, onCleanUpForm } = useFlowForm();
	const { createFlow } = useFlowServices();
	const { onLoadFlows } = useRefereeSchedule();
	const [showAddFlow, setShowAddFlow] = useState(false);

	const onAddFlow = (day) => {
		const newFlow = {
			flowId: null,
			eventId: currentEvent.id,
			dayOfFlow: day.value,
			divisionId: 0,
			weightClasses: [],
		};
		setShowAddFlow(true);
		onInit(newFlow);
	};

	const onCloseAddFlow = () => {
		onCleanUpForm();
		setShowAddFlow(false);
	};

	const onCreateFlow = async (flow) => {
		await createFlow({ flow });
		await onLoadFlows();
		onCloseAddFlow();
	};

	const value = {
		showAddFlow,
		onAddFlow,
		onCloseAddFlow,
		onCreateFlow,
	};

	return (
		<AddFlowModalContext.Provider value={value}>
			{children}
		</AddFlowModalContext.Provider>
	);
};

const useAddFlowModal = () => {
	const context = useContext(AddFlowModalContext);
	if (context === undefined)
		throw new Error(
			'useAddFlowModal must be used within AddFlowModalContextProvider'
		);
	return context;
};

export { AddFlowModalContextProvider, useAddFlowModal };
