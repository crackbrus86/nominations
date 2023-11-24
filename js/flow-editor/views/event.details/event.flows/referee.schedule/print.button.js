import { useRefereeSchedule } from './referee.schedule.context';

const PrintButton = () => {
	const { flows, onShowPreview } = useRefereeSchedule();

	const isDisabled = !flows.some((flow) => flow.referees.length > 0);

	return (
		<button
			type="button"
			className="btn btn-outline-secondary mb-2"
			disabled={isDisabled}
			onClick={onShowPreview}
		>
			Друкувати
		</button>
	);
};

export default PrintButton;
