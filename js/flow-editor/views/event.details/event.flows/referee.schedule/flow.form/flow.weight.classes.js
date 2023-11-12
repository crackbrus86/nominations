import React from 'react';

import './flow.weight.classes.scss';
import { useFlowForm } from './flow.form.context';

const FlowWeightClasses = () => {
	const { flow, onChangeFlow, selectedWeightClasses } = useFlowForm();

	const onRemoveWeightClass = (weightClassId, divisionId) => {
		const nextFlowWeightClasses = flow.weightClasses.filter(
			(wClass) =>
				wClass.divisionId != divisionId ||
				wClass.weightClassId != weightClassId
		);
		onChangeFlow('weightClasses', nextFlowWeightClasses);
	};

	return (
		<div>
			{selectedWeightClasses.map((x, index) => (
				<span
					key={index}
					className="badge rounded-pill text-bg-secondary me-1 event-flow-weight-class"
				>
					{x.text}
					<i
						className="fa fa-times ms-1 remove-flow-weight-class"
						onClick={() =>
							onRemoveWeightClass(x.weightClassId, x.divisionId)
						}
					></i>
				</span>
			))}
		</div>
	);
};

export default FlowWeightClasses;
