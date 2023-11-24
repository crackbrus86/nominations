import { useRefereeSchedule } from './referee.schedule.context';
import { getFlowsOfDay } from './utils';
import { useAddFlowModal } from './add.flow.modal/add.flow.modal.context';

const EventDay = ({ day }) => {
	const { flows } = useRefereeSchedule();
	const { onAddFlow } = useAddFlowModal();

	const getColSpan = (val) => {
		const countOfFlows = getFlowsOfDay(flows, val).length;
		return !countOfFlows ? 1 : countOfFlows;
	};

	return (
		<th key={day.id} colSpan={getColSpan(day.value)} className={day.id}>
			<i
				className="fa fa-plus-circle add-flow"
				title="Додати потік"
				onClick={() => onAddFlow(day)}
			></i>
			<span className="day-title">{day.displayName}</span>
		</th>
	);
};

export default EventDay;
