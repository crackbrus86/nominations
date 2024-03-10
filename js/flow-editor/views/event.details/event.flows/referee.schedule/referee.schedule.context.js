import { createContext, useContext, useState, useMemo } from 'react';
import moment from 'moment';
import * as refStatusesJson from '../../refStatuses.json';

import { useFlows } from '../../../flows.context';
import { getFlowsOfDay, REF_STATUS_NA, mapReferee, mapFlow, REF_STATUS_BUSY } from './utils';
import { useFlowServices } from '../../../../services/flow.services.context';
import { useEventSelector } from '../../../event.selector/event.selector.context';

const RefereeScheduleContext = createContext();

const RefereeScheduleContextProvider = ({ children }) => {
	const { currentEvent } = useFlows();
	const { getEventReferees, getEventFlows, deleteFlow, saveRefereeRecord, getRefereeWeightClassesBusy } =
		useFlowServices();
	const [flows, setFlows] = useState([]);
	const [referees, setReferees] = useState([]);
	const [flowToRemoveId, setFlowToRemoveId] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [refereeBusy, setRefereeBusy] = useState([]);
	const { regionNames } = useEventSelector();

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
			.map((refereeResult) => mapReferee(refereeResult, regionNames))
			.sort((a, b) => a.refCategoryId - b.refCategoryId);
		setReferees(nextReferees);
	};

	const onLoadRefereeBusy = async () => {
		const data = await getRefereeWeightClassesBusy({ eventId: currentEvent.id });
		setRefereeBusy(data);
	};

	const onChangeRefereeStatus = async (flowId, refereeId, status) => {
		await saveRefereeRecord({
			flowId,
			refereeId,
			refereeStatus: status,
		});
		const flowIndex = flowsByDay.findIndex((x) => x.flowId == flowId);
		const nextFlow = flowsByDay[flowIndex + 1];
		const nextFlowIsBusy = refereeBusy.filter(
			(r) =>
				r.id == refereeId &&
				nextFlow.weightClasses.find(
					(w) =>
						w.weightClassId == r.weight_class_id &&
						w.divisionId == r.division_id
				)
		);
		if (
			![REF_STATUS_BUSY, REF_STATUS_NA].includes(+status) &&
			nextFlow &&
			!nextFlow.referees.filter(r => r.refereeId == refereeId).length &&
			!nextFlowIsBusy.length
		) {
			await saveRefereeRecord({
				flowId: nextFlow.flowId,
				refereeId,
				refereeStatus: REF_STATUS_BUSY,
			});
		}
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
		refereeBusy,
		onLoadFlows,
		onLoadReferees,
		onChangeRefereeStatus,
		onRemoveFlow,
		onCancelDeleteFlow,
		onDeleteFlow,
		onShowPreview,
		onLoadRefereeBusy,
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
