import React from 'react';

import { useFlowForm } from './flow.form.context';
import FlowWeightClasses from './flow.weight.classes';

const WeightClassSelector = () => {
	const { weightClasses, flow, onChangeFlow } = useFlowForm();

	const onSelectWeightClass = (weightClassId) => {
		if (!weightClassId) return;
		const nextFlowWeightClasses = flow.weightClasses.concat({
			divisionId: flow.divisionId,
			weightClassId: weightClassId,
		});
		onChangeFlow('weightClasses', nextFlowWeightClasses);
	};

	return (
		<div className="mb-3">
			<label htmlFor="weightClasses" className="form-label">
				Вагова категорія
			</label>
			<select className="form-control" id="weightClasses" multiple>
				{weightClasses.map((wcl) => (
					<option
						key={wcl.value}
						value={wcl.value}
						onClick={() => onSelectWeightClass(wcl.value)}
					>
						{wcl.text}
					</option>
				))}
			</select>
			<FlowWeightClasses />
		</div>
	);
};

export default WeightClassSelector;
