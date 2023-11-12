import React from 'react';

import DayLabel from './day.label';
import DivisionSelector from './division.selector';
import WeightClassSelector from './weight.class.selector';

const FlowForm = () => {
	return (
		<React.Fragment>
			<DayLabel />
			<DivisionSelector />
			<WeightClassSelector />
		</React.Fragment>
	);
};

export default FlowForm;
