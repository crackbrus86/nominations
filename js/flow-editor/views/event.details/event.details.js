import React from 'react';

import { useFlows } from '../flows.context';
import EventFlows from './event.flows/event.flows';

const EventDetails = () => {
	const { currentEvent } = useFlows();

	if (!currentEvent) return null;

	return (
		<div>
			<EventFlows />
		</div>
	);
};

export default EventDetails;
