import ModalPortal from '../../../../../../components/modal.portal/modal.portal';
import { useAddFlowModal } from './add.flow.modal.context';
import FlowForm from '../flow.form/flow.form';
import { useFlowForm } from '../flow.form/flow.form.context';

const AddFlowModal = () => {
	const { flow, isFlowReady } = useFlowForm();
	const { showAddFlow, onCloseAddFlow, onCreateFlow } = useAddFlowModal();

	if (!showAddFlow) return null;

	const onCreate = () => {
		onCreateFlow(flow);
	};
	return (
		<ModalPortal wrapperId="new-event-flow-modal">
			<div className="modal fade show" style={{ display: 'block' }}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Додати потік</h5>
							<button
								type="button"
								className="btn-close"
								onClick={onCloseAddFlow}
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
								onClick={onCreate}
							>
								Створити
							</button>
						</div>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default AddFlowModal;
