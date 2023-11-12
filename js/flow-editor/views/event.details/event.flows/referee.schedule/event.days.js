import React from 'react';
import { useRefereeSchedule } from './referee.schedule.context';

import EventDay from './event.day';

const EventDays = () => {
	const { days } = useRefereeSchedule();

	return (
		<React.Fragment>
			{days.map((day, index) => (
				<EventDay key={index} day={day} />
			))}
		</React.Fragment>
	);
};

export default EventDays;
