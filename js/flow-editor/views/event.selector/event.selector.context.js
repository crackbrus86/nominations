import React from 'react';

import { filters } from '../../types';
import { useFlowServices } from '../../services/flow.services.context';

const EventSelectorContext = React.createContext();

const EventSelectorProvider = ({ children }) => {
	const { getEvents, getAllRegionsNames }  = useFlowServices();
	const [filter, setFilter] = React.useState(filters.actual);
	const [events, setEvents] = React.useState([]);
	const [selectedEventId, setSelectedEventId] = React.useState(null);
	const [regionNames, setRegionNames] = React.useState([]);

	const onFilter = async (e = null) => {
		if (e) e.preventDefault();
		const data = await getEvents({ filter });
		const nextEvents = data.map((x) => ({
			...x,
			startsAt: new Date(x.startsAt),
			endsAt: new Date(x.endsAt),
			isACup: /1/.test(x.isACup),
			isForJuniors: /1/.test(x.isForJuniors),
			expired: !!parseInt(x.expired),
		}));
		setEvents(nextEvents);
	};

	const onLoadRegionNames = async () => {
		const data = await getAllRegionsNames();
		setRegionNames(data);
	};

	const value = {
    	regionNames,
		filter,
		events,
		selectedEventId,
		setSelectedEventId,
		setFilter,
		onFilter,
    	onLoadRegionNames,
	};
	return (
		<EventSelectorContext.Provider value={value}>
			{children}
		</EventSelectorContext.Provider>
	);
};

const useEventSelector = () => {
	const context = React.useContext(EventSelectorContext);
	if (context === undefined) {
		throw new Error(
			'useEventSelector must be used within a EventSelectorProvider'
		);
	}
	return context;
};

export { EventSelectorProvider, useEventSelector };
