import React from 'react';

import AlertsContainer from './alerts.container';
import EventDetails from './event.details/event.details';
import { EventSelectorProvider } from './event.selector/event.selector.context';
import EventSelector from './event.selector/event.selector';
import { FlowsContextProvider } from './flows.context';
import { FlowServicesContextProvider } from '../services/flow.services.context';

const FlowEditor = () => {
	return (
		<FlowServicesContextProvider>
			<FlowsContextProvider>
				<EventSelectorProvider>
					<AlertsContainer />
					<EventSelector />
					<EventDetails />
				</EventSelectorProvider>
			</FlowsContextProvider>
		</FlowServicesContextProvider>
	);
};

export default FlowEditor;
