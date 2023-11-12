import { useEditFlowModal } from './edit.flow.modal/edit.flow.modal.context';
import { useRefereeSchedule } from './referee.schedule.context';

const Flow = ({ flow }) => {
	const { onEditFlow } = useEditFlowModal();
	const { onRemoveFlow } = useRefereeSchedule();

	const onEdit = () => {
		onEditFlow(flow);
	};

	const onRemove = () => {
		onRemoveFlow(flow.flowId);
	};

	return (
		<th className="flow-cell">
			<div className="flow-panel">
				<i
					className="fa fa-pencil-square edit-flow"
					title="Редагувати"
					onClick={onEdit}
				></i>
				<i
					className="fa fa-trash delete-flow"
					title="Видалити"
					onClick={onRemove}
				></i>
			</div>
			<div>
				<ul>
					{flow.info.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
		</th>
	);
};

export default Flow;
