import React from 'react';

import ModalPortal from '../../../../../components/modal.portal/modal.portal';
import { useRefereeSchedule } from './referee.schedule.context';

const ConfirmDeleteFlowModal = () => {
	const { flowToRemoveId, onCancelDeleteFlow, onDeleteFlow } =
		useRefereeSchedule();
	if (!flowToRemoveId) return null;

	return (
		<ModalPortal wrapperId="confirm-delete-flow-modal">
			<div className="modal fade show" style={{ display: 'block' }}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Видалити цей потік?</h5>
							<button
								type="button"
								className="btn-close"
								onClick={onCancelDeleteFlow}
							></button>
						</div>
						<div className="modal-body">
							<p>Ви впевнені що хочете видалити цей потік?</p>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								onClick={onCancelDeleteFlow}
							>
								Ні, я передумав
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={onDeleteFlow}
							>
								Так, я впевнений
							</button>
						</div>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default ConfirmDeleteFlowModal;
