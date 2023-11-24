import { useRefereeSchedule } from './referee.schedule.context';
import { getFlowsOfDay } from './utils';
import EmptyFlow from './empty.flow';
import Flow from './flow';

const EventFlows = () => {
	const { days, flows } = useRefereeSchedule();

	if (!flows.length) return null;

	return (
		<tr>
			{days.map((day, index) => {
				const flowsOfDay = getFlowsOfDay(flows, day.value);
				return !flowsOfDay.length ? (
					<EmptyFlow key={`${index}1`} />
				) : (
					flowsOfDay.map((flow) => (
						<Flow key={`${index}${flow.flowId}`} flow={flow} />
					))
				);
			})}
		</tr>
	);
};

export default EventFlows;
