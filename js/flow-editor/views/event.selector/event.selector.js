import React from 'react';

import { useEventSelector } from './event.selector.context';
import { useFlows } from '../flows.context';
import EventSelectorHeader from './event.selector.header';
import EventsList from './events.list';
import LoadingIndicator from '../../../components/loading.indicator/loading.indicator';
import { useFlowServices } from '../../services/flow.services.context';
import '../../../../styles/style-flows.scss';

const EventSelector = () => {
	const { onFilter, onLoadRegionNames } = useEventSelector();
	const { isLoading } = useFlowServices();
	const { currentEvent } = useFlows();

	if (!!currentEvent) return null;

	React.useEffect(() => {
		onFilter();
		onLoadRegionNames();
	}, []);

	return (
		<div className="event-selector">
			<EventSelectorHeader />
			<EventsList />
			<LoadingIndicator isOpen={isLoading} />
		</div>
	);
};

export default EventSelector;
