import { createContext, useContext, useState, useMemo } from 'react';

import * as divisionsJson from '../../../../../../divisions.json';
import * as weightClassesJson from '../../../../../../weightClasses.json';
import { useFlows } from '../../../../flows.context';

const defaultFlow = {
	flowId: null,
	eventId: null,
	dayOfFlow: null,
	divisionId: 0,
	weightClasses: [],
};

const FlowFormContext = createContext();

const FlowFormContextProvider = ({ children }) => {
	const [flow, setFlow] = useState(defaultFlow);
	const { currentEvent } = useFlows();

	const onInit = (nextFlow) => {
		setFlow(nextFlow);
	};

	const onCleanUpForm = () => {
		setFlow(defaultFlow);
	};

	const onChangeFlow = (field, value) => {
		setFlow({
			...flow,
			[field]: value,
		});
	};

	const divisions = [{ value: 0, text: '' }].concat(
		divisionsJson.divisions.map((division) => ({
			value: division.id,
			text: division.flowTitle,
		}))
	);

	const currentDivisionId = useMemo(() => {
		return flow.divisionId;
	}, [flow]);

	const currentDivision = currentDivisionId
		? divisionsJson.divisions.find((d) => d.id == currentDivisionId)
		: null;

	const flowWeightClasses = useMemo(() => {
		return flow.weightClasses;
	}, [flow]);

	const weightClasses = useMemo(() => {
		const result = currentDivision
			? weightClassesJson.weightClasses
					.filter(
						(wcl) =>
							wcl.gender == currentDivision.gender &&
							((currentEvent.isForJuniors && wcl.division == 'subjuniors') || (!currentEvent.isForJuniors && wcl.division == 'open')) &&
							!wcl.hide &&
							!flowWeightClasses.find(
								(flowWC) =>
									flowWC.divisionId == currentDivision.id &&
									flowWC.weightClassId == wcl.id
							)
					)
					.sort((wclA, wclB) => wclA.sortOrder - wclB.sortOrder)
					.map((wcl) => ({ value: wcl.id, text: wcl.name }))
			: [];
		return [{ value: null, text: '' }].concat(result);
	}, [flowWeightClasses, currentDivision]);

	const selectedWeightClasses = useMemo(() => {
		return flowWeightClasses.map((flowWC) => {
			const division = divisions.find(
				(d) => d.value == flowWC.divisionId
			);
			const weightClass = weightClassesJson.weightClasses.find(
				(wcl) => wcl.id == flowWC.weightClassId
			);
			return {
				weightClassId: weightClass.id,
				divisionId: flowWC.divisionId,
				text: `${division.text}/${weightClass.name}`,
			};
		});
	}, [flowWeightClasses]);

	const isFlowReady = flow && flow.weightClasses.length > 0;

	const value = {
		flow,
		flowWeightClasses,
		divisions,
		currentDivision,
		selectedWeightClasses,
		weightClasses,
		isFlowReady,
		onInit,
		onCleanUpForm,
		onChangeFlow,
	};

	return (
		<FlowFormContext.Provider value={value}>
			{children}
		</FlowFormContext.Provider>
	);
};

const useFlowForm = () => {
	const context = useContext(FlowFormContext);
	if (context === undefined)
		throw new Error(
			'useFlowForm must be used within FlowFormContextProvider'
		);
	return context;
};

export { FlowFormContextProvider, useFlowForm };
