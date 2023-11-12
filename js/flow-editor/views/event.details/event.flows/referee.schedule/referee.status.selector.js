import { useRefereeSchedule } from './referee.schedule.context';

const RefereeStatusSelector = ({ status, onChange }) => {
	const { refereeStatuses: statuses } = useRefereeSchedule();

	const onChangeStatus = (e) => {
		onChange(e.target.value);
	};

	return (
		<select
			className="referee-status-selector"
			value={status}
			onChange={(e) => onChangeStatus(e)}
		>
			{statuses.map((status, index) => (
				<option key={index} value={status.value}>
					{status.text}
				</option>
			))}
		</select>
	);
};

export default RefereeStatusSelector;
