import React from 'react';

import BreadCrumbs from './breadcrumbs';
import EventFlowsTitle from './event.flows.title';
import EventInfo from './event.info';
import { useFlows } from '../../flows.context';
import { useFlowServices } from '../../../services/flow.services.context';
import LoadingIndicator from '../../../../components/loading.indicator/loading.indicator';

import RefereeScheduleContainer from './referee.schedule/referee.schedule';
import { RefereeScheduleContextProvider } from './referee.schedule/referee.schedule.context';
import { AddFlowModalContextProvider } from './referee.schedule/add.flow.modal/add.flow.modal.context';
import { FlowFormContextProvider } from './referee.schedule/flow.form/flow.form.context';
import { EditFlowModalContextProvider } from './referee.schedule/edit.flow.modal/edit.flow.modal.context';

const EventFlows = () => {
	const { currentEvent } = useFlows();
	const { isLoading } = useFlowServices();

	if (!currentEvent) return null;

	return (
		<React.Fragment>
			<EventFlowsTitle />
			<BreadCrumbs />
			<EventInfo />
			<RefereeScheduleContextProvider>
				<FlowFormContextProvider>
					<EditFlowModalContextProvider>
						<AddFlowModalContextProvider>
							<RefereeScheduleContainer />
						</AddFlowModalContextProvider>
					</EditFlowModalContextProvider>
				</FlowFormContextProvider>
			</RefereeScheduleContextProvider>
			<LoadingIndicator isOpen={isLoading} />
		</React.Fragment>
	);
};

export default EventFlows;
