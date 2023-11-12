import ModalPortal from '../../../../../../components/modal.portal/modal.portal';
import { useEditFlowModal } from './edit.flow.modal.context';
import FlowForm from '../flow.form/flow.form';
import { useFlowForm } from '../flow.form/flow.form.context';

const EditFlowModal = () => {
	const { flow, isFlowReady } = useFlowForm();
	const { showEditFlow, onCloseEditFlow, onUpdateFlow } = useEditFlowModal();

	if (!showEditFlow) return null;

	const onUpdate = () => {
		onUpdateFlow(flow);
	};

	return (
		<ModalPortal wrapperId="edit-event-flow-modal">
			<div className="modal fade show" style={{ display: 'block' }}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Редагувати потік</h5>
							<button
								type="button"
								className="btn-close"
								onClick={onCloseEditFlow}
							></button>
						</div>
						<div className="modal-body">
							<FlowForm />
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
								disabled={!isFlowReady}
								onClick={onUpdate}
							>
								Зберегти
							</button>
						</div>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default EditFlowModal;
