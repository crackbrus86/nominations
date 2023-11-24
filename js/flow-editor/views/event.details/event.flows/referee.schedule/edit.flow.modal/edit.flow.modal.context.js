import { createContext, useContext, useState } from 'react';

import { useFlowServices } from '.././../../../../services/flow.services.context';
import { useFlowForm } from '../flow.form/flow.form.context';
import { useRefereeSchedule } from '../referee.schedule.context';

const EditFlowModalContext = createContext();

const EditFlowModalContextProvider = ({ children }) => {
	const { onInit, onCleanUpForm } = useFlowForm();
	const { updateFlow } = useFlowServices();
	const { onLoadFlows } = useRefereeSchedule();
	const [showEditFlow, setShowEditFlow] = useState(false);

	const onEditFlow = (flow) => {
		setShowEditFlow(true);
		onInit(flow);
	};

	const onCloseEditFlow = () => {
		onCleanUpForm();
		setShowEditFlow(false);
	};

	const onUpdateFlow = async (flow) => {
		await updateFlow({ flow });
		await onLoadFlows();
		onCloseEditFlow();
	};

	const value = {
		showEditFlow,
		onEditFlow,
		onCloseEditFlow,
		onUpdateFlow,
	};

	return (
		<EditFlowModalContext.Provider value={value}>
			{children}
		</EditFlowModalContext.Provider>
	);
};

const useEditFlowModal = () => {
	const context = useContext(EditFlowModalContext);
	if (context === undefined)
		throw new Error(
			'useEditFlowModal must be used within EditFlowModalContextProvider'
		);
	return context;
};

export { EditFlowModalContextProvider, useEditFlowModal };
