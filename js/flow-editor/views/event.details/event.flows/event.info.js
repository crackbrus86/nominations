import React from 'react';
import moment from 'moment';

import { useFlows } from '../../flows.context';

const EventInfo = () => {
	const { currentEvent } = useFlows();

	return (
		<React.Fragment>
			<h5>{currentEvent.title}</h5>
			<div>{`${moment(currentEvent.startsAt).format(
				'D MMM, YYYY'
			)} - ${moment(currentEvent.endsAt).format('D MMM, YYYY')}`}</div>
			<div className="mb-2">{currentEvent.location}</div>
			<hr />
		</React.Fragment>
	);
};

export default EventInfo;
