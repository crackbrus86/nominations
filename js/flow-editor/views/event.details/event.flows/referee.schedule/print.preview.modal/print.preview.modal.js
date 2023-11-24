import moment from 'moment';

import ModalPortal from '../../../../../../components/modal.portal/modal.portal';
import { useRefereeSchedule } from '../referee.schedule.context';
import PrintButton from './print.button';
import {
	onExportToWord,
	onPrint,
	formatFlowInfo,
	formatRefereeFullName,
	formatRefereeStatus,
	formatRefereeCategory,
} from './functions';
import Day from './day';

const PrintPreviewModal = () => {
	const { days, flows, referees, showPreview, onHidePreview } =
		useRefereeSchedule();

	const mapReferee = (referee) => {
		return {
			refereeId: referee.refereeId,
			refereeFullName: formatRefereeFullName(referee.refereeId, referees),
			statusDisplayName: formatRefereeStatus(referee.refereeStatus),
			category: formatRefereeCategory(referee.refereeId, referees),
		};
	};

	const mapFlows = (flow, index) => {
		return {
			flowId: flow.flowId,
			flowDisplayName: `Потік ${index + 1}`,
			flowDivisionsDisplayName: formatFlowInfo(flow.info),
			referees: flow.referees
				.filter((r) => r.refereeStatus != 0)
				.map((referee) => mapReferee(referee)),
		};
	};

	const mapDays = (day) => {
		return {
			id: day.id,
			displayName: `Розподіл роботи суддів на ${moment(day.value).format(
				'DD/MM/YYYY'
			)}`,
			flows: flows
				.filter(
					(flow) =>
						flow.dayOfFlow.getTime() == day.value.getTime() &&
						flow.referees
							.sort((a, b) => a.refereeStatus - b.refereeStatus)
							.filter((r) => r.refereeStatus != 0).length > 0
				)
				.map((flow, index) => mapFlows(flow, index)),
		};
	};

	if (!showPreview) return null;

	const data = days
		.map((day) => mapDays(day))
		.filter((day) => day.flows.length > 0);

	return (
		<ModalPortal wrapperId="preview-event-flows-modal">
			<div className="modal fade show" style={{ display: 'block' }}>
				<div className="modal-dialog modal-xl modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5
								style={{ textTransform: 'uppercase' }}
								className="modal-title"
							>
								Розподіл роботи суддів
							</h5>
							<button
								type="button"
								className="btn-close"
								onClick={onHidePreview}
							></button>
						</div>
						<div
							id="referee-schedule-display"
							className="modal-body"
							style={{ maxHeight: '600px', overflow: 'auto' }}
						>
							{data.map((day) => (
								<Day key={day.id} day={day} />
							))}
						</div>
						<div className="modal-footer">
							<PrintButton
								label="Експорт у Word"
								type="export-word"
								onClick={onExportToWord}
							/>
							<PrintButton
								label="Друкувати"
								type="print"
								onClick={onPrint}
							/>
						</div>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default PrintPreviewModal;
