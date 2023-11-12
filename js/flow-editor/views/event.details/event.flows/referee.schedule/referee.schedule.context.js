import { createContext, useContext, useState, useMemo } from 'react';
import moment from 'moment';
import * as refStatusesJson from '../../refStatuses.json';

import { useFlows } from '../../../flows.context';
import { getFlowsOfDay, REF_STATUS_NA, mapReferee, mapFlow } from './utils';
import { useFlowServices } from '../../../../services/flow.services.context';

const RefereeScheduleContext = createContext();

const RefereeScheduleContextProvider = ({ children }) => {
	const { currentEvent } = useFlows();
	const { getEventReferees, getEventFlows, deleteFlow, saveRefereeRecord } =
		useFlowServices();
	const [flows, setFlows] = useState([]);
	const [referees, setReferees] = useState([]);
	const [flowToRemoveId, setFlowToRemoveId] = useState(null);
	const [showPreview, setShowPreview] = useState(false);

	const getCurrentEventDays = () => {
		const daysCount = moment(currentEvent.endsAt).diff(
			moment(currentEvent.startsAt),
			'days'
		);
		let day = moment(currentEvent.startsAt);
		let days = [];
		for (let i = 0; i <= daysCount; i++) {
			days[i] = {
				id: day.unix(),
				displayName: day.format('D - MMM'),
				value: day.toDate(),
			};
			day.add(1, 'day');
		}
		return days;
	};

	const days = getCurrentEventDays();

	const onLoadFlows = async () => {
		const data = await getEventFlows({ eventId: currentEvent.id });
		const nextFlows = data.map((flow) => mapFlow(flow));
		setFlows(nextFlows);
	};

	const onLoadReferees = async () => {
		const data = await getEventReferees({ eventId: currentEvent.id });
		const nextReferees = data
			.map((refereeResult) => mapReferee(refereeResult))
			.sort((a, b) => a.refCategoryId - b.refCategoryId);
		setReferees(nextReferees);
	};

	const onChangeRefereeStatus = async (flowId, refereeId, status) => {
		await saveRefereeRecord({
			flowId,
			refereeId,
			refereeStatus: status,
		});
		await onLoadFlows();
	};

	const flowsByDay = useMemo(() => {
		let flowsByDays = [];
		for (let i = 0; i < days.length; i++) {
			const day = days[i];
			const flowsOfDay = getFlowsOfDay(flows, day.value);
			if (flowsOfDay.length) {
				flowsByDays = flowsByDays.concat([...flowsOfDay]);
			} else {
				flowsByDays = flowsByDays.concat([null]);
			}
		}
		return flowsByDays;
	}, [days, flows]);

	const refereeStatuses = [{ value: REF_STATUS_NA, text: '' }].concat(
		refStatusesJson.statuses.map((s) => ({
			value: s.value,
			text: s.shortname,
		}))
	);

	const onRemoveFlow = (flowId) => {
		setFlowToRemoveId(flowId);
	};

	const onCancelDeleteFlow = () => {
		setFlowToRemoveId(null);
	};

	const onDeleteFlow = async () => {
		await deleteFlow(flowToRemoveId);
		setFlowToRemoveId(null);
		await onLoadFlows();
	};

	const onShowPreview = () => {
		setShowPreview(true);
	};

	const onHidePreview = () => {
		setShowPreview(false);
	};

	const value = {
		days,
		flows,
		referees,
		flowsByDay,
		refereeStatuses,
		flowToRemoveId,
		showPreview,
		onLoadFlows,
		onLoadReferees,
		onChangeRefereeStatus,
		onRemoveFlow,
		onCancelDeleteFlow,
		onDeleteFlow,
		onShowPreview,
		onHidePreview,
	};

	return (
		<RefereeScheduleContext.Provider value={value}>
			{children}
		</RefereeScheduleContext.Provider>
	);
};

const useRefereeSchedule = () => {
	const context = useContext(RefereeScheduleContext);
	if (context === undefined) {
		throw new Error(
			'useRefereeScheduleContext must be used within a RefereeScheduleContext'
		);
	}
	return context;
};

export { RefereeScheduleContextProvider, useRefereeSchedule };
