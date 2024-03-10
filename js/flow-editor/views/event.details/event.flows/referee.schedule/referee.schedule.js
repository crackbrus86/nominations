import { Fragment, useEffect } from 'react';

import Header from './header';
import Body from './body';
import { useRefereeSchedule } from './referee.schedule.context';
import AddFlowModal from './add.flow.modal/add.flow.modal';
import ConfirmDeleteFlowModal from './confirm.delete.flow.modal';
import EditFlowModal from './edit.flow.modal/edit.flow.modal';
import PrintButton from './print.button';
import PrintPreviewModal from './print.preview.modal/print.preview.modal';
import './referee.schedule.scss';

const RefereeScheduleContainer = () => {
	const { onLoadFlows, onLoadReferees, onLoadRefereeBusy } = useRefereeSchedule();

	useEffect(() => {
		onLoadFlows();
		onLoadReferees();
		onLoadRefereeBusy();
	}, []);

	return (
		<Fragment>
			<PrintButton />
			<div className="referee-schedule-wrap">
				<table className="referee-schedule">
					<Header />
					<Body />
				</table>
				<AddFlowModal />
				<EditFlowModal />
				<ConfirmDeleteFlowModal />
				<PrintPreviewModal />
			</div>
		</Fragment>
	);
};

export default RefereeScheduleContainer;
